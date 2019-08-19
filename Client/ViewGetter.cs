using Client.Port;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.ServiceModel.Web;
using System.Text;
using System.Threading.Tasks;

namespace Client.Adapter
{
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
}
