using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using vote.Models;

namespace vote.Data
{
    public partial class VoteService
    {
        public async Task<Poll> SeedPoll(Poll poll)
        {
            await _context.Poll.AddAsync(poll);
            await _context.SaveChangesAsync();
            return poll;
        }

        public async Task<List<Poll>> GetAllPolls()
        {
            List<Poll> polls = await (
                from o in _context.Poll.AsNoTracking()
                orderby o.CreatedAt descending
                select new Poll
                {
                    Id = o.Id,
                    Title = o.Title,
                    Content = o.Content,
                    UserId = o.UserId
                })
                .ToListAsync();

            return polls;
        }

        public async Task<Poll> GetPollById(int id)
        {
            Poll poll = await (
                from o in _context.Poll.AsNoTracking()
                where o.Id == id
                select new Poll
                {
                    Id = o.Id,
                    Title = o.Title,
                    Content = o.Content,
                    UserId = o.UserId
                })
                .FirstAsync();

            return poll;
        }
    }
}
