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

        public DbSet<PollProp> PollProp { get; set; }

        public DbSet<PollData> PollData { get; set; }

        public DbSet<PollAnswer> PollAnswer { get; set; }

        public VoteContext(DbContextOptions<VoteContext> options)
            : base(options)
        { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<ApplicationUser>()
                .HasIndex(user => user.Username)
                .IsUnique();
            builder.Entity<ApplicationUser>()
                .HasIndex(user => user.Displayname)
                .IsUnique();

            builder.Entity<PollProp>()
                .Property(props => props.Public)
                .HasDefaultValue(true);

            builder.Entity<PollData>()
                .Property(data => data.Required)
                .HasDefaultValue(true);
            var pd = new PollData();
            builder.Entity<PollData>()
                .HasIndex(nameof(pd.Order), $"{nameof(pd.Poll)}{nameof(pd.Poll.Id)}")
                .IsUnique();
        }
    }
}
