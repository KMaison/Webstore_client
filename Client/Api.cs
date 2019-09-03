using Client.Port;
using Newtonsoft.Json;
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
            var rpcClient = new RpcClient();

            Console.WriteLine(" [x] Add order product(" + order.Bar_code + ")");
            var response = rpcClient.CallBuying("OrderProduct?"+order.Amount+','+ order.Bar_code + ',' + order.ID_client_order);

            Console.WriteLine(" [.] Got '{0}'", response);
            rpcClient.Close();
            if (response != null) return true;
            return false;
            
        }
        public int AddClientOrder(Client_order order)//TODO: zamienic na string
        {
            var rpcClient = new RpcClient();

            Console.WriteLine(" [x] Requesting add client order(" + order.Address + ")");
            var response = rpcClient.CallBuying("ClientOrder?"+order.Address);

            Console.WriteLine(" [.] Got '{0}'", response);
            rpcClient.Close();
            return Int32.Parse(response);
        }
        public void Index()
        {
            var fact = new ChannelFactory<IService1>(new BasicHttpBinding(),
               new EndpointAddress("http://localhost:28732/Service1.svc?singleWsdl"));
            var client = fact.CreateChannel();
        }

        public bool AddClient(Client client)
        {
            var rpcClient = new RpcClient();

            Console.WriteLine(" [x] Requesting add client (" + client.Firstname + ")");
            var response = rpcClient.CallBuying("Client?" + client.Firstname+","+client.Surname+","+client.Order_ID);

            Console.WriteLine(" [.] Got '{0}'", response);
            rpcClient.Close();
            if (response != null) return true;
            return false;
        }
        public String[] ViewProducts()
        {
            ChannelFactory<IService1> fact = new ChannelFactory<IService1>(new BasicHttpBinding(),
                new EndpointAddress("http://localhost:28732/Service1.svc?singleWsdl"));
            var client = fact.CreateChannel();

            String[] productList = client.GetProductList();

            return productList;
        }

        public bool ReserveProduct(Product product)
        {

            var rpcClient = new RpcClient();

            Console.WriteLine(" [x] Requesting Reserve product("+product.Key+")");
            var response = rpcClient.CallReservation(product.Key+","+ product.Amount);

            Console.WriteLine(" [.] Got '{0}'", response);
            rpcClient.Close();
            if (response != null) return true;
            return false;
        }

        public bool IfProductAmountEnough(string id, string amount)
        {
            var fact = new ChannelFactory<IService1>(new BasicHttpBinding(),
             new EndpointAddress("http://localhost:28732/Service1.svc?singleWsdl"));
            var c = fact.CreateChannel();

            return c.ifProductAmountEnough(id, amount);
        }
        public float GetProductPrice(string id)
        {
            var fact = new ChannelFactory<IService1>(new BasicHttpBinding(),
            new EndpointAddress("http://localhost:28732/Service1.svc?singleWsdl"));
            var c = fact.CreateChannel();
            var value = c.getProductPrice(id);
            if (value != null)
            {

                return float.Parse(c.getProductPrice(id));
            }
            else
                return 0;
        }

        public bool Buy(Product product)
        {
            ChannelFactory<IService1> fact = new ChannelFactory<IService1>(new BasicHttpBinding(),
               new EndpointAddress("http://localhost:28732/Service1.svc?singleWsdl"));
            var client = fact.CreateChannel();

            bool reserve = client.BuyProduct(product.Key, product.Amount);

            return reserve;
        }
    }
}