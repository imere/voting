using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using vote.Models;
using vote.Data;

namespace vote.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class PollController : ControllerBase
    {
        private readonly VoteService _service;

        public PollController(VoteService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<ResponseState>> Get()
        {
            {
                // Debug
                //User user = null;
                //user = await _service.SeedUser(new User()
                //{
                //    Username = "username",
                //    Password = "password"
                //});
                //user = await _service.GetUserById(1);
                //await _service.SeedPoll(new Poll()
                //{
                //    Title = "title",
                //    Content = "content",
                //    UserId = user.Id,
                //});
                //await _service.SeedPoll(new Poll()
                //{
                //    Title = "title2",
                //    Content = "content2",
                //    UserId = user.Id
                //});
            }
            var polls = (from o in await _service.GetAllPolls()
                         select new
                         {
                             o.Id,
                             o.Title,
                             o.Content
                         })
                         .ToList();
            return new ResponseState(polls);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ResponseState>> Get(int id)
        {
            try
            {
                var result = await _service.GetPollById(id);
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

        [HttpPost]
        public ActionResult<ResponseState> Post([FromBody] string value)
        {
            return new ResponseState(new { });
        }

        [HttpPut("{id}")]
        public ActionResult<ResponseState> Put(int id, [FromBody] string value)
        {
            return NoContent();
        }

        [HttpDelete("{id}")]
        public ActionResult<ResponseState> Delete(int id)
        {
            return NoContent();
        }
    }
}
