using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace vote.Models
{
    public class LoginUserRequest
    {
        [Required]
        [StringLength(25, ErrorMessage = "The {0} must be at least {2} and at max {1} characters long.", MinimumLength = 5)]
        [DataType(DataType.Text)]
        public string Username { get; set; }

        [Required]
        [StringLength(16, ErrorMessage = "The {0} must be at least {2} and at max {1} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Column(TypeName = "datetime2")]
        public DateTime? LastLogin { get; set; }

        [DefaultValue(false)]
        public bool Persist { get; set; } = false;
    }
}
