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
            var polls = (await _service.GetAllPolls())
                .Select(poll => new
                {
                    poll.Id,
                    poll.Title,
                    poll.Content
                });

            return Ok(new ResponseState(polls));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetById(int id)
        {
            try
            {
                Poll result = await _service.GetPollById(id);

                if (null == result) return Ok(new ResponseState(null));

                var poll = new
                {
                    result.Id,
                    result.Title,
                    result.Content
                };

                return Ok(new ResponseState(poll));
            }
            catch
            {
                return BadRequest();
            }
        }

        [Authorize]
        [HttpPut]
        public async Task<ActionResult<ResponseState>> Add([FromBody] Poll poll)
        {
            int userId = UserHelperExtensions.ParseCookieUserId(User);

            Poll result = await _service.AddPoll(userId, poll);

            if (null == result) return BadRequest();

            return CreatedAtAction(nameof(Add), result);
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult> Update([FromBody] Poll poll)
        {
            Poll result = await _service.UpdatePoll(poll);

            if (null == result) return BadRequest();

            return Ok(new ResponseState(result));
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteById(int id)
        {
            Poll result = await _service.DeletePollById(new Poll { Id = id });
            return NoContent();
        }
    }
}
