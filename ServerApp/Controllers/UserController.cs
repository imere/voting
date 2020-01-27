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

namespace vote.UserController
{
    [Route("api/[controller]")]
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

        [Authorize]
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
        public async Task<ActionResult> Register([FromBody] ApplicationUser user)
        {
            ApplicationUser result = await _service.AddUser(user);

            if (null == result) return BadRequest();

            return CreatedAtAction(nameof(Register), new ResponseState(result));
        }

        [Authorize]
        [HttpDelete]
        public async Task<ActionResult> UnRegister()
        {
            ApplicationUser result = await _service.RemoveUser(new ApplicationUser
            {
                Id = UserHelperExtensions.ParseCookieUserId(User)
            });

            if (null == result) return BadRequest();

            return NoContent();
        }

        [HttpPost("login")]
        public async Task<ActionResult<ResponseState>> Login([FromBody] ApplicationUser user)
        {
            ApplicationUser result = await SignInAsync(user);

            if (null == result) return Redirect("/");

            return Ok(new ResponseState(null));
        }

        [Authorize]
        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await SignOutAsync();
            return LocalRedirect("/");
        }

        private async Task<ApplicationUser> SignInAsync(ApplicationUser user)
        {
            ApplicationUser result = await _service.ValidateUser(user);

            if (null == result)
            {
                await _events.RaiseAsync(new UserLoginFailureEvent(user.Username, "invalid credentials"));
                return null;
            }

            await _events.RaiseAsync(new UserLoginSuccessEvent(result.Username, $"{result.Id}", result.Username));

            await HttpContext.SignInAsync($"{user.Id}", user.Username, UserHelperExtensions.GetAuthenticationProperties());

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
            await HttpContext.SignInAsync($"{user.Id}", user.Username, UserHelperExtensions.GetAuthenticationProperties(persist));
        }

        private async Task JwtSignOutAsync()
        {
            await HttpContext.SignOutAsync(UserHelperExtensions.JwtAuthScheme);
        }
    }

}