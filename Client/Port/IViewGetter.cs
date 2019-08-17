using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;
using System.Threading.Tasks;

namespace Client.Port
{
    [ServiceContract]
    public interface IViewGetter
    {
        [OperationContract]
        [WebGet(UriTemplate = "GetView/{url}")]
        Stream GetView(string url);
    }
}
