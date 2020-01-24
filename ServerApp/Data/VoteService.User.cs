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
        public async Task<ApplicationUser> AddUser(ApplicationUser user)
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

        public async Task<ApplicationUser> RemoveUser(ApplicationUser user)
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

        public async Task<ApplicationUser> ValidateUser(ApplicationUser user)
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

        public async Task<List<ApplicationUser>> GetAllUsers()
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

        public async Task<ApplicationUser> GetUserById(int id)
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
