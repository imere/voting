using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Mvc;
using vote.Models;
using vote.Data;
using System.Security.Claims;
using vote.Utils;

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
        public async Task<ActionResult<ResponseState>> GetAll()
        {
            var polls = (await _service.GetAllPolls())
                .Select(poll => new
                {
                    poll.Id,
                    poll.Title,
                    poll.Content
                });

            return new ResponseState(polls);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ResponseState>> GetById(int id)
        {
            try
            {
                Poll result = await _service.GetPollById(id);

                if (null == result) return new ResponseState(null);

                var poll = new
                {
                    result.Id,
                    result.Title,
                    result.Content
                };

                return new ResponseState(poll);
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpPut]
        public async Task<ActionResult<ResponseState>> Add(Poll poll)
        {
            int userId = Util.ParseUserId(HttpContext, ClaimTypes.NameIdentifier);

            Poll result = await _service.AddPoll(userId, poll);

            if (null == result) return BadRequest();

            return CreatedAtAction(nameof(Add), result);
        }

        [HttpPost]
        public async Task<ActionResult<ResponseState>> Update(Poll poll)
        {
            Poll result = await _service.UpdatePoll(poll);

            if (null == result) return BadRequest();

            return new ResponseState(result);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<ResponseState>> DeleteById(int id)
        {
            Poll result = await _service.DeletePollById(new Poll { Id = id });
            return new ResponseState(result);
        }
    }
}
