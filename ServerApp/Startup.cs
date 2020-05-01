using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using vote.Data;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using IdentityServer4.Configuration;
using System.Security.Cryptography.X509Certificates;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Newtonsoft.Json.Serialization;
using IdentityServer4.EntityFramework.DbContexts;

namespace vote
{
    public class Startup
    {
        public IHostingEnvironment Environment { get; }

        public const string SourcePath = "../ClientApp/";

        public Startup(IConfiguration configuration, IHostingEnvironment environment)
        {
            Configuration = configuration;
            Environment = environment;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddLogging();

            services.AddAntiforgery(options => options.Cookie.Name = "X-CSRF-TOKEN");

            // AddSession(services);

            AddCookieAuth(services);

            AddSqlServer(services);

            services.AddMvc()
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_1)
                .AddJsonOptions(options =>
                {
                    options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
                });

            AddIdentityServer(services);
            AddIdentityServerAuth(services);

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = SourcePath + "/dist";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IAntiforgery antiforgery, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddFile(@".\asplog.txt");

            if (Environment.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
            }

            app.UseCors("default");

            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseIdentityServer();

            //app.UseSession();
            app.UseCookiePolicy(new CookiePolicyOptions
            {
                MinimumSameSitePolicy = SameSiteMode.Strict,
            });
            app.UseAuthentication();

            AddAntiForgery(app, antiforgery);

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
                routes.MapRoute("auth-callback", "auth-callback", new { controller = "auth-callback", action = "Index" });
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = SourcePath;

                if (Environment.IsDevelopment())
                {
                    spa.UseProxyToSpaDevelopmentServer("http://localhost:5000");
                }
            });
        }

        private void AddSqlServer(IServiceCollection services)
        {
            services.AddScoped<VoteService>();

            var builder = new SqlConnectionStringBuilder(Configuration.GetConnectionString("VoteConnection"));
            IConfigurationSection voteCredentials =
                Configuration.GetSection("VoteCredentials");
            builder.UserID = voteCredentials["UserId"];
            builder.Password = voteCredentials["Password"];
            services.AddDbContext<VoteContext>(options => options.UseSqlServer(builder.ConnectionString));
        }

        private void AddSession(IServiceCollection services)
        {
            services.AddDistributedMemoryCache();
            services.AddSession(options =>
            {
                // Set a short timeout for easy testing.
                options.IdleTimeout = TimeSpan.FromSeconds(10);
                options.Cookie.HttpOnly = true;
                // Make the session cookie essential
                options.Cookie.IsEssential = true;
            });
        }

        private void AddCookieAuth(IServiceCollection services)
        {
            services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
                .AddCookie();
        }

        private void AddIdentityServer(IServiceCollection services)
        {
            var b = new SqlConnectionStringBuilder(Configuration.GetConnectionString("VoteConnection"));
            IConfigurationSection voteCredentials = Configuration.GetSection("VoteCredentials");
            b.UserID = voteCredentials["UserId"];
            b.Password = voteCredentials["Password"];

            const string migrationsAssembly = "vote";

            var builder = services.AddIdentityServer(options =>
            {
                options.UserInteraction = new UserInteractionOptions()
                {
                    LogoutUrl = "http://localhost:5000",
                    LoginUrl = "http://localhost:5000/user/login",
                    LoginReturnUrlParameter = "/"
                };
            })
                //.AddInMemoryIdentityResources(Config.GetIdentityResources())
                //.AddInMemoryApiResources(Config.GetApis())
                //.AddInMemoryClients(Config.GetClients())
                // this adds the config data from DB (clients, resources, CORS)
                .AddConfigurationStore<ConfigurationDbContext>(options =>
                {
                    options.ResolveDbContextOptions = (provider, optionsBuilder) =>
                    {
                        optionsBuilder.UseSqlServer(b.ConnectionString, sql => sql.MigrationsAssembly(migrationsAssembly));
                    };
                })
                // this adds the operational data from DB (codes, tokens, consents)
                .AddOperationalStore<PersistedGrantDbContext>(options =>
                {
                    options.ConfigureDbContext = optionsBuilder =>
                    {
                        optionsBuilder.UseSqlServer(b.ConnectionString, sql => sql.MigrationsAssembly(migrationsAssembly));
                    };

                    // this enables automatic token cleanup. this is optional.
                    options.EnableTokenCleanup = true;
                    options.TokenCleanupInterval = 60 * 60 * 1; // interval in seconds
                })
                .AddConfigurationStoreCache();

            services.AddLocalApiAuthentication();

            if (Environment.IsDevelopment())
            {
                builder.AddDeveloperSigningCredential();
            }
            else
            {
                builder.AddDeveloperSigningCredential();
                //var subjectName = Configuration.GetValue<string>("SubjectName");

                //var store = new X509Store(StoreName.My, StoreLocation.LocalMachine);
                //store.Open(OpenFlags.ReadOnly);

                //var certificates = store.Certificates.Find(X509FindType.FindBySubjectName, subjectName, true);
                //builder.AddSigningCredential(certificates[0]);
            }
        }


        private void AddIdentityServerAuth(IServiceCollection services)
        {
            services.AddMvcCore()
                .AddAuthorization()
                .AddJsonFormatters();

            JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = OpenIdConnectDefaults.AuthenticationScheme;
            })
                .AddIdentityServerAuthentication(options =>
                {
                    options.Authority = "http://localhost:61598";
                    options.RequireHttpsMetadata = false;

                    options.ApiName = "api1";
                });

            services.AddCors(options =>
            {
                // this defines a CORS policy called "default"
                options.AddPolicy("default", policy =>
                {
                    policy.WithOrigins("http://localhost:5000")
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials();
                });
                options.AddPolicy("everyone", policy =>
                {
                    policy
                        .AllowAnyOrigin()
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials();
                });
            });
        }

        private void AddAntiForgery(IApplicationBuilder app, IAntiforgery antiforgery)
        {
            app.Use(next => context =>
            {
                string path = context.Request.Path.Value;

                if (
                    string.Equals(path, "/", StringComparison.OrdinalIgnoreCase) ||
                    string.Equals(path, "/index.html", StringComparison.OrdinalIgnoreCase))
                {
                    // The request token can be sent as a JavaScript-readable cookie,
                    // and Angular uses it by default.
                    var tokens = antiforgery.GetAndStoreTokens(context);
                    context.Response.Cookies.Append("RequestVerificationToken", tokens.RequestToken,
                        new CookieOptions() { HttpOnly = false });
                    context.Response.Cookies.Append("X-XSRF-TOKEN", tokens.RequestToken,
                        new CookieOptions() { HttpOnly = true });
                }

                return next(context);
            });
        }
    }
}
