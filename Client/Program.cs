using Client.Adapter;
using Client.Port;
using System;
using System.Collections.Generic;
using System.IO;
using System.ServiceModel;
using System.ServiceModel.Description;
using System.ServiceModel.Web;
using System.Text;
using System.Threading.Tasks;

//http://127.0.0.1/ViewGetter/GetView/index.html
namespace Client
{
    class Program
    {
        static void Main(string[] args)
        {
            var serviceHost = new ServiceHost(typeof(ViewGetter));
            var serviceEndpoint = serviceHost.AddServiceEndpoint(typeof(IViewGetter), new WebHttpBinding(), "http://127.0.0.1/ViewGetter");
            serviceEndpoint.Binding.ReceiveTimeout= TimeSpan.FromSeconds(100);

            serviceEndpoint.Behaviors.Add(new WebHttpBehavior());
            serviceHost.Open();

            var apiServiceHost = new ServiceHost(typeof(Api));
            var apiServiceEndpoint = apiServiceHost.AddServiceEndpoint(typeof(IApi), new WebHttpBinding(), "http://127.0.0.1/api");
            apiServiceEndpoint.Behaviors.Add(new WebHttpBehavior());
            apiServiceEndpoint.Binding.ReceiveTimeout = TimeSpan.FromSeconds(100);
            apiServiceHost.Open();

            Console.ReadLine();
            serviceHost.Close();
            apiServiceHost.Close();
           
  
        }
    }
}
