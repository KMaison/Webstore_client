using System.Runtime.Serialization;

namespace Client
{
    [DataContract]
    public class Product_to_reserve
    {
        [DataMember]
        public string Key { get; set; }
         
        [DataMember]
        public string Amount { get; set; }
    }
}
