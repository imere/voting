using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using vote.Models;

namespace vote.Data
{
    public class VoteContext : DbContext
    {
        public DbSet<ApplicationUser> User { get; set; }

        public DbSet<Poll> Poll { get; set; }

        public DbSet<PollProps> PollProps { get; set; }

        public VoteContext(DbContextOptions<VoteContext> options)
            : base(options)
        { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<ApplicationUser>()
                .Property(user => user.Username)
                .IsRequired();
            builder.Entity<ApplicationUser>()
                .HasIndex(user => user.Username)
                .IsUnique();
            builder.Entity<ApplicationUser>()
                .Property(user => user.Password)
                .IsRequired();
        }
    }
}
