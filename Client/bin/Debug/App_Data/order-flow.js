function orderProducts() {
    var fn = function (request) {
        var result = request.responseXML.childNodes[0].childNodes[0].nodeValue;
        if(result==="true")
        window.location.href = 'finish.html';
        else window.location.href = 'bad.html';
        return result; 
    };

    var clientOrder = getClientOrder();
    var client = getClient();
    var orderProducts = getOrderProducts();

    params = {
        order: {
            ClientOrder: clientOrder,
            Client: client,
            OrderProducts: orderProducts
        }
    }

    doAjaxPOST("POST", "http://127.0.0.1/api/OrderProducts", fn, params);
}

function getClientOrder() {
    var address = document.getElementById("address").value;
    var mail = document.getElementById("email").value;

    return {
        Address: address,
        Mail: mail
    };
}

function getClient() {
    var firstname = document.getElementById("firstname").value;
    var surname = document.getElementById("surname").value;

    return {
        Firstname: firstname,
        Surname: surname
    }
}

function getOrderProducts() {
    var products_list = JSON.parse(localStorage.getItem("card"));
    var order_products = [];
    for (i = 0; i < products_list.length; i++) {
        amount = products_list[i].Amount;
        barcode = products_list[i].Key;

        order_products.push({
            "Amount": amount,
            "BarCode": barcode
        });
    }
    return order_products;
}