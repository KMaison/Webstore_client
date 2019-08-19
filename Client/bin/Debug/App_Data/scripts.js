function DoAjaxPOST(method, url, fn, params) {
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
function DoAjaxGET(method, url, fn) {
    var request = new XMLHttpRequest();
    request.open(method, url, true);

    var handler = function (request) {
        return function () {
            if (request.readyState != 4) return;
            if (request.status == 200) fn(request);
            else alert(request.readyState + " " + request.status + " " + request.statusText);
        };
    }
    request.onreadystatechange = handler(request);
    request.send();
}

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

	DoAjaxPOST("POST", "http://127.0.0.1/api/AddProduct", fn, params);
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
    DoAjaxPOST("POST", "http://127.0.0.1/api/AddOrderProduct", fn, params);
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

    DoAjaxPOST("POST", "http://127.0.0.1/api/AddClientOrder", fn, params);
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

    DoAjaxPOST("POST", "http://127.0.0.1/api/AddClient", fn, params);
}
function FillTable(e) {

    var myTableDiv = document.getElementById("products")
    var table = document.createElement('TABLE')
    var tableBody = document.createElement('TBODY')
    var buy_products, count;
    table.border = '1'
    table.appendChild(tableBody);

    var tr = document.createElement('TR');
    var array = ["Name","ID", "Size", "Color", "Price", "Type", "Available quantity", "Buy"];
    tableBody.appendChild(tr);
    for (i = 0; i < array.length; i++) {
        var th = document.createElement('TH')
        th.width = '75';
        th.appendChild(document.createTextNode(array[i]));
        tr.appendChild(th);

    }
    var k = 0;
    var key = 0;
    for (i = 0; i < e.length / 7; i++) {
        var tr = document.createElement('TR');
        for (j = 0; j < array.length - 1; j++) {
            if (j == 1) {
                key = k;
            }
            var td = document.createElement('TD')
            td.appendChild(document.createTextNode(e[k]));
            tr.appendChild(td)
            k++;
        }
        count = document.createElement('Input');
        count.id = "input_Amount_products";
        count.tagName = e[key];
        tr.appendChild(count)
        buy_products = document.createElement('Button');
        buy_product.url = "index.html";
        buy_products.id = "button_Amount_products";
        buy_products.tagName = e[key];
        buy_products.textContent = "Add to card";
        tr.appendChild(buy_products)
        tableBody.appendChild(tr);
    }
    myTableDiv.appendChild(table)
}
function ViewProducts() {
    var fn = function (request) {

        var e = request.responseText;

        e = e.toString();

        var replaced = e.replace('[', ''); 
        replaced = replaced.replace(/","/g, ';');
        replaced = replaced.replace(/"/, '');
        replaced = replaced.replace(/"]/, '');

        replaced = replaced.split(';');
        FillTable(replaced);
    };
    console.log(fn)
    console.log(fn.e)


    DoAjaxGET("GET", "http://127.0.0.1/api/ViewProducts", fn);
}
