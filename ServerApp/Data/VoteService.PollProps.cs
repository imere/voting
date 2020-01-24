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
        public async Task<PollProps> AddProps(Poll poll, PollProps props)
        {
            Poll result;
            try
            {
                result = await _context.Poll.Where(predicate => predicate.Id == poll.Id).SingleAsync();
            }
            catch (InvalidOperationException)
            {
                return null;
            }
            catch (Exception ex)
            {
                throw ex;
            }

            result.Props = props;
            await _context.PollProps.AddAsync(props);
            await _context.SaveChangesAsync();
            return props;
        }
    }
}
