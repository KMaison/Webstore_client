﻿using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.ServiceModel;

namespace WCFServiceWebRole1
{
    [ServiceContract]
    public interface IService1
    {
        [OperationContract]
        bool UpdateProduct(string key, string size, string color, string price, string type, string amount_Reserved, string amount_To_Reserve);

        [OperationContract]
        bool AddOrderProduct(string amount, string bar_code, string id_client_order);

        [OperationContract]
        bool AddClient(string first_name, string surname, string order_id);

        [OperationContract]
        int CreateClientOrder(string address);

        [OperationContract]
        bool AddClientOrder(string orderid, string address, string order_status);
        [OperationContract]
        bool UpdateClientOrder(string order_id, string order_status);

        [OperationContract]
        bool ifProductAmountEnough(string id, string amount);

        [OperationContract]
        String[] GetProductList();

        [OperationContract]
        bool ReserveProduct(string key, string amount);

        [OperationContract]
        bool BuyProduct(string key, string amount);

        [OperationContract]
        int GetAmount_To_Reserve(string id);

        [OperationContract]
        bool ifProductAmountEnough(string id, string amount);

        [OperationContract]
        String[] SetProductList();

        [OperationContract]
        string getProductPrice(string id);
    }
}
