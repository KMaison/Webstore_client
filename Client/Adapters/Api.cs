using Client.Port;
using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.Text;
using System.Threading.Tasks;

namespace Client.Adapter
{
    public class Api : IApi
    {
        public bool AddOrderProduct(Order_products order)
        {
            var fact = new ChannelFactory<IService1>(new BasicHttpBinding(),
              new EndpointAddress("http://localhost:28732/Service1.svc?singleWsdl"));
            var client = fact.CreateChannel();

            return client.AddOrderProduct(order.Amount, order.Bar_code);
        }

        public bool AddProduct(Product product)
        {
            var fact = new ChannelFactory<IService1>(new BasicHttpBinding(),
                new EndpointAddress("http://localhost:28732/Service1.svc?singleWsdl"));
            var client = fact.CreateChannel();

            return client.AddProduct(product.Key, product.Size, product.Color, product.Price, product.Type, product.Amount);
        }
        public bool AddClientOrder(Client_order order)
        {
            var fact = new ChannelFactory<IService1>(new BasicHttpBinding(),
                new EndpointAddress("http://localhost:28732/Service1.svc?singleWsdl"));
            var client = fact.CreateChannel();

            return client.AddClientOrder(order.Order_ID, order.ID_order_product, order.Address, order.Order_status);
        }
        public void Index()
        {
            var fact = new ChannelFactory<IService1>(new BasicHttpBinding(),
               new EndpointAddress("http://localhost:28732/Service1.svc?singleWsdl"));
            var client = fact.CreateChannel();
        }

        public ProductsList ViewProducts()
        {
            ChannelFactory<IService1> fact = new ChannelFactory<IService1>(new BasicHttpBinding(),
                new EndpointAddress("http://localhost:28732/Service1.svc?singleWsdl"));
            var client = fact.CreateChannel();

            var products = client.GetProducts(); //return null :/

            return client.GetProducts();
        }

        public bool AddClient(Client client)
        {
            var fact = new ChannelFactory<IService1>(new BasicHttpBinding(),
              new EndpointAddress("http://localhost:28732/Service1.svc?singleWsdl"));
            var c = fact.CreateChannel();

            return c.AddClient(client.Pesel, client.Firstname, client.Surname, client.Order_ID);
        }
    }
}
