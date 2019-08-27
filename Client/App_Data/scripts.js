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

function AddOrderProduct(barcode, id, amount) {
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
    DoAjaxPOST("POST", "http://127.0.0.1/api/AddOrderProduct", fn, params);
}

function AddOrderProducts(id) {
    var products_list = JSON.parse(localStorage.getItem("card"));
    var amount, barcode;
    for (i = 0; i < products_list.length; i++) {
        amount = products_list[i].Amount;
        barcode = products_list[i].Key;

        if (AddOrderProduct(barcode, id, amount) != true) {
            return false;//przetestowac
        }
    }
    return true;//przetestowac
}

function AddClientOrder() {
    var fn = function (request) {
        var id = request.responseXML.childNodes[0].childNodes[0].nodeValue;

        AddClient(id)
        AddOrderProducts(id) //todo: weryfikacja tego, transakcyjnosc!!!!!

        //alert("wszystko sie powstalo");
        //usun z koszyka kupione produkty
        //usun kupione produkty z bazy (zmniejsz ilosc zarezerwowanych)


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

    DoAjaxPOST("POST", "http://127.0.0.1/api/AddClient", fn, params);
}

function FillTable(e) {

    var myTableDiv = document.getElementById("products")
    var table = document.createElement('TABLE')
    var tableBody = document.createElement('TBODY')
    table.border = '1'
    table.appendChild(tableBody);
    //column
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
    var counter = (e.length / 8); //ile produktow
    buy_products = new Array(counter);
    count = new Array(counter);
    var k = 0;
    var key = 0;
    //rows
    for (i = 0; i < counter; i++) {
        var tr = document.createElement('TR');
        for (j = 0; j < array.length; j++) {
            if (j == 1) {
                key = k;
            }
            if (j == array.length - 2) {
                k++;
                continue;
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
            else if (parseInt(count[j].value) <= parseInt(e[7 + j * 8])) {

                add_to_card(e[1 + j * 8], count[j].value);
            }
            else {
                alert("We don't have enough products.")
            }

        });
    };
    viewCard();
}

function viewCard() {
    var sum = 0;
    var card_area = document.getElementById("card")
    document.getElementById("price").innerHTML += "0";
    if (JSON.parse(localStorage.getItem("card")) == null) {
        card_area.innerHTML = "Your card is empty."
        return
    }
    card_area.innerHTML = "<strong>Card:</strong> <br>"
    //card_area.innerHTML += parseStorage() + "<br>";

    var products_list = [];
    products_list = JSON.parse(localStorage.getItem("card"));
    if (products_list == null) products_list = [];
    for (i = 0; i < products_list.length; i++) {
        let key = products_list[i].Key;
        let amount = products_list[i].Amount;
        card_area.innerHTML += "Key: " +key + "Amount: "+ amount +"<br>";
    }

}

function add_to_card(id, amount_input) {
    var products_list = [];
    products_list = JSON.parse(localStorage.getItem("card"));
    if (products_list == null) products_list = [];

    for (i = 0; i < products_list.length; i++) {
        if (products_list[i].Key == id) {
            products_list[i].Amount = amount_input
            localStorage.setItem("card", JSON.stringify(products_list))
            viewCard()
            return
        }
    }
    const product = {
        Key: id,
        Amount: amount_input
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

function reserve_products() {
    var products_list = [];
    products_list = JSON.parse(localStorage.getItem("card"));
    if (products_list == null) products_list = [];

    for (i = 0; i < products_list.length; i++) {
        var y = reserve_product(products_list[i]); //TODO: sprawdzenei czy sie udalo


        //if (y != true) {
        //IfReserved = false;
        //alert("rezerwacja sie nie udala");
        //update koszyka
        break;
        // }
        // }
        //else 
        //alert bo nie ma juz
    }
    //if (IfReserved == true) {
    //   alert("rezerwacja sie udala");
    window.location.href = 'submit.html';
    // }
}
function reserve_product(product) {
    var fn = function (request) {
        var y = request.responseXML.childNodes[0].childNodes[0].nodeValue;
        return y;
    };

    var params = {
        "product_To_reserve": {
            "Key": product.Key.toString(),
            "Amount": product.Amount.toString()
        }
    };
    //dodac tu time
    return DoAjaxPOST("POST", "http://127.0.0.1/api/ReserveProduct", fn, params)
}

function addIfProductAmountEnough(id, amount, par, i) {
    var fn = function (request) {
        var products = document.getElementById("products");
        var x = request.responseXML.childNodes[0].childNodes[0].nodeValue;
        if (x === "true") {
            str = "<br>";
            str += par;
            products.innerHTML += str;
        }
        else {
            var products = [];
            products = JSON.parse(localStorage.getItem("card"));
            //1) Usuñ z tej listy produkt
            for (j = i; j < products.length; j++)
                products[j] = products[j + 1];
            //usuñ ostatni element(po przesuniêciu)
            Array.prototype.pop(products);

            //2)nadpisz ca³y storages
            console.log(products);
            localStorage.setItem("card", JSON.stringify(products))
        }
    };
    var params = {
        "id": id,
        "amount": amount
    };
    var temp = DoAjaxPOST("POST", "http://127.0.0.1/api/ifProductAmountEnough", fn, params);
    return temp;
}

function getSumOfPrices(id, amount) {
    var fn = function (request) {
        var s = document.getElementById("price");
        var x = request.responseXML.childNodes[0].childNodes[0].nodeValue;
        var sum;
        if (x) {
            sum = parseFloat(s.innerHTML);
            sum += (parseFloat(x) * parseInt(amount));
            s.innerHTML = sum;
        }
    };
    var params = {
        "id": id
    };
    var temp = DoAjaxPOST("POST", "http://127.0.0.1/api/getProductPrice", fn, params);
    return temp;
}