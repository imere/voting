using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using vote.Models;
using vote.Data;

namespace vote.UserController
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly VoteService _service;

        public UserController(VoteService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<ResponseState>> Get()
        {
            List<User> users = await _service.GetAllUsers();
            return new ResponseState(users);
        }
    }

}