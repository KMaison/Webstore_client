using System;
using System.Collections.Generic;
using System.IO;
using System.ServiceModel;
using System.ServiceModel.Description;
using System.ServiceModel.Web;
using System.Text;

//http://127.0.0.1/ViewGetter/GetView/index.html
namespace Client
{
    class Program
    {
        static void Main(string[] args)
        {
            var serviceHost = new ServiceHost(typeof(ViewGetter));
            var serviceEndpoint = serviceHost.AddServiceEndpoint(typeof(IViewGetter), new WebHttpBinding(), "http://127.0.0.1/ViewGetter");
            serviceEndpoint.Behaviors.Add(new WebHttpBehavior());
            serviceHost.Open();

            var apiServiceHost = new ServiceHost(typeof(Api));
            var apiServiceEndpoint = apiServiceHost.AddServiceEndpoint(typeof(IApi), new WebHttpBinding(), "http://127.0.0.1/api");
            apiServiceEndpoint.Behaviors.Add(new WebHttpBehavior());
            apiServiceHost.Open();

            Console.ReadLine();
            serviceHost.Close();
            apiServiceHost.Close();
        }
    }

    [ServiceContract]
    public interface IViewGetter
    {
        [OperationContract]
        [WebGet(UriTemplate = "GetView/{url}")]
        Stream GetView(string url);
    }

    public class ViewGetter : IViewGetter
    {
        public Stream GetView(string url)
        {
            using (var stream = new StreamReader($"./App_Data/{url}"))
            {
                var data = stream.ReadToEnd();
                byte[] resultBytes = Encoding.UTF8.GetBytes(data);
                WebOperationContext.Current.OutgoingResponse.ContentType = "text/html";

                return new MemoryStream(resultBytes);
            }
        }
    }
    [ServiceContract]
    public interface IApi
    {
        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "AddProduct", BodyStyle = WebMessageBodyStyle.WrappedRequest,
            RequestFormat = WebMessageFormat.Json)]
        bool AddProduct(Product product);
        void Index();

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "AddOrderProduct", BodyStyle = WebMessageBodyStyle.WrappedRequest,
           RequestFormat = WebMessageFormat.Json)]
        bool AddOrderProduct(Order_products order);

        [OperationContract]
        [WebGet(UriTemplate = "ViewProducts", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.WrappedRequest)]
        String[] ViewProducts();
    }

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

            String[] productList = client.SetProductList();
                                          
            return productList;
        }

    }

}
