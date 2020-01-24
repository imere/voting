using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Security.Claims;
using vote.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;

namespace vote.Extensions
{
    public static class UserHelperExtensions
    {
        public static readonly string userIdentityType = ClaimTypes.NameIdentifier;

        private static string UserFirstClaimValue(ClaimsPrincipal user, string claimType)
        {
            return user.FindFirstValue(claimType);
        }

        public static int ParseUserId(ClaimsPrincipal user)
        {
            return int.Parse(UserFirstClaimValue(user, userIdentityType));
        }

        private static List<Claim> GetNormalClaims(ApplicationUser user) =>
            new List<Claim> {
                new Claim(userIdentityType, $"{user.Id}"),
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Role, "Normal")
            };

        public static ClaimsPrincipal GetClaimsPrincipal(ApplicationUser user) =>
            new ClaimsPrincipal(
                new ClaimsIdentity(
                    GetNormalClaims(user),
                    CookieAuthenticationDefaults.AuthenticationScheme));

        public static AuthenticationProperties GetAuthenticationProperties(bool persist = false) =>
            new AuthenticationProperties
            {
                AllowRefresh = false,
                // Refreshing the authentication session should be allowed.

                //ExpiresUtc = DateTimeOffset.UtcNow.AddMinutes(10),
                // The time at which the authentication ticket expires. A 
                // value set here overrides the ExpireTimeSpan option of 
                // CookieAuthenticationOptions set with AddCookie.

                IsPersistent = persist,
                // Whether the authentication session is persisted across 
                // multiple requests. When used with cookies, controls
                // whether the cookie's lifetime is absolute (matching the
                // lifetime of the authentication ticket) or session-based.

                IssuedUtc = DateTimeOffset.UtcNow,
                // The time at which the authentication ticket was issued.

                //RedirectUri = <string>
                // The full path or absolute URI to be used as an http 
                // redirect response value.
            };
    }
}
