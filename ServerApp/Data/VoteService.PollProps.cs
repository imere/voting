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
        public async Task<PollProp> AddPollPropByPollId(long pollId, PollProp prop)
        {
            Poll result = await _context.Poll.Where(predicate => predicate.Id == pollId).SingleOrDefaultAsync();

            if (null == result) return null;

            result.PollPropId = prop.Id;

            await _context.PollProp.AddAsync(prop);
            return prop;
        }

        public async Task<PollProp> GetPollPropById(long? propId)
        {
            return await _context.PollProp.AsNoTracking().Where(predicate => predicate.Id == propId).SingleOrDefaultAsync();
        }

        public PollProp UpdatePollProp(PollProp prop)
        {
            var result = _context.PollProp.Update(prop);
            result.State = EntityState.Modified;
            return result.Entity;
        }

        public void RemovePollPropById(long propId)
        {
            _context.PollProp.Remove(new PollProp { Id = propId });
        }
    }
}
