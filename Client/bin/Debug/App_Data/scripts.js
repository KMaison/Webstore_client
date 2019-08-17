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

function AddProduct() {
    var fn = function (request) {
        var e = document.getElementById("wynik");
        e.innerHTML = request.responseXML.childNodes[0].childNodes[0].nodeValue;
        e = document.getElementById("resp");
        e.innerHTML = request.responseText;
    };
	var key, size, color, price, type, amount;
	key = document.getElementById("key").value;
	size = document.getElementById("size").value;
	color = document.getElementById("color").value;
	price = document.getElementById("price").value;
	type = document.getElementById("type").value;
	amount = document.getElementById("amount").value;

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
    amount = document.getElementById("amount").value;
    barcode = document.getElementById("barcode").value;

    var params = {
        "order": {
            "Amount": amount,
            "Bar_code": barcode
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
    var order_id, id_order_products, address, order_status;
    order_id = document.getElementById("orderid").value;
    id_order_products = document.getElementById("idorderproduct").value;
    address = document.getElementById("address").value;
    order_status = document.getElementById("orderstatus").value;
    console.log("id:" + order_id);
    console.log("products:" + id_order_products);
    console.log("adr: " + address);
    console.log("status:" + order_status);
    var params = {
        "order": {
            "Order_ID": order_id,
            "ID_order_product":id_order_products,
            "Address": address,
            "Order_status":order_status
        }
    };

    DoAjax("POST", "http://127.0.0.1/api/AddClientOrder", fn, params);
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