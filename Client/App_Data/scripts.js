function DoAjax(method, url, fn, params) {
	var request = new XMLHttpRequest();
	request.open(method, url, true);
	request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

	var handler = function (request) {
		return function () {
			if (request.readyState != 4) return;
			if (request.status == 200) fn(request);
			else alert(request.readyState + " " + request.status + " " + request.statusText);
		};
	}
	request.onreadystatechange = handler(request);
	request.send(JSON.stringify(params));
}
 function BarCodeGenerator() {
    return  Math.random().toString(36).substr(2, 5);
};

function AddProduct() {
    var fn = function (request) {
        var e = document.getElementById("wynik");
        e.innerHTML = request.responseXML.childNodes[0].childNodes[0].nodeValue;
        e = document.getElementById("resp");
        e.innerHTML = request.responseText;
    };
	var key,name, size, color, price, type, amount;
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
            "Name":name,
			"Size": size,
			"Color": color,
			"Price": price,
			"Type": type,
			"Amount": amount
		}

	};

	DoAjax("POST", "http://127.0.0.1/api/AddProduct", fn, params);
}
function AddOrderProduct() {
    var fn = function (request) {
        var e = document.getElementById("wynik");
        e.innerHTML = request.responseXML.childNodes[0].childNodes[0].nodeValue;
        e = document.getElementById("resp");
        e.innerHTML = request.responseText;
    };
    var id, amount, barcode;
    id = document.getElementById("id").value;
    amount = document.getElementById("amount").value;
    barcode = document.getElementById("barcode").value;
    var params = {
        "order": {
            "ID_order_products":id,
            "Amount": amount,
            "Bar_code": barcode,
            "ID_client_order": 0

        }
    };
    DoAjax("POST", "http://127.0.0.1/api/AddOrderProduct", fn, params);
}
function AddClientOrder() {
    var fn = function (request) {
        var e = document.getElementById("wynik");
        e.innerHTML = request.responseXML.childNodes[0].childNodes[0].nodeValue;
        e = document.getElementById("resp");
        e.innerHTML = request.responseText;
    };
    var address;
    address = document.getElementById("address").value;
    var params = {
        "order": {
            "Order_ID":0,
            "Address": address,
            "Order_status": "Processing" //becouse when client create order it is in prccessing mode
        }
    };

    DoAjax("POST", "http://127.0.0.1/api/AddClientOrder", fn, params);
}
function AddClient() {
    var fn = function (request) {
        var e = document.getElementById("wynik");
        e.innerHTML = request.responseXML.childNodes[0].childNodes[0].nodeValue;
        e = document.getElementById("resp");
        e.innerHTML = request.responseText;
    };
    var pesel, firstname, surname, orderID;
    pesel = document.getElementById("pesel").value;
    firstname = document.getElementById("firstname").value;
    surname = document.getElementById("surname").value;
    var params = {
        "client": {
            "Pesel": pesel,
            "Firstname": firstname,
            "Surname": surname,
            "Order_ID": 0
        }
    };

    DoAjax("POST", "http://127.0.0.1/api/AddClient", fn, params);
}

function ViewProducts() {
	var fn = function (request) {
		var e = document.getElementById("wynik");
		e.innerHTML = request.responseXML.childNodes[0].childNodes[0].nodeValue;
		e = document.getElementById("resp");
		e.innerHTML = request.responseText;
    };
    console.log(fn)
    console.log(fn.e)
	var key, size, color, price, type, amount;
	key = 0;
	size = 0;
	color = 0;
	price = 0;
	type = 0;
	amount = 0;

	var params = {
		"product": {
			"Key": key,
			"Size": size,
			"Color": color,
			"Price": price,
			"Type": type,
			"Amount": amount
		}
	};

	DoAjax("GET", "http://127.0.0.1/api/ViewProducts", fn, params); //0?
}