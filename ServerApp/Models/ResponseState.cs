using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace vote.Models
{
    public class ResponseState
    {
        public int Code { get; }

        public string Text { get; }

        public DateTime Time { get; }

        public object Data { get; }

        public ResponseState(object data, int code = 200, string text = "")
        {
            Code = code;
            Text = text;
            Time = DateTime.UtcNow;
            Data = data;
        }
    }
}
