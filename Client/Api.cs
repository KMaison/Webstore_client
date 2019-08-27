using Client.Port;
using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.Text;
using System.Threading.Tasks;
using WCFServiceWebRole1;

namespace Client.Adapter
{
    public class Api : IApi
    {
        public bool AddOrderProduct(Order_products order)
        {
            var fact = new ChannelFactory<IService1>(new BasicHttpBinding(),
              new EndpointAddress("http://localhost:28732/Service1.svc?singleWsdl"));
            var client = fact.CreateChannel();

            return client.AddOrderProduct(order.Amount, order.Bar_code, order.ID_client_order);
        }
        public int AddClientOrder(Client_order order)//TODO: zamienic na string
        {
            var fact = new ChannelFactory<IService1>(new BasicHttpBinding(),
                new EndpointAddress("http://localhost:28732/Service1.svc?singleWsdl"));
            var client = fact.CreateChannel();
            return client.CreateClientOrder(order.Address);
        }
        public void Index()
        {
            var fact = new ChannelFactory<IService1>(new BasicHttpBinding(),
               new EndpointAddress("http://localhost:28732/Service1.svc?singleWsdl"));
            var client = fact.CreateChannel();
        }

        public bool AddClient(Client client)
        {
            var fact = new ChannelFactory<IService1>(new BasicHttpBinding(),
              new EndpointAddress("http://localhost:28732/Service1.svc?singleWsdl"));
            var c = fact.CreateChannel();

            return c.AddClient(client.Firstname, client.Surname, client.Order_ID);
        }
        public String[] ViewProducts()
        {
            ChannelFactory<IService1> fact = new ChannelFactory<IService1>(new BasicHttpBinding(),
                new EndpointAddress("http://localhost:28732/Service1.svc?singleWsdl"));
            var client = fact.CreateChannel();

            String[] productList = client.GetProductList();

            return productList;
        }

        public bool ReserveProduct(Product_to_reserve product_To_reserve)
        {
            ChannelFactory<IService1> fact = new ChannelFactory<IService1>(new BasicHttpBinding(),
                new EndpointAddress("http://localhost:28732/Service1.svc?singleWsdl"));
            var client = fact.CreateChannel();

            bool reserve = client.ReserveProduct(product_To_reserve.Key, product_To_reserve.Amount);

            return reserve;
        }

        public bool ifProductAmountEnough(string id, string amount)
        {
            var fact = new ChannelFactory<IService1>(new BasicHttpBinding(),
             new EndpointAddress("http://localhost:28732/Service1.svc?singleWsdl"));
            var c = fact.CreateChannel();

            return c.ifProductAmountEnough(id, amount);
        }
        public float getProductPrice(string id)
        {
            var fact = new ChannelFactory<IService1>(new BasicHttpBinding(),
            new EndpointAddress("http://localhost:28732/Service1.svc?singleWsdl"));
            var c = fact.CreateChannel();
            var value = c.getProductPrice(id);
            if (value != null)
                return float.Parse(c.getProductPrice(id));
            else
                return 0;
        }
    }
}
    