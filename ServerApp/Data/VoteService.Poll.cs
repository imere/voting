using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Newtonsoft.Json;
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
        public async Task<Poll> ReturnPollIfPublic(Poll poll)
        {
            if (null == poll?.PollPropId) return poll;

            var prop = await GetPollPropById(poll.PollPropId);

            if (false == prop?.IsPublic) return null;

            return poll;
        }

        public async Task<Poll> AddPollByUserId(long userId, Questionnaire questionnaire)
        {
            try
            {
                EntityEntry<PollProp> prop = null;
                if ((bool)questionnaire.IsPublic)
                {
                    prop = await _context.PollProp.AddAsync(new PollProp
                    {
                        IsPublic = questionnaire.IsPublic
                    });
                }

                var result = await _context.Poll.AddAsync(new Poll
                {
                    Title = questionnaire.Title,
                    Description = questionnaire.Description,
                    Content = JsonConvert.SerializeObject(questionnaire.Content),
                    CreatedAt = DateTime.UtcNow,
                    UserId = userId,
                    PollPropId = prop?.Entity.Id
                });

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
                var tmp = await ReturnPollIfPublic(poll);
                if (null != tmp) res.Add(tmp);
            }

            return res;
        }

        public async Task<Poll> GetPollById(long pollId)
        {
            try
            {
                return await (
                        from o in _context.Poll.AsNoTracking()
                        where o.Id == pollId
                        select o
                    )
                    .SingleOrDefaultAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<Poll> GetPublicPollById(long pollId)
        {
            try
            {
                var poll = await GetPollById(pollId);

                return await ReturnPollIfPublic(poll);
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

        private async Task<Poll> UpdatePoll(QuestionnaireUpdate questionnaire)
        {
            try
            {
                var result = _context.Poll.Update(new Poll
                {
                    Id = questionnaire.Id,
                    Content = JsonConvert.SerializeObject(questionnaire.Content)
                });
                result.State = EntityState.Modified;

                if (null == result.Entity.PollPropId)
                {
                    if ((bool)questionnaire.IsPublic)
                    {
                        await AddPollPropByPollId(result.Entity.Id, new PollProp
                        {
                            IsPublic = questionnaire.IsPublic
                        });
                    }
                }
                else
                {
                    UpdatePollProp(new PollProp
                    {
                        Id = (long)result.Entity.PollPropId,
                        IsPublic = questionnaire.IsPublic
                    });
                }

                await _context.SaveChangesAsync();
                return result.Entity;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<Poll> UpdatePollByUserId(long userId, QuestionnaireUpdate questionnaire)
        {
            try
            {
                var result = await _context.Poll.Where(predicate => predicate.User.Id == userId).Where(predicate => predicate.Id == questionnaire.Id).SingleOrDefaultAsync();

                if (null == result) return null;

                return await UpdatePoll(questionnaire);
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
                if (null != poll?.PollPropId) RemovePollPropById((long)poll.PollPropId);

                var result = _context.Poll.Remove(poll);

                await _context.SaveChangesAsync();
                return result.Entity;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<Poll> DeletePollByIdAndUser(long userId, Poll poll)
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
    }
}
