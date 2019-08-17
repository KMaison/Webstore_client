using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace Client
{
    public class ProductsList
    {
        public List<Product> list { get; set; }
        public ProductsList()
        {
            list = new List<Product>();
        }
    }
}
