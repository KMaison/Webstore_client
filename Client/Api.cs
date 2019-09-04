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
           // var fact = new ChannelFactory<IService1>(new BasicHttpBinding(),
           //new EndpointAddress("http://localhost:28732/Service1.svc?singleWsdl"));
           // var client = fact.CreateChannel();
            try
            {
                //client.CreateClientOrder(order.ClientOrder.Address);
                Console.WriteLine(" [x] Requesting add client order(" + order.ClientOrder.Address + ")");
                var clresponse = rpcClient.CallBuying("ClientOrder?" + order.ClientOrder.Address);
                Console.WriteLine(" [.] Got '{0}'", clresponse);
                //rpcClient.Close();
                //client.AddClient(order.Client.Firstname, order.Client.Surname, "1");
                Console.WriteLine(" [x] Requesting add client(" + order.Client.Firstname + ")");
                var cresponse = rpcClient.CallBuying("Client?" + order.Client.Firstname + "," + order.Client.Surname + "," + clresponse);
                Console.WriteLine(" [.] Got '{0}'", cresponse);

                foreach (var orderProduct in order.OrderProducts)
                {
                    //client.AddOrderProduct(orderProduct.Amount, orderProduct.BarCode, "1");
                    Console.WriteLine(" [x] Requesting add order product(" + orderProduct.BarCode + ")");
                    var opresponse = rpcClient.CallBuying("ProductOrder?" + orderProduct.Amount + "," + orderProduct.BarCode+","+clresponse );
                    Console.WriteLine(" [.] Got '{0}'", opresponse);
                    //rpcClient.Close();

                    //client.BuyProduct(orderProduct.BarCode, orderProduct.Amount);
                    //Console.WriteLine(" [x] Requesting buy product(" + orderProduct.BarCode + ")");
                    //var bpresponse = rpcClient.CallBuying("BuyProduct?" + orderProduct.BarCode + "," + orderProduct.Amount);
                    //Console.WriteLine(" [.] Got '{0}'", bpresponse);

                }
            } 
            catch
            {
                Console.WriteLine("catch");
            }
        
    }
        /*
    public bool AddOrderProduct(Order_products order)
    {
        var rpcClient = new RPCClinet();

        Console.WriteLine(" [x] Requesting add order product(" + order.Bar_code + ")");
        var response = rpcClient.CallBuying("ProductOrder?" + order.Amount + "," + order.Bar_code + "," + order.ID_client_order);

        Console.WriteLine(" [.] Got '{0}'", response);
        rpcClient.Close();
        if (response.Equals(" ")) return false;
        else return true;
        //var fact = new ChannelFactory<IService1>(new BasicHttpBinding(),
        //  new EndpointAddress("http://localhost:28732/Service1.svc?singleWsdl"));
        //var client = fact.CreateChannel();

        //return client.AddOrderProduct(order.Amount, order.Bar_code, order.ID_client_order);
    }
    public int AddClientOrder(Client_order order)//TODO: zamienic na string
    {
        var rpcClient = new RPCClinet();

        Console.WriteLine(" [x] Requesting add client order(" + order.Address + ")");
        var response = rpcClient.CallBuying("ClientOrder?" + order.Address);

        Console.WriteLine(" [.] Got '{0}'", response);
        rpcClient.Close();
        return Int32.Parse(response);
        //var fact = new ChannelFactory<IService1>(new BasicHttpBinding(),
        //    new EndpointAddress("http://localhost:28732/Service1.svc?singleWsdl"));
        //var client = fact.CreateChannel();
        //return client.CreateClientOrder(order.Address);
    }*/
    public void Index()
    {
        var fact = new ChannelFactory<IService1>(new BasicHttpBinding(),
           new EndpointAddress("http://localhost:28732/Service1.svc?singleWsdl"));
        var client = fact.CreateChannel();
    }
/*
    public bool AddClient(Client client)
    {
        var rpcClient = new RPCClinet();

        Console.WriteLine(" [x] Requesting add client(" + client.Firstname + ")");
        var response = rpcClient.CallBuying("Client?" + client.Firstname + "," + client.Surname + "," + client.Order_ID);

        Console.WriteLine(" [.] Got '{0}'", response);
        rpcClient.Close();
        if (response.Equals(" ")) return false;
        else return true;

        //var fact = new ChannelFactory<IService1>(new BasicHttpBinding(),
        //  new EndpointAddress("http://localhost:28732/Service1.svc?singleWsdl"));
        //var c = fact.CreateChannel();

        //return c.AddClient(client.Firstname, client.Surname, client.Order_ID);
    }*/
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

        //ChannelFactory<IService1> fact = new ChannelFactory<IService1>(new BasicHttpBinding(),
        //    new EndpointAddress("http://localhost:28732/Service1.svc?singleWsdl"));
        //var client = fact.CreateChannel();

        //bool reserve = client.ReserveProduct(product.Key, product.Amount);

        //return reserve;
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
        /*
    public bool Buy(Product product)
    {
        ChannelFactory<IService1> fact = new ChannelFactory<IService1>(new BasicHttpBinding(),
           new EndpointAddress("http://localhost:28732/Service1.svc?singleWsdl"));
        var client = fact.CreateChannel();

        bool reserve = client.BuyProduct(product.Key, product.Amount);

        return reserve;
    }*/
}
}