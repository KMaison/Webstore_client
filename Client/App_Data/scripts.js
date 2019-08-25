function viewCard() {
    var sum=0;
    if (JSON.parse(localStorage.getItem("card")) == null) {
        document.getElementById("products").innerHTML = "Your card is empty."
        return
    }
    document.getElementById("name").innerHTML = "<strong>Card:</strong>"
    parseStorage();
    var prices = ["10.99", "9.99", "19,99"];
    for ( i = 0; i < prices.length; i++)
    {
        sum += parseFloat(prices[i]);
    }
	
    document.getElementById("price").innerHTML += "Sum: " + sum.toFixed(2);
}

 function parseStorage() {
    var products_list = JSON.parse(localStorage.getItem("card"));
    products_list = JSON.stringify(products_list)
    products_list = products_list.split('}');
    for (i = 0; i < products_list.length-1; i++) {
        
        var par = products_list[i];

        par = par.replace('[', '');
        par = par.replace(/","/g, ' ');
        par = par.replace(/"/g, '');
        par = par.replace(/]/g, '');
        par = par.replace(/,{/g, '');
        par = par.replace(/{/g, '');
        par = par.replace(/"/g, '');

        console.log(par);
        var parts = par.split(' ', 2);
        var key = parts[0].split(':', 2)[1];

        var amount = parts[1].split(':', 2)[1];
        addIfProductAmountEnough(key.toString(), amount.toString(),par);
        //else {
        //    var products = [];
        //    products = JSON.parse(localStorage.getItem("card"));
        //    //1) Usu� z tej listy produkt
        //    for (int j = i; j < products.length - 2, j++)
        //        products[i] = products[i + 1];
        //    //2)nadpisz ca�y storage
        //    localStorage.setItem("card", JSON.stringify(products))

        //}
    }
}

 function addIfProductAmountEnough(id,amount,par) {
     var fn = function (request) {
        var products = document.getElementById("products");
        var x = request.responseXML.childNodes[0].childNodes[0].nodeValue;
        if (x) {
			str = "<br>";
			str += par;
            products.innerHTML += str;
        }
    };
    var params = {
            "id": id,
            "amount": amount
    };
     var temp = DoAjaxPOST("POST", "http://127.0.0.1/api/ifProductAmountEnough", fn, params);
     return temp;
}

function DoAjaxPOST(method, url, fn, params) {
    var request =  new XMLHttpRequest();
    request.open(method, url, true);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    var handler = function (request) {
        return function () {
            if (request.readyState != 4) return;
            if (request.status == 200) return fn(request);
            else alert(request.readyState + " " + request.status + " " + request.statusText);
        };
    }
    request.onreadystatechange = handler(request);
    request.send(JSON.stringify(params));
    console.log('res'+request.responseText);
}

function BarCodeGenerator() {
    return Math.random().toString(36).substr(2, 5);
};

function process(callback,response) {
    var response;
    if (typeof callback !== 'function') {
        callback = false;
    }
    if (callback) {
        response = callback();
    }
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
    console.log(request.response);
    request.send();
    
}

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

function FillTable(e) {

    var myTableDiv = document.getElementById("products")
    var table = document.createElement('TABLE')
    var tableBody = document.createElement('TBODY')
    table.border = '1'
    table.appendChild(tableBody);

    var tr = document.createElement('TR');
    var array = ["Name", "ID", "Size", "Color", "Price", "Type", "Available quantity", "Buy"];
    tableBody.appendChild(tr);
    for (i = 0; i < array.length; i++) {
        var th = document.createElement('TH')
        th.width = '75';
        th.appendChild(document.createTextNode(array[i]));
        tr.appendChild(th);

    }
    var count, buy_products;
    var counter = (e.length / 7);
    buy_products = new Array(counter);
    count = new Array(counter);
    var k = 0;
    var key = 0;
    for (i = 0; i < counter; i++) {
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
        count[i] = document.createElement('Input');
        count[i].id = "input_Amount_products_" + e[key];
        count[i].tagName = e[key];
        count[i].value = "0";
        count[i].type = "number";
        count[i].max = e[key + 5];
        count[i].min = 1;
        buy_products[i] = document.createElement('Button');
        buy_products[i].id = "button_Amount_products_" + e[key];
        buy_products[i].tagName = e[key];
        buy_products[i].textContent = "Add to card";

        tr.appendChild(count[i]);
        tr.appendChild(buy_products[i]);
        tableBody.appendChild(tr);
    }
    myTableDiv.appendChild(table);

    for (let j = 0; j < buy_products.length; j++) {
        let button = buy_products[j];
        button.addEventListener('click', function () {
            if (parseInt(count[j].value) < 1) {
                alert("<1")
            }
            else if (parseInt(count[j].value) <= parseInt(e[6 + j * 7])) {

                add_to_card(e[1 + j * 7], count[j].value);
            }
            else {
                alert("We don't have enough products.")
            }

        });
    };
    viewCard();
}

//function parseStorage() {
//    var products_list = JSON.parse(localStorage.getItem("card"));
//    products_list = JSON.stringify(products_list)
//    products_list = products_list.split('}');
//    str = ""
//    for (i = 0; i < products_list.length; i++) {
//        str += "<br>"
//        str += products_list[i];
//    }
//    var replaced = str.replace('[', '');
//    replaced = replaced.replace(/","/g, ' ');
//    replaced = replaced.replace(/"/g, '');
//    replaced = replaced.replace(/]/g, '');
//    replaced = replaced.replace(/,{/g, '');
//    replaced = replaced.replace(/{/g, '');
//    replaced = replaced.replace(/"/g, '');
//    return replaced
//}


function add_to_card(id, amount_input/*,price*/) {
    var products_list = [];
    products_list = JSON.parse(localStorage.getItem("card"));
    if (products_list == null) products_list = [];
    var str = parseStorage();

    for (i = 0; i < products_list.length; i++) {
        var x = products_list[i].Key
        if (products_list[i].Key == id) {
            products_list[i].Amount = amount_input
            //product_list[i].Price=price
            localStorage.setItem("card", JSON.stringify(products_list))
            viewCard()
            return
        }
    }
    const product = {
        Key: id,
        Amount: amount_input
        //Price: price
    }

    products_list.push((product))
    localStorage.setItem("card", JSON.stringify(products_list))
    viewCard()
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
