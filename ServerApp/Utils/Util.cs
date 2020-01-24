using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Security.Claims;

namespace vote.Utils
{
    public static class Util
    {
        private static string UserFirstClaimValue(HttpContext context, string claimType)
        {
            return context.User.FindFirstValue(claimType);
        }

        public static int ParseUserId(HttpContext context, string claimType)
        {
            return int.Parse(UserFirstClaimValue(context, claimType));
        }
    }
}
