using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Session;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using vote.Data;
using vote.Middleware;
using System.Security.Claims;

namespace vote
{
    public class Startup
    {
        public const string SourcePath = "../ClientApp/";
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddLogging();

            // AddSession(services);

            AddSqlServer(services);

            // AddCookieAuth(services);

            // AddClaimAuth(services);

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = SourcePath + "/dist";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddFile(@"C:\Users\83891\Desktop\asplog.txt");

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
            }

            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            //app.UseSession();
            app.UseAuthentication();
            app.UseHttpContextItemsMiddleware();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = SourcePath;

                if (env.IsDevelopment())
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

        private void AddClaimAuth(IServiceCollection services)
        {
            services.AddAuthorization(options =>
            {
                options.AddPolicy("Named", policy =>
                   policy.RequireAssertion(context =>
                       context.User.HasClaim(c =>
                           c.Type == ClaimTypes.NameIdentifier)));
            });
        }

        private void AddCookieAuth(IServiceCollection services)
        {
            services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
                    .AddCookie();
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
        }
    }
}
