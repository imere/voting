using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Security.Claims;
using vote.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using IdentityModel;
using Newtonsoft.Json;

namespace vote.Extensions
{
    public static class PollExtensions
    {
        public static QuestionnaireResponse ToQuestionnaire(Poll poll)
        {
            if (null == poll) return null;

            var isPublic = true;

            if (null != poll.PollPropId)
            {
                if (false == poll.PollProp.IsPublic)
                {
                    isPublic = false;
                }
            }

            return new QuestionnaireResponse
            {
                Id = poll.Id,
                Title = poll.Title,
                Description = poll.Description,
                IsPublic = isPublic,
                Content = JsonConvert.DeserializeObject(poll.Content),
                CreatedAt = poll.CreatedAt
            };
        }
    }
}
