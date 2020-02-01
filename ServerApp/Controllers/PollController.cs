using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Mvc;
using vote.Models;
using vote.Data;
using System.Security.Claims;
using vote.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace vote.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class PollController : ControllerBase
    {
        private readonly VoteService _service;

        private readonly ILogger<PollController> _logger;

        public PollController(VoteService service, ILogger<PollController> logger)
        {
            _service = service;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            var polls = (await _service.GetAllPublicPolls())
                .Select(poll => new
                {
                    poll.Id,
                    poll.Title,
                    poll.Description,
                    poll.CreatedAt,
                    poll.User.Displayname,
                });

            return Ok(new ResponseState(polls));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetById(int id)
        {
            try
            {
                Poll result = await _service.GetPublicPollById(id);

                if (null == result) return Ok(new ResponseState(null));

                var poll = new
                {
                    result.Id,
                    result.Title,
                };

                return Ok(new ResponseState(poll));
            }
            catch
            {
                return BadRequest();
            }
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPut]
        public async Task<ActionResult<ResponseState>> Add([FromBody] Poll poll)
        {
            Poll result = await _service.AddPollByUserId(UserHelperExtensions.ParseCookieUserId(User), poll);

            if (null == result) return BadRequest();

            return CreatedAtAction(nameof(Add), result);
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost]
        public async Task<ActionResult> Update([FromBody] Poll poll)
        {
            Poll result = await _service.UpdatePollByUserId(UserHelperExtensions.ParseCookieUserId(User), poll);

            if (null == result) return BadRequest();

            return Ok(new ResponseState(result));
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteById(int id)
        {
            await _service.DeletePollByUserId(UserHelperExtensions.ParseCookieUserId(User), new Poll { Id = id });
            return NoContent();
        }
    }
}
