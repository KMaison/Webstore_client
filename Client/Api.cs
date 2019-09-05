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

        public void OrderProducts(Order order)
        {
            var rpcClient = new RPCClinet();
            try
            {
                var parameters = "Buy?" + order.ClientOrder.Address;

                parameters += ";" + order.Client.Firstname + "," + order.Client.Surname  /*+ clresponse*/;

                foreach (var orderProduct in order.OrderProducts)
                {
                    parameters += ";" + orderProduct.Amount + "," + orderProduct.BarCode  /*+ clresponse*/;
                    //TODO:
                    //client.BuyProduct(orderProduct.BarCode, orderProduct.Amount);                    
                    //var bpresponse = rpcClient.CallBuying("BuyProduct?" + orderProduct.BarCode + "," + orderProduct.Amount);
                }
                parameters += ";";
                var opresponse = rpcClient.CallBuying(parameters);
                Console.WriteLine(" [.] Got '{0}'", opresponse);
            }
            catch
            {
                Console.WriteLine("problem z kolejka");
            }

        }

        public void Index()
        {
            var fact = new ChannelFactory<IService1>(new BasicHttpBinding(),
               new EndpointAddress("http://localhost:28732/Service1.svc?singleWsdl"));
            var client = fact.CreateChannel();
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
            var rpcClient = new RPCClinet();

            Console.WriteLine(" [x] Requesting reservation(" + product.Key + ")");
            var response = rpcClient.CallReservation("ReserveProduct?" + product.Key + "," + product.Amount);

            Console.WriteLine(" [.] Got '{0}'", response);
            rpcClient.Close();
            if (response == " ") return false;
            else return true;
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
    }
}