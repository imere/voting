using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using vote.Models;

namespace vote.Data
{
    public partial class VoteService
    {
        public async Task<Poll> AddPoll(int userId, Poll poll)
        {
            try
            {
                ApplicationUser user = await GetUserById(userId);

                if (null == user) return null;

                poll.UserId = user.Id;
                var result = await _context.Poll.AddAsync(poll);
                await _context.SaveChangesAsync();

                return result.Entity;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<Poll>> GetAllPolls()
        {
            try
            {
                return await (
                        from o in _context.Poll.AsNoTracking()
                        select o
                    )
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<Poll> GetPollById(int id)
        {
            try
            {
                return await (
                        from o in _context.Poll.AsNoTracking()
                        where o.Id == id
                        select o
                    )
                    .SingleAsync();
            }
            catch (InvalidOperationException)
            {
                return null;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<Poll>> GetPollsByUserId(int id)
        {
            try
            {
                return await (
                        from o in _context.Poll.AsNoTracking()
                        where o.UserId == id
                        select o
                    )
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<Poll> UpdatePoll(Poll poll)
        {
            try
            {
                var result = _context.Poll.Update(poll);
                result.State = EntityState.Modified;
                await _context.SaveChangesAsync();
                return result.Entity;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<Poll> DeletePollById(Poll poll)
        {
            try
            {
                var result = _context.Poll.Remove(poll);
                await _context.SaveChangesAsync();
                return result.Entity;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
