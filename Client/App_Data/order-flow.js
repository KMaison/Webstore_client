function addOrderProduct(barcode, id, amount) {
    var fn = function (request) {
        var x = request.responseXML.childNodes[0].childNodes[0].nodeValue;
        return x;
    };
    var params = {
        "order": {
            "Amount": amount,
            "Bar_code": barcode,
            "ID_client_order": id

        }
    };
    doAjaxPOST("POST", "http://127.0.0.1/api/AddOrderProduct", fn, params);
}

function addOrderProducts(id) {
    var products_list = JSON.parse(localStorage.getItem("card"));
    var amount, barcode;
    for (i = 0; i < products_list.length; i++) {
        amount = products_list[i].Amount;
        barcode = products_list[i].Key;

        if (addOrderProduct(barcode, id, amount) != true) {
            return false;//przetestowac
        }
    }
    return true;//przetestowac
}

function addClientOrder() {
    var fn = function (request) {
        var id = request.responseXML.childNodes[0].childNodes[0].nodeValue;

        addClient(id)
        addOrderProducts(id) //todo: weryfikacja tego, transakcyjnosc!!!!!
        buyProducts();  //usun kupione produkty z bazy (zmniejsz ilosc zarezerwowanych)


    };
    var address;
    address = document.getElementById("address").value;
    var params = {
        "order": {
            "Address": address
        }
    };

    doAjaxPOST("POST", "http://127.0.0.1/api/AddClientOrder", fn, params);
}

function buyProducts() {//transakcyjnosc
    var products_list = [];
    products_list = JSON.parse(localStorage.getItem("card"));
    if (products_list == null) products_list = [];

    for (i = 0; i < products_list.length; i++) {
        var y = buyProduct(products_list[i]); //TODO: sprawdzenei czy sie udalo
    }
}

function buyProduct(product) {
    var fn = function (request) {
        var result = request.responseXML.childNodes[0].childNodes[0].nodeValue;
        return result; //todo: jak dobrze to usun z local storage
    };
    var firstname, surname;
    firstname = document.getElementById("firstname").value;
    surname = document.getElementById("surname").value;
    var params = {
        "product": {
            "Key": product.Key.toString(),
            "Amount": product.Amount.toString()
        }
    };

    doAjaxPOST("POST", "http://127.0.0.1/api/buyProduct", fn, params);
}
function addClient(id) {
    var fn = function (request) {
        var e = request.responseXML.childNodes[0].childNodes[0].nodeValue;
        return e;
    };
    var firstname, surname;
    firstname = document.getElementById("firstname").value;
    surname = document.getElementById("surname").value;
    var params = {
        "client": {
            "Firstname": firstname,
            "Surname": surname,
            "Order_ID": id
        }
    };

    doAjaxPOST("POST", "http://127.0.0.1/api/AddClient", fn, params);
}
