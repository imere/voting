using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace vote.Models
{
    public class PollAnswer
    {
        [Key]
        public long Id { get; set; }

        [Required]
        [DataType(DataType.Text)]
        public string Answer { get; set; }

        [Required]
        [Column(TypeName = "datetime2")]
        public DateTime CreatedAt { get; set; }

        [Required]
        public Poll Poll { get; set; }

        public ApplicationUser User { get; set; }
    }
}
