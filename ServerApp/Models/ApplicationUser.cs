using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;

namespace vote.Models
{
    public class ApplicationUser
    {
        [Key]
        public long Id { get; set; }

        [Required]
        [StringLength(25, ErrorMessage = "The {0} must be at least {2} and at max {1} characters long.", MinimumLength = 5)]
        [DataType(DataType.Text)]
        public string Username { get; set; }

        [Required]
        [StringLength(16, ErrorMessage = "The {0} must be at least {2} and at max {1} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [StringLength(10, ErrorMessage = "The {0} must be at least {2} and at max {1} characters long.", MinimumLength = 3)]
        [Column(TypeName = "varchar(128)")]
        public string Displayname { get; set; }

        [Required]
        [Column(TypeName = "datetime2")]
        public DateTime CreatedAt { get; set; }

        [Column(TypeName = "datetime2")]
        public DateTime? LastLogin { get; set; }

        public ICollection<Poll> Polls { get; set; }

        public ICollection<PollAnswer> PollAnswers { get; set; }

        [NotMapped]
        [DefaultValue(false)]
        public bool Persist { get; set; } = false;
    }
}
