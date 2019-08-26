using System;
using System.Collections.Generic;
using System.ServiceModel;

namespace Client
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "IService1" in both code and config file together.
    [ServiceContract]
    public interface IService1
    {
        [OperationContract]
        bool AddProduct(string key,string name, string size, string color, string price, string type,string amount);
        [OperationContract]
        bool UpdateProduct(string key, string size, string color, string price, string type, string amount);

        [OperationContract]
        bool AddOrderProduct(string amount, string bar_code,string id_client_order);
        [OperationContract]
        bool UpdateOrderProduct(string id, string amount, string bar_code);

        [OperationContract]
        bool AddClient(string first_name, string surname, string order_id);
        [OperationContract]
        bool UpdateClient(string pesel, string first_name, string surname, string order_id);

        [OperationContract]
        int CreateClientOrder(string address);

        [OperationContract]
        bool AddClientOrder(string orderid,string address, string order_status);
        [OperationContract]
        bool UpdateClientOrder(string order_id, string id_order_product, string address, string order_status);

        [OperationContract]
        String[] GetProductList();

        [OperationContract]
        bool ReserveProduct(string key, string amount);


        [OperationContract]
        int GetAmount_To_Reserve(string id);//mozna zrobic prywatne
    }
}
