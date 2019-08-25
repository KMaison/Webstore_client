using ClientApp.Ports;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.ServiceModel.Web;
using System.Text;
using System.Threading.Tasks;

namespace ClientApp.Adapters
{
    public class ViewGetter : ViewGetterInterface
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
}
