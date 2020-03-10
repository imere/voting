using Newtonsoft.Json;
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

        [StringLength(20, ErrorMessage = "The {0} must be at least {2} and at max {1} characters long.", MinimumLength = 1)]
        [Column(TypeName = "varchar(128)")]
        public string Title { get; set; }

        [StringLength(100, ErrorMessage = "The {0} must be at least {2} and at max {1} characters long.", MinimumLength = 0)]
        [DataType(DataType.Text)]
        public string Description { get; set; }

        [DataType(DataType.Text)]
        public string Content { get; set; }

        [Column(TypeName = "datetime2")]
        public DateTime CreatedAt { get; set; }

        [ForeignKey("PollPropId")]
        public PollProp PollProp { get; set; }

        public long? PollPropId { get; set; }

        public ICollection<PollAnswer> PollAnswers { get; set; }

        [ForeignKey("UserId")]
        public ApplicationUser User { get; set; }

        public long UserId { get; set; }
    }
}
