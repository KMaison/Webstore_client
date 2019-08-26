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
        [WebInvoke(Method = "POST", UriTemplate = "AddProduct", BodyStyle = WebMessageBodyStyle.WrappedRequest, //usunac!
            RequestFormat = WebMessageFormat.Json)]
        bool AddProduct(Product product);
        void Index();//?

        [OperationContract]
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

        [OperationContract]
        [WebGet(UriTemplate = "ViewProducts", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.WrappedRequest)]
        String[] ViewProducts();

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "ReserveProduct", BodyStyle = WebMessageBodyStyle.WrappedRequest,
          RequestFormat = WebMessageFormat.Json)]
        bool ReserveProduct(Product_to_reserve product_To_reserve);


        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "ifProductAmountEnough", BodyStyle = WebMessageBodyStyle.WrappedRequest,
         RequestFormat = WebMessageFormat.Json)]
        bool ifProductAmountEnough(string id, string amount);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "getProductPrice", BodyStyle = WebMessageBodyStyle.WrappedRequest,
       RequestFormat = WebMessageFormat.Json)]
        float getProductPrice(string id);
    }
}
