using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace vote.Models
{
    public class PollProp
    {
        [Key]
        public long Id { get; set; }

        [Column(TypeName = "varchar(1)")]
        [DefaultValue(true)]
        public bool? IsPublic { get; set; } = true;

        [Column(TypeName = "datetime2")]
        public DateTime? ExpiresAt { get; set; }
    }
}
