using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;
using System.Threading.Tasks;

namespace ClientApp.Ports
{
    [ServiceContract]
    public interface ViewGetterInterface
    {
        [OperationContract]
        [WebGet(UriTemplate = "GetView/{url}")]
        Stream GetView(string url);
    }
}
