using ClientApp.Domain;
using ClientApp.Ports;
using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.Text;
using System.Threading.Tasks;

namespace ClientApp.Adapters
{
    public class Api : ApiInterface
    {
        public void Index()
        {
            var fact = new ChannelFactory<ViewGetterInterface>(new BasicHttpBinding(),
               new EndpointAddress("http://localhost:28732/Adapters/InsertsService.svc?wsdl"));
            var client = fact.CreateChannel();
        }        
        public String[] ViewProducts()
        {
            ChannelFactory<SelectsInterface> fact = new ChannelFactory<SelectsInterface>(new BasicHttpBinding(),
                new EndpointAddress("http://localhost:28732/Adapters/SelectsService.svc?wsdl"));
            var client = fact.CreateChannel();

            String[] productList = client.SetProductList();

            return productList;
        }

        public bool ifProductAmountEnough(string id, string amount)
        {
            var fact = new ChannelFactory<SelectsInterface>(new BasicHttpBinding(),
             new EndpointAddress("http://localhost:28732/Adapters/SelectsService.svc?wsdl"));
            var c = fact.CreateChannel();

            return c.ifProductAmountEnough(id,amount);
        }
        public float getProductPrice(string id)
        {
            var fact = new ChannelFactory<SelectsInterface>(new BasicHttpBinding(),
            new EndpointAddress("http://localhost:28732/Adapters/SelectsService.svc?wsdl"));
            var c = fact.CreateChannel();
            var value = c.getProductPrice(id);
            if (value != null)
                return float.Parse(c.getProductPrice(id));
            else
                return 0;
        }
        public bool AddOrderProduct(Order_products order)
        {
            var fact = new ChannelFactory<InsertsInterface>(new BasicHttpBinding(),
              new EndpointAddress("http://localhost:28732/Adapters/InsertsService.svc?wsdl"));
            var client = fact.CreateChannel();

            return client.AddOrderProduct(order.Amount, order.Bar_code, order.ID_client_order);
        }

        public bool AddProduct(Product product)
        {
            var fact = new ChannelFactory<InsertsInterface>(new BasicHttpBinding(),
                new EndpointAddress("http://localhost:28732/Adapters/InsertsService.svc?wsdl"));
            var client = fact.CreateChannel();

            return client.AddProduct(product.Key, product.Name, product.Size, product.Color, product.Price, product.Type, product.Amount);
        }

        public int AddClientOrder(Client_order order)//TODO: zamienic na string
        {
            var fact = new ChannelFactory<InsertsInterface>(new BasicHttpBinding(),
                new EndpointAddress("http://localhost:28732/Adapters/InsertsService.svc?wsdl"));
            var client = fact.CreateChannel();
            return client.CreateClientOrder(order.Address);
        }

        public bool AddClient(Client client)
        {
            var fact = new ChannelFactory<InsertsInterface>(new BasicHttpBinding(),
              new EndpointAddress("http://localhost:28732/Adapters/InsertsService.svc?wsdl"));
            var c = fact.CreateChannel();

            return c.AddClient(client.Firstname, client.Surname, client.Order_ID);
        }
    }
}
