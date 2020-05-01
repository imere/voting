using System;
using System.Linq;
using IdentityServer4.EntityFramework.Interfaces;
using IdentityServer4.EntityFramework.Mappers;
using Microsoft.Extensions.DependencyInjection;

namespace vote
{
    public static class SeedResources
    {
        public static void EnsureSeedData(IServiceProvider serviceProvider)
        {
            using (var scope = serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (var context = scope.ServiceProvider.GetService<IConfigurationDbContext>())
                {
                    EnsureSeedData(context);
                }
            }
        }

        private static void EnsureSeedData(IConfigurationDbContext context)
        {
            Console.WriteLine("Seeding database...");

            context.Clients.RemoveRange(context.Clients);
            context.IdentityResources.RemoveRange(context.IdentityResources);
            context.ApiResources.RemoveRange(context.ApiResources);

            Console.WriteLine("Clients being populated");
            foreach (var client in Config.GetClients())
            {
                context.Clients.Add(client.ToEntity());
            }

            Console.WriteLine("IdentityResources being populated");
            foreach (var resource in Config.GetIdentityResources())
            {
                context.IdentityResources.Add(resource.ToEntity());
            }

            Console.WriteLine("ApiResources being populated");
            foreach (var resource in Config.GetApis())
            {
                context.ApiResources.Add(resource.ToEntity());
            }
            context.SaveChanges();

            Console.WriteLine("Done seeding database.");
            Console.WriteLine();
        }
    }
}