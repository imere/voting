using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using vote.Models;
using vote.Data;
using vote.Extensions;
using IdentityModel;
using IdentityServer4.Events;
using IdentityServer4.Extensions;
using IdentityServer4.Models;
using IdentityServer4.Services;
using IdentityServer4.Stores;
using IdentityServer4.Test;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using IdentityServer4;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Data.SqlClient;
using System.Security.Claims;

namespace vote.UserController.v1
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly VoteService _service;

        private readonly ILogger<UserController> _logger;

        private readonly IIdentityServerInteractionService _interaction;
        private readonly IClientStore _clientStore;
        private readonly IAuthenticationSchemeProvider _schemeProvider;
        private readonly IEventService _events;

        public UserController(
            VoteService service,
            ILogger<UserController> logger,
            IIdentityServerInteractionService interaction,
            IClientStore clientStore,
            IAuthenticationSchemeProvider schemeProvider,
            IEventService events)
        {
            _service = service;
            _logger = logger;
            _interaction = interaction;
            _clientStore = clientStore;
            _schemeProvider = schemeProvider;
            _events = events;
        }

        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        //[Authorize(AuthenticationSchemes = IdentityServerConstants.LocalApi.AuthenticationScheme)]
        [HttpGet]
        public async Task<ActionResult> GetAllUsers()
        {
            var users = (
                    from o in await _service.GetAllUsers()
                    select o
                )
                .ToList();

            return Ok(new ResponseState(users));
        }

        [HttpPut]
        public async Task<ActionResult> Register(ApplicationUser user)
        {
            user.Displayname = null;
            user.LastLogin = null;
            user.CreatedAt = DateTime.UtcNow;

            ApplicationUser result = await _service.AddUser(user);

            if (null == result) return BadRequest(new ResponseState(new { Username = "用户名已存在" }));

            return CreatedAtAction(nameof(Register), new ResponseState(result));
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpDelete]
        public async Task<ActionResult> UnRegister()
        {
            ApplicationUser result = await _service.RemoveUserById(new ApplicationUser
            {
                Id = long.Parse(User.GetSubjectId())
            });

            if (null == result) return BadRequest(new ResponseState(null));

            return NoContent();
        }

        [HttpPost("login")]
        public async Task<ActionResult<ResponseState>> Login(ApplicationUser user)
        {
            ApplicationUser result = await SignInAsync(user);

            if (null == result) return BadRequest(new ResponseState(new { Username = "用户或密码不正确" }));

            return Ok(new ResponseState(null));
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await SignOutAsync();
            return LocalRedirect("/");
        }

        private async Task<ApplicationUser> SignInAsync(ApplicationUser user)
        {
            ApplicationUser result = await _service.ValidateUser(user);

            if (null == result) return null;

            result.LastLogin = DateTime.UtcNow;

            await _events.RaiseAsync(new UserLoginSuccessEvent(result.Username, $"{result.Id}", result.Username));

            await JwtSignInAsync(result, user.Persist);

            await _service.UpdateUser(result);

            return result;
        }

        private async Task SignOutAsync()
        {
            await CookieSignOutAsync();

            await _events.RaiseAsync(new UserLogoutSuccessEvent(User.GetSubjectId(), User.GetDisplayName()));
        }

        private async Task CookieSignInAsync(ApplicationUser user, bool persist = false)
        {
            await HttpContext.SignInAsync(
                UserHelperExtensions.CookieAuthScheme,
                UserHelperExtensions.GetCookieClaimsPrincipal(user),
                UserHelperExtensions.GetAuthenticationProperties(persist));
        }

        private async Task CookieSignOutAsync()
        {
            await HttpContext.SignOutAsync(UserHelperExtensions.CookieAuthScheme);
        }

        private async Task JwtSignInAsync(ApplicationUser user, bool persist = false)
        {
            var display = user.Displayname ?? user.Username;
            await HttpContext.SignInAsync(
                $"{user.Id}",
                user.Username,
                UserHelperExtensions.GetAuthenticationProperties(persist),
                new Claim(JwtClaimTypes.Id, $"{user.Id}"),
                new Claim(JwtClaimTypes.NickName, display),
                new Claim(JwtClaimTypes.Name, display));
        }

        private async Task JwtSignOutAsync()
        {
            await HttpContext.SignOutAsync(UserHelperExtensions.JwtAuthScheme);
        }
    }
}