using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.Text;
using System.Threading.Tasks;

namespace ClientApp.Ports
{
    [ServiceContract]
    public interface SelectsInterface
    {
        [OperationContract]
        bool ifProductAmountEnough(string id, string amount);

        [OperationContract]
        String[] SetProductList();

        [OperationContract]
        string getProductPrice(string id);
    }
}
