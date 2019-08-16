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
    console.log(fn.e)
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