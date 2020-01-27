using IdentityModel;
using Microsoft.AspNetCore.Authentication.JwtBearer;
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
        public static string JwtAuthScheme
        {
            get => JwtBearerDefaults.AuthenticationScheme;
        }

        public static int ParseJwtUserId(ClaimsPrincipal user)
        {
            return int.Parse(UserFirstClaimValue(user, JwtClaimTypes.Subject));
        }

        private static List<Claim> GetJwtClaims(ApplicationUser user) =>
            new List<Claim> {
                new Claim(JwtClaimTypes.Subject, $"{user.Id}"),
                new Claim(JwtClaimTypes.Name, user.Username),
                new Claim(JwtClaimTypes.Role, "Normal")
            };

        public static ClaimsPrincipal GetJwtClaimsPrincipal(ApplicationUser user) =>
            new ClaimsPrincipal(
                new ClaimsIdentity(
                    GetJwtClaims(user),
                    JwtAuthScheme));
    }
}
