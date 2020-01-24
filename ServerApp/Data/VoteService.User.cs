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
        public async Task<User> AddUser(User user)
        {
            try
            {
                var result = await _context.User.AddAsync(user);
                await _context.SaveChangesAsync();
                return result.Entity;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<User> RemoveUser(User user)
        {
            try
            {
                var result = _context.User.Remove(user);

                if (null == result) return null;

                await _context.SaveChangesAsync();

                return result.Entity;
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

        public async Task<User> ValidateUser(User user)
        {
            try
            {
                return await (
                        from o in _context.User.AsNoTracking()
                        where o.Username == user.Username && o.Password == user.Password
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

        public async Task<List<User>> GetAllUsers()
        {
            try
            {
                return await (
                        from o in _context.User.AsNoTracking()
                        select o
                    )
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<User> GetUserById(int id)
        {
            try
            {
                return await (
                         from o in _context.User.AsNoTracking()
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
    }
}
