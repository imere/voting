using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace vote.Models
{
    public class PollData
    {
        [Key]
        public long Id { get; set; }

        [Required]
        [Column(TypeName = "varchar(32)")]
        public string Type { get; set; }

        [Required]
        [Column(TypeName = "varchar(32)")]
        public string Label { get; set; }

        [Required]
        [DataType(DataType.Text)]
        public string Content { get; set; }

        [Required]
        [Column(TypeName = "datetime2")]
        public DateTime CreatedAt { get; set; }

        [Required]
        public int Order { get; set; }

        [Column(TypeName = "varchar(1)")]
        [DefaultValue(true)]
        public bool? Required { get; set; }

        [Required]
        public Poll Poll { get; set; }
    }
}
