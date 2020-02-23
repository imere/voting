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

        public DbSet<PollAnswer> PollAnswer { get; set; }

        public VoteContext(DbContextOptions<VoteContext> options)
            : base(options)
        { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<ApplicationUser>()
                .Property(props => props.Username)
                .IsRequired();
            builder.Entity<ApplicationUser>()
                .Property(props => props.Password)
                .IsRequired();
            builder.Entity<ApplicationUser>()
                .Property(props => props.CreatedAt)
                .IsRequired();
            builder.Entity<ApplicationUser>()
                .HasIndex(user => user.Username)
                .IsUnique();
            builder.Entity<ApplicationUser>()
                .HasIndex(user => user.Displayname)
                .IsUnique();


            builder.Entity<Poll>()
                .Property(props => props.Title)
                .IsRequired();
            builder.Entity<Poll>()
                .Property(props => props.Content)
                .IsRequired();
            builder.Entity<Poll>()
                .Property(props => props.CreatedAt)
                .IsRequired();
            builder.Entity<Poll>()
                .Property(props => props.UserId)
                .IsRequired();


            builder.Entity<PollProp>()
                .Property(props => props.IsPublic)
                .HasDefaultValue(true);


            builder.Entity<PollAnswer>()
                .Property(props => props.Answer)
                .IsRequired();
            builder.Entity<PollAnswer>()
                .Property(props => props.CreatedAt)
                .IsRequired();
            builder.Entity<PollAnswer>()
                .Property(props => props.PollId)
                .IsRequired();
            builder.Entity<PollAnswer>()
                .Property(props => props.UserId)
                .IsRequired();
            builder.Entity<PollAnswer>()
                .HasOne(props => props.User)
                .WithMany(props => props.PollAnswers)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
