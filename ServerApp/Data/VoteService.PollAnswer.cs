using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using vote.Models;

namespace vote.Data
{
    public partial class VoteService
    {
        public async Task<PollAnswer> AddAnswerByUserAndPoll(long userId, long pollId, object answer)
        {
            try
            {
                var result = await _context.PollAnswer.AddAsync(new PollAnswer
                {
                    Answer = JsonConvert.SerializeObject(answer),
                    CreatedAt = DateTime.UtcNow,
                    UserId = userId,
                    PollId = pollId
                });
                await _context.SaveChangesAsync();
                return result.Entity;
            }
            catch (JsonSerializationException)
            {
                return null;
            }
        }

        public async Task DeleteAnswersByPollId(long pollId)
        {
            _context.PollAnswer.RemoveRange(_context.PollAnswer.Where(predicate => predicate.PollId == pollId));
            await _context.SaveChangesAsync();
        }
    }
}
