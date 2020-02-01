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
        public async Task<Poll> AddPollByUserId(long userId, Poll poll)
        {
            try
            {
                poll.User.Id = userId;
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

        public async Task<List<Poll>> GetAllPublicPolls()
        {
            var polls = await GetAllPolls();
            List<Poll> res = new List<Poll>();

            foreach (var poll in polls)
            {
                var tmp = await GetPollIfPublic(poll);
                if (null != tmp) res.Add(tmp);
            }

            return res;
        }

        public async Task<Poll> GetPollById(long id)
        {
            try
            {
                return await (
                        from o in _context.Poll.AsNoTracking()
                        where o.Id == id
                        select o
                    )
                    .SingleOrDefaultAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<Poll> GetPublicPollById(long id)
        {
            try
            {
                var poll = await GetPollById(id);

                return await GetPollIfPublic(poll);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<Poll>> GetPollsByUserId(long userId)
        {
            try
            {
                return await (
                        from o in _context.Poll.AsNoTracking()
                        where o.User.Id == userId
                        select o
                    )
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private async Task<Poll> UpdatePoll(Poll poll)
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

        public async Task<Poll> UpdatePollByUserId(long userId, Poll poll)
        {
            try
            {
                var result = await _context.Poll.Where(predicate => predicate.User.Id == userId).Where(predicate => predicate.Id == poll.Id).SingleOrDefaultAsync();

                return await UpdatePoll(poll);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private async Task<Poll> DeletePollById(Poll poll)
        {
            try
            {
                if (null != poll?.PollPropId) _context.PollProp.Remove(new PollProp { Id = (long)poll.PollPropId });

                var result = _context.Poll.Remove(poll);
                await _context.SaveChangesAsync();

                return result.Entity;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<Poll> DeletePollByUserId(long userId, Poll poll)
        {
            try
            {
                var result = await _context.Poll.Where(predicate => predicate.User.Id == userId).Where(predicate => predicate.Id == poll.Id).SingleOrDefaultAsync();

                return await DeletePollById(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private async Task<Poll> GetPollIfPublic(Poll poll)
        {

            if (null == poll?.PollPropId) return poll;

            var props = await GetPollPropsById(poll.PollPropId);

            if (false == props.Public) return null;

            return poll;
        }
    }
}
