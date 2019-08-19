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

function DoAjax2(method, url, fn) {
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

function FillTable(e) {

	var myTableDiv = document.getElementById("products")
	var table = document.createElement('TABLE')
	var tableBody = document.createElement('TBODY')
	var buy_products,count;
	table.border = '1'
	table.appendChild(tableBody);

	var tr = document.createElement('TR');
	var array = ["ID", "Size", "Color", "Price", "Type", "Available quantity", "Buy"];
	tableBody.appendChild(tr);
	for (i = 0; i < array.length; i++) {
		var th = document.createElement('TH')
		th.width = '75';
		th.appendChild(document.createTextNode(array[i]));
		tr.appendChild(th);

	}
	var k = 0;
	for (i = 0; i < e.length / array.length - -1 ; i++) {
		var tr = document.createElement('TR');
		for (j = 0; j < array.length - 1; j++) {
			var td = document.createElement('TD')
			td.appendChild(document.createTextNode(e[k]));
			tr.appendChild(td)
			k++;
		}
		count =  document.createElement('Input');
		tr.appendChild(count)
		buy_products =  document.createElement('Button');
		buy_products.textContent = "Buy";
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


	DoAjax2("GET", "http://127.0.0.1/api/ViewProducts", fn);
}