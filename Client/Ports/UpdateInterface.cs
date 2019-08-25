using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.Text;
using System.Threading.Tasks;

namespace ClientApp.Ports
{
    [ServiceContract]
    public interface UpdateInterface
    {
        [OperationContract]
        bool UpdateProduct(string key, string size, string color, string price, string type, string amount);
        
        [OperationContract]
        bool UpdateOrderProduct(string id, string amount, string bar_code);
        
        [OperationContract]
        bool UpdateClient(string pesel, string first_name, string surname, string order_id);
        
        [OperationContract]
        bool UpdateClientOrder(string order_id, string id_order_product, string address, string order_status);
    }
}
