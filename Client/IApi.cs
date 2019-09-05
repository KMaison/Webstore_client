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
        [WebInvoke(Method = "POST", UriTemplate = "OrderProducts", BodyStyle = WebMessageBodyStyle.WrappedRequest,
           RequestFormat = WebMessageFormat.Json)]
        void OrderProducts(Order order);

       /* [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "AddOrderProduct", BodyStyle = WebMessageBodyStyle.WrappedRequest,
           RequestFormat = WebMessageFormat.Json)]
        bool AddOrderProduct(Order_products order);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "AddClientOrder", BodyStyle = WebMessageBodyStyle.WrappedRequest,
           RequestFormat = WebMessageFormat.Json)]
        int AddClientOrder(Client_order order);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "AddClient", BodyStyle = WebMessageBodyStyle.WrappedRequest,
           RequestFormat = WebMessageFormat.Json)]
        bool AddClient(Client client);
        */
        [OperationContract]
        [WebGet(UriTemplate = "ViewProducts", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.WrappedRequest)]
        String[] ViewProducts();

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "ReserveProduct", BodyStyle = WebMessageBodyStyle.WrappedRequest,
          RequestFormat = WebMessageFormat.Json)]
        bool ReserveProduct(Product product);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "ifProductAmountEnough", BodyStyle = WebMessageBodyStyle.WrappedRequest,
         RequestFormat = WebMessageFormat.Json)]
        bool IfProductAmountEnough(string id, string amount);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "getProductPrice", BodyStyle = WebMessageBodyStyle.WrappedRequest,
       RequestFormat = WebMessageFormat.Json)]
        float GetProductPrice(string id);

        /*[OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "buyProduct", BodyStyle = WebMessageBodyStyle.WrappedRequest,
       RequestFormat = WebMessageFormat.Json)]
        bool Buy(Product product);
   */ }

}
