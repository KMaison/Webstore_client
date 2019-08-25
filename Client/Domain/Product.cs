using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Runtime.Serialization;

namespace ClientApp.Domain
{
    [DataContract]
    public class Product
    {
        [DataMember]
        public string Name { get; set; }
        [DataMember]
        public string Key { get; set; }
        [DataMember]
        public string Size { get; set; }
        [DataMember]
        public string Color { get; set; }
        [DataMember]
        public string Price { get; set; }
        [DataMember]
        public string Type { get; set; }
        [DataMember]
        public string Amount { get; set; }
    }
}
