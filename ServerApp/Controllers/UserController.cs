using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using vote.Models;
using vote.Data;
using vote.Extensions;
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
        public async Task<ActionResult> GetAllUsers()
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

            return Ok(new ResponseState(User));
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register([FromBody] ApplicationUser user)
        {
            ApplicationUser result = await _service.AddUser(user);

            if (null == result) return BadRequest();

            return Ok(new ResponseState(result));
        }

        [Authorize]
        [HttpPost("unregister")]
        public async Task<ActionResult> UnRegister()
        {
            ApplicationUser result = await _service.RemoveUser(new ApplicationUser
            {
                Id = UserHelperExtensions.ParseUserId(User)
            });

            if (null == result) return BadRequest();

            return Ok(new ResponseState(result));
        }

        [HttpPost("login")]
        public async Task<ActionResult<ResponseState>> Login([FromBody] ApplicationUser user)
        {
            ApplicationUser result = await SignIn(user);

            if (null == result) return Unauthorized();

            return Ok(new ResponseState(null));
        }

        [Authorize]
        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await SignOut();
            return LocalRedirect("/");
        }

        private async Task<ApplicationUser> SignIn(ApplicationUser user)
        {
            ApplicationUser result = await _service.ValidateUser(user);

            if (null == result) return null;

            await HttpContext.SignInAsync(
                CookieAuthenticationDefaults.AuthenticationScheme,
                UserHelperExtensions.GetClaimsPrincipal(result),
                UserHelperExtensions.GetAuthenticationProperties());

            return result;
        }
        private async Task SignOut()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        }
    }

}