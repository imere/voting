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

        [DataType(DataType.Text)]
        public string Answer { get; set; }

        [Column(TypeName = "datetime2")]
        public DateTime CreatedAt { get; set; }

        [ForeignKey("PollId")]
        public Poll Poll { get; set; }

        public long PollId { get; set; }

        [ForeignKey("UserId")]
        public ApplicationUser User { get; set; }

        public long? UserId { get; set; }
    }
}
