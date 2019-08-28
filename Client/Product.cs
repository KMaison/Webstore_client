using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Runtime.Serialization;

namespace Client
{
    [DataContract]
    public class Product
    {
        [DataMember]
        public string Key { get; set; }

        [DataMember]
        public string Amount { get; set; }
    }
}
