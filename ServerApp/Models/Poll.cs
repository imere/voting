using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace vote.Models
{
    public class Poll
    {
        [Key]
        public long Id { get; set; }

        [Required]
        [Column(TypeName = "varchar(128)")]
        public string Title { get; set; }

        [Column(TypeName = "varchar(512)")]
        public string Description { get; set; }

        public object[] Content { get; set; }

        [Required]
        [Column(TypeName = "datetime2")]
        public DateTime CreatedAt { get; set; }

        [ForeignKey("PollPropId")]
        public PollProp PollProp { get; set; }

        public long? PollPropId { get; set; }

        public ICollection<PollData> PollDatas { get; set; }

        public ICollection<PollAnswer> PollAnswers { get; set; }

        [Required]
        [ForeignKey("UserId")]
        public ApplicationUser User { get; set; }

        public long UserId { get; set; }
    }
}
