using System;
using System.ServiceModel;
using System.ServiceModel.Web;

namespace Client.Port
{
    [ServiceContract]
    public interface IApi
    {
        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "OrderProducts", BodyStyle = WebMessageBodyStyle.WrappedRequest,
            RequestFormat = WebMessageFormat.Json)]
        void OrderProducts(Order order);

        [OperationContract]
        [WebGet(UriTemplate = "ViewProducts", ResponseFormat = WebMessageFormat.Json,
            RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.WrappedRequest)]
        String[] ViewProducts();

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "ReserveProduct", BodyStyle = WebMessageBodyStyle.WrappedRequest,
          RequestFormat = WebMessageFormat.Json)]
        bool ReserveProduct(Product product);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "ifProductAmountEnough",
            BodyStyle = WebMessageBodyStyle.WrappedRequest, RequestFormat = WebMessageFormat.Json)]
        bool IfProductAmountEnough(string id, string amount);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "getProductPrice", BodyStyle = WebMessageBodyStyle.WrappedRequest,
       RequestFormat = WebMessageFormat.Json)]
        float GetProductPrice(string id);
    }

}
