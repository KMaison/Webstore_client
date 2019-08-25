using ClientApp.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;
using System.Threading.Tasks;

namespace ClientApp.Ports
{
    [ServiceContract]
    public interface InsertsInterface
    {
        [OperationContract]
        bool AddProduct(string key, string name, string size, string color, string price, string type, string amount);

        [OperationContract]
        bool AddOrderProduct(string amount, string bar_code, string id_client_order);

        [OperationContract]
        bool AddClient(string first_name, string surname, string order_id);

        [OperationContract]
        bool AddClientOrder(string orderid, string address, string order_status);

        [OperationContract]
        int CreateClientOrder(string address);

    }
}
