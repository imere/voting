using IdentityServer4;
using IdentityServer4.Models;
using System.Collections.Generic;

namespace IdentityServer
{
    public static class Config
    {
        public static IEnumerable<IdentityResource> GetIdentityResources()
        {
            return new IdentityResource[]
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
            };
        }

        public static IEnumerable<ApiResource> GetApis()
        {
            return new List<ApiResource>
            {
                new ApiResource("api1", "My API")
            };
        }

        public static IEnumerable<Client> GetClients()
        {
            return new List<Client>
            {
                new Client{
                    ClientId = "js",
                    ClientName = "JavaScript Client",

                    AllowedGrantTypes = GrantTypes.Implicit,
                    AllowAccessTokensViaBrowser = true,

                    RequirePkce = false,
                    RequireClientSecret = false,

                    RedirectUris =           { "http://localhost:5000/auth-callback", "http://localhost/auth-callback" },
                    PostLogoutRedirectUris = { "http://localhost:5000", "http://localhost" },
                    AllowedCorsOrigins =     { "http://localhost:5000" },

                    RequireConsent = false,
                    UpdateAccessTokenClaimsOnRefresh=true,
                    RefreshTokenExpiration = TokenExpiration.Sliding,
                    RefreshTokenUsage = TokenUsage.OneTimeOnly,
                    AbsoluteRefreshTokenLifetime = 0,

                    AllowedScopes =
                    {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        "api1"
                    },
                    AccessTokenLifetime = 3600
                }
            };
        }
    }
}