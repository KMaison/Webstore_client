using Client.Port;
using System;
using System.Transactions;
using System.ServiceModel;
using WCFServiceWebRole1;

namespace Client.Adapter
{
    public class Api : IApi
    {
        [OperationBehavior(TransactionScopeRequired = true)]
        public void OrderProducts(Order order)
        {
            
            using (var transactionScope = new TransactionScope(TransactionScopeOption.Required))
            {
                var fact = new ChannelFactory<IService1>(new WSDualHttpBinding
                {
                    TransactionFlow = true
                }, new EndpointAddress("http://localhost:28732/Service1.svc?singleWsdl"));
                var client = fact.CreateChannel();
                try 
                {
                    client.CreateClientOrder(order.ClientOrder.Address);
                    client.AddClient(order.Client.Firstname, order.Client.Surname, "1");

                    foreach (var orderProduct in order.OrderProducts)
                    {
                        client.AddOrderProduct(orderProduct.Amount, orderProduct.BarCode, "1");
                        client.BuyProduct(orderProduct.BarCode, orderProduct.Amount);
                    }
                    transactionScope.Complete();
                }
                catch (Exception ex)
                {
                    transactionScope.Dispose();
                }
            }
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
            ChannelFactory<IService1> fact = new ChannelFactory<IService1>(new BasicHttpBinding(),
                new EndpointAddress("http://localhost:28732/Service1.svc?singleWsdl"));
            var client = fact.CreateChannel();

            bool reserve = client.ReserveProduct(product.Key, product.Amount);

            return reserve;
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

        public void Index()
        {
            var fact = new ChannelFactory<IService1>(new BasicHttpBinding(),
               new EndpointAddress("http://localhost:28732/Service1.svc?singleWsdl"));
            var client = fact.CreateChannel();
        }
    }
}