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
        public async Task<User> SeedUser(User user)
        {
            await _context.User.AddAsync(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<List<User>> GetAllUsers()
        {
            List<User> users = await (
                from o in _context.User.AsNoTracking()
                select new User
                {
                    Id = o.Id,
                    Username = o.Username,
                    Password = o.Password
                })
                .ToListAsync();

            return users;
        }

        public async Task<User> GetUserById(int id)
        {
            User user = await (
                from o in _context.User.AsNoTracking()
                where o.Id == id
                select new User()
                {
                    Id = o.Id,
                    Username = o.Username,
                    Password = o.Password
                }
                ).FirstAsync();
            return user;
        }
    }
}
