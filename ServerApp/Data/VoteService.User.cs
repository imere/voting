﻿using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
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
            catch (DbUpdateException ex)
            {
                if (ex.InnerException.Message.Contains("duplicate")) return null;
                else throw ex;
            }
        }

        public async Task<ApplicationUser> RemoveUserById(ApplicationUser user)
        {
            var result = _context.User.Remove(user);

            await _context.SaveChangesAsync();

            return result.Entity;
        }

        public async Task<ApplicationUser> UpdateUser(ApplicationUser user)
        {
            var result = _context.User.Update(user);
            await _context.SaveChangesAsync();
            return result.Entity;
        }

        public async Task<ApplicationUser> ValidateUser(ApplicationUser user)
        {
            return await (
                    from o in _context.User.AsNoTracking()
                    where o.Username == user.Username && o.Password == user.Password
                    select o
                )
                .SingleOrDefaultAsync();
        }

        public async Task<List<ApplicationUser>> GetAllUsers()
        {
            return await (
                    from o in _context.User.AsNoTracking()
                    select o
                )
                .ToListAsync();
        }

        public async Task<ApplicationUser> GetUserById(long id)
        {
            return await (
                     from o in _context.User.AsNoTracking()
                     where o.Id == id
                     select o
                )
                .SingleOrDefaultAsync();
        }
    }
}
