using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace vote.Models
{
    public class PollProps
    {
        public int Id { get; set; }

        [Column(TypeName = "datetime2")]
        public DateTime ExpiresAt { get; set; }
    }
}
