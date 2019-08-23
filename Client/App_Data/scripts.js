function DoAjaxPOST(method, url, params) {
    var request = new XMLHttpRequest();

    return new Promise(function (resolve, reject) {
        request.open(method, url, true);
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        request.onreadystatechange = function (response) {
            request.send(JSON.stringify(params));
            if (response.status >= 200 || response.status < 400) {
                resolve(response)
            } else {
                reject(response)
            }
            
        }
    });
}


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

    DoAjaxPOST("POST", "http://127.0.0.1/api/AddProduct", params).then(function (response) {
        var e = document.getElementById("wynik");
        e.innerHTML = response.responseXML.childNodes[0].childNodes[0].nodeValue;
        e = document.getElementById("resp");
        e.innerHTML = response.responseText;
    })
    .catch (function(response) {
        console.log('error response', response)
    })
}


function AddOrderProduct(barcode, id, amount) {

    var params = {
        "order": {
            "Amount": amount,
            "Bar_code": barcode,
            "ID_client_order": id

        }
    };
    DoAjaxPOST("POST", "http://127.0.0.1/api/AddOrderProduct", params).then(function (response) {
        var e = document.getElementById("wynik");
        e.innerHTML = response.responseXML.childNodes[0].childNodes[0].nodeValue;
        e = document.getElementById("resp");
        e.innerHTML = response.responseText;
    })
        .catch(function (response) {
            console.log('error response', response)
        })
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
    var address;
    address = document.getElementById("address").value;
    var params = {
        "order": {
            "Address": address
        }
    };

    DoAjaxPOST("POST", "http://127.0.0.1/api/AddClientOrder", params).then(function (response) {
        var id = response.responseXML.childNodes[0].childNodes[0].nodeValue;
        AddClient(id);
        AddOrderProducts(id);
    })
        .catch(function (response) {
            console.log('error response', response)
        })
}
function AddClient(id) {
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

    DoAjaxPOST("POST", "http://127.0.0.1/api/AddClient", params).then(function (response) {
        var e = document.getElementById("wynik");
        e.innerHTML = request.responseXML.childNodes[0].childNodes[0].nodeValue;
    })
        .catch(function (response) {
            console.log('error response', response)
        })
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
function ifProductAmountEnough(id, amount) {
    var params = {
        "id": id,
        "amount": amount
    };
    DoAjaxPOST("POST", "http://127.0.0.1/api/ifProductAmountEnough", params).then(function (response) {
        var x = request.responseXML.childNodes[0].childNodes[0].nodeValue;
        return x;
    })
        .catch(function (response) {
            console.log('error response', response)
        })
}
function parseStorage() {
    var products_list = JSON.parse(localStorage.getItem("card"));
    products_list = JSON.stringify(products_list)
    products_list = products_list.split('}');
    var str = ""
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
        var ifa = ifProductAmountEnough(key.toString(), amount.toString());
        if (ifa) {
            str += "<br>";
            str += par;
        }
        //else {
        //    var products = [];
        //    products = JSON.parse(localStorage.getItem("card"));
        //    //1) Usuñ z tej listy produkt
        //    for (int j = i; j < products.length - 2, j++)
        //        products[i] = products[i + 1];
        //    //2)nadpisz ca³y storage
        //    localStorage.setItem("card", JSON.stringify(products))
        //}
        
    }
    return str;
}

function viewCard() {
    var card_area = document.getElementById("card")
    var sum=0;
    if (JSON.parse(localStorage.getItem("card")) == null) {
        card_area.innerHTML = "Your card is empty."
        return
    }
    card_area.innerHTML = "<strong>Card:</strong> <br>"
    card_area.innerHTML += parseStorage() + "<br>";
    var prices = ["10.99", "9.99", "19,99"];
    for ( i = 0; i < prices.length; i++)
    {
        sum += parseFloat(prices[i]);
    }
    card_area.innerHTML += "Sum: " + sum.toFixed(2);

}

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
