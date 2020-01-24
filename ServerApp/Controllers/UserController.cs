using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using vote.Models;
using vote.Data;
using vote.Utils;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace vote.UserController
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly VoteService _service;

        private readonly ILogger<UserController> _logger;

        public UserController(VoteService service, ILogger<UserController> logger)
        {
            _service = service;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<ResponseState>> GetAllUsers()
        {
            var users = (
                    from o in await _service.GetAllUsers()
                    select new
                    {
                        o.Id,
                        o.Username,
                        o.Password
                    }
                )
                .ToList();

            return new ResponseState(users);
        }

        [HttpGet("register/{username}/{password}")]
        public async Task<ActionResult<ResponseState>> Register(string username, string password)
        {
            User user = await _service.AddUser(new User()
            {
                Username = username,
                Password = password
            });

            if (null == user) return BadRequest();

            return new ResponseState(user);
        }

        [Authorize]
        [HttpGet("unregister")]
        public async Task<ActionResult<ResponseState>> UnRegister()
        {
            User result = await _service.RemoveUser(new User
            {
                Id = Util.ParseUserId(HttpContext, ClaimTypes.NameIdentifier)
            });

            if (null == result) return BadRequest();

            return new ResponseState(result);
        }

        [HttpGet("login")]
        public async Task<ActionResult<ResponseState>> Login(User user)
        {
            User result = await SignIn(user);

            if (null == result) return BadRequest();

            return new ResponseState(null);
        }

        [Authorize]
        [HttpGet("logout")]
        public async Task<IActionResult> Logout()
        {
            await SignOut();
            return LocalRedirect("/");
        }

        private async Task<User> SignIn(User user)
        {
            User result = await _service.ValidateUser(user);

            if (null == result) return null;

            await HttpContext.SignInAsync(
                CookieAuthenticationDefaults.AuthenticationScheme,
                GetClaimsPrincipal(result),
                GetAuthenticationProperties());

            return result;
        }
        private async Task SignOut()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        }

        private List<Claim> GetClaims(User user) =>
            new List<Claim> {
                new Claim(ClaimTypes.NameIdentifier, $"{user.Id}"),
                new Claim(ClaimTypes.Name, user.Username)
            };

        private ClaimsPrincipal GetClaimsPrincipal(User user) =>
            new ClaimsPrincipal(
                new ClaimsIdentity(
                    GetClaims(user),
                    CookieAuthenticationDefaults.AuthenticationScheme));

        private AuthenticationProperties GetAuthenticationProperties(bool persist = false) =>
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