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
        public Poll ReturnPollIfPublic(Poll poll)
        {
            if (null == poll.PollProp) return poll;

            if (false == poll.PollProp.IsPublic) return null;

            return poll;
        }

        public async Task<Poll> AddPollByUserId(long userId, Questionnaire questionnaire)
        {
            try
            {
                EntityEntry<PollProp> prop = null;
                if (null != questionnaire.IsPublic && false == questionnaire.IsPublic)
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
            catch (JsonSerializationException)
            {
                return null;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<Poll>> GetAllPolls(long startId = 0, int? count = null)
        {
            try
            {
                var chain = _context.Poll
                    .Include(p => p.PollProp)
                    .Include(p => p.PollAnswers)
                    .Where(p => p.Id >= startId);

                if (null != count)
                {
                    chain = chain.Take((int)count);
                }

                return await chain
                    .AsNoTracking()
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
                var tmp = ReturnPollIfPublic(poll);
                if (null != tmp) res.Add(tmp);
            }

            return res;
        }

        public async Task<Poll> GetPollById(long pollId)
        {
            try
            {
                return await _context.Poll
                    .Include(p => p.PollProp)
                    .Include(p => p.PollAnswers)
                    .Where(p => p.Id == pollId)
                    .AsNoTracking()
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

                return ReturnPollIfPublic(poll);
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
                return await _context.Poll
                    .Include(p => p.PollProp)
                    .Include(p => p.PollAnswers)
                    .Where(p => p.User.Id == userId)
                    .AsNoTracking()
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
            catch (JsonSerializationException)
            {
                return null;
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
                var result = await _context.Poll.Where(p => p.User.Id == userId).Where(p => p.Id == questionnaire.Id).SingleOrDefaultAsync();

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
                var result = await _context.Poll.Where(p => p.User.Id == userId).Where(p => p.Id == poll.Id).SingleOrDefaultAsync();

                return await DeletePollById(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
