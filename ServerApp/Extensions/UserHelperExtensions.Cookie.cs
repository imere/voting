using IdentityModel;
using Microsoft.AspNetCore.Authentication.Cookies;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using vote.Models;

namespace vote.Extensions
{
    public static partial class UserHelperExtensions
    {
        public static string CookieAuthScheme
        {
            get => CookieAuthenticationDefaults.AuthenticationScheme;
        }

        public static int ParseCookieUserId(ClaimsPrincipal user)
        {
            return int.Parse(UserFirstClaimValue(user, ClaimTypes.NameIdentifier));
        }

        private static List<Claim> GetCookieClaims(ApplicationUser user) =>
            new List<Claim> {
                new Claim(ClaimTypes.NameIdentifier, $"{user.Id}"),
                new Claim(JwtClaimTypes.Subject, $"{user.Id}"),
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Role, "Normal")
            };

        public static ClaimsPrincipal GetCookieClaimsPrincipal(ApplicationUser user) =>
            new ClaimsPrincipal(
                new ClaimsIdentity(
                    GetCookieClaims(user),
                    CookieAuthScheme));
    }
}
