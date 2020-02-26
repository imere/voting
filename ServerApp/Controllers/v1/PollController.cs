using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Mvc;
using vote.Models;
using vote.Data;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using IdentityServer4.Extensions;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace vote.Controllers.v1
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
            var polls = (await _service.GetAllPolls());

            return Ok(new ResponseState(polls));
        }

        [HttpGet("p/{pollId}")]
        public async Task<ActionResult> GetByPollId(long pollId)
        {
            Poll result = await _service.GetPollById(pollId);

            if (null == result) return BadRequest(new ResponseState(null));

            var poll = new
            {
                result.Id,
                result.Title,
                result.Description,
                result.Content,
                result.CreatedAt
            };

            return Ok(new ResponseState(poll));
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPut("answer/{pollId}")]
        public async Task<ActionResult> AnswerPoll([FromRoute] long pollId, [FromBody] object answer)
        {
            _logger.LogError($"asdasd: {pollId} {JsonConvert.SerializeObject(answer)}");
            var result = await _service.AddAnswerByUserAndPoll(
                long.Parse(User.GetSubjectId()),
                pollId,
                answer);

            if (null == result) return BadRequest(new ResponseState(null));

            return Created("/", new ResponseState(null));
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet("u")]
        public async Task<ActionResult> GetByCurrentUser()
        {
            List<Poll> result = await _service.GetPollsByUserId(long.Parse(User.GetSubjectId()));

            var polls = result.Select(poll => new
            {
                poll.Id,
                poll.Title,
                poll.Description,
                poll.CreatedAt
            });

            return Ok(new ResponseState(polls));
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPut]
        public async Task<ActionResult<ResponseState>> Add([FromBody] Questionnaire questionnaire)
        {
            Poll result = await _service.AddPollByUserId(
                long.Parse(User.GetSubjectId()),
                questionnaire);

            if (null == result) return BadRequest(new ResponseState(null));

            return Created("/", new ResponseState(questionnaire));
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost]
        public async Task<ActionResult> Update([FromBody] QuestionnaireUpdate questionnaire)
        {
            Poll result = await _service.UpdatePollByUserId(
                long.Parse(User.GetSubjectId()),
                questionnaire);

            if (null == result) return BadRequest(new ResponseState(null));

            return Ok(new ResponseState(result));
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpDelete("{pollId}")]
        public async Task<ActionResult> DeleteById(long pollId)
        {
            await _service.DeletePollByIdAndUser(long.Parse(User.GetSubjectId()), new Poll { Id = pollId });
            return NoContent();
        }
    }
}
