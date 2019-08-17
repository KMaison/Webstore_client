using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;
using System.Threading.Tasks;

namespace Client.Port
{
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
        [WebInvoke(Method = "POST", UriTemplate = "AddClientOrder", BodyStyle = WebMessageBodyStyle.WrappedRequest,
           RequestFormat = WebMessageFormat.Json)]
        bool AddClientOrder(Client_order order);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "AddClient", BodyStyle = WebMessageBodyStyle.WrappedRequest,
           RequestFormat = WebMessageFormat.Json)]
        bool AddClient(Client client);

        [OperationContract]
        [WebGet(UriTemplate = "ViewProducts")]
        ProductsList ViewProducts();
    }
}
