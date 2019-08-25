// JavaScript source code
function AddProduct() {
    var fn = function (request) {
        var e = document.getElementById("wynik");
        e.innerHTML = request.responseXML.childNodes[0].childNodes[0].nodeValue;
        e = document.getElementById("resp");
        e.innerHTML = request.responseText;
    };
    var key, name, size, color, price, type, amount;
    key = BarCodeGenerator();
    name = document.getElementById("name").value;
    size = document.getElementById("size").value;
    color = document.getElementById("color").value;
    price = document.getElementById("price").value;
    type = document.getElementById("type").value;
    amount = document.getElementById("amount").value;

    var params = {
        "product": {
            "Key": key,
            "Name": name,
            "Size": size,
            "Color": color,
            "Price": price,
            "Type": type,
            "Amount": amount
        }

    };

    DoAjaxPOST("POST", "http://127.0.0.1/api/AddProduct", fn, params);
}


function AddOrderProduct(barcode, id, amount) {
    var fn = function (request) {
        var x = request.responseXML.childNodes[0].childNodes[0].nodeValue;

    };
    var params = {
        "order": {
            "Amount": amount,
            "Bar_code": barcode,
            "ID_client_order": id

        }
    };
    DoAjaxPOST("POST", "http://127.0.0.1/api/AddOrderProduct", fn, params);
}

function AddOrderProducts(id) {
    var products_list = JSON.parse(localStorage.getItem("card"));
    var amount, barcode;
    for (i = 0; i < products_list.length; i++) {
        amount = products_list[i].Amount;
        barcode = products_list[i].Key;

        AddOrderProduct(barcode, id, amount);
    }
}

function AddClientOrder() {
    var fn = function (request) {
        var id = request.responseXML.childNodes[0].childNodes[0].nodeValue;
        AddClient(id);
        AddOrderProducts(id)
    };
    var address;
    address = document.getElementById("address").value;
    var params = {
        "order": {
            "Address": address
        }
    };

    DoAjaxPOST("POST", "http://127.0.0.1/api/AddClientOrder", fn, params);
}
function AddClient(id) {
    var fn = function (request) {
        var e = document.getElementById("wynik");
        e.innerHTML = request.responseXML.childNodes[0].childNodes[0].nodeValue;
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

    DoAjaxPOST("POST", "http://127.0.0.1/api/AddClient", fn, params);
}