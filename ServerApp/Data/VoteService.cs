using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace vote.Data
{
    public partial class VoteService
    {
        private readonly VoteContext _context;

        public VoteService(VoteContext context)
        {
            _context = context;
        }
    }
}
