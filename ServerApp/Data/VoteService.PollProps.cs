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
        public async Task<PollProp> AddProps(Poll poll, PollProp props)
        {
            Poll result;
            try
            {
                result = await _context.Poll.Where(predicate => predicate.Id == poll.Id).SingleOrDefaultAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }

            if (null == result) return null;

            result.PollProp = props;

            await _context.PollProp.AddAsync(props);
            await _context.SaveChangesAsync();
            return props;
        }

        public async Task<PollProp> GetPollPropsById(long? propsId)
        {
            return await _context.PollProp.Where(predicate => predicate.Id == propsId).SingleOrDefaultAsync();
        }
    }
}
