using System.Collections.Generic;

namespace Client
{
    public class Order
    {
        public Client Client { get; set; }
        public ClientOrder ClientOrder { get; set; }
        public List<OrderProducts> OrderProducts { get; set; }
    }
}