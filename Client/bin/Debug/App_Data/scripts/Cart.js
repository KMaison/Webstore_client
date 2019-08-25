function parseStorage() {
     var products_list = JSON.parse(localStorage.getItem("card"));
     var sum = document.getElementById("price");
    products_list = JSON.stringify(products_list)
    products_list = products_list.split('}');
    for (i = 0; i < products_list.length; i++) {
        
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
        addIfProductAmountEnough(key.toString(), amount.toString(), par,i);
        getSumOfPrices(key.toString(),amount.toString());
        (parseFloat(sum.innerHTML)).toFixed(2);

        //refresh data 
        products_list = JSON.parse(localStorage.getItem("card"));
        products_list = JSON.stringify(products_list)
        products_list = products_list.split('}');
        
    }
}

 function addIfProductAmountEnough(id,amount,par,i) {
     var fn = function (request) {
        var products = document.getElementById("products");
        var x = request.responseXML.childNodes[0].childNodes[0].nodeValue;
         if (x==="true") {
             str = "<br>";
             str += par;
             products.innerHTML += str;
         }
         else {
            var products = [];
            products = JSON.parse(localStorage.getItem("card"));
            //1) Usuñ z tej listy produkt
             for (j = i; j < products.length ; j++)
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

function getSumOfPrices(id,amount) {
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

function add_to_card(id, amount_input) {
    var products_list = [];
    products_list = JSON.parse(localStorage.getItem("card"));
    if (products_list == null) products_list = [];
    var str = parseStorage();

    for (i = 0; i < products_list.length; i++) {
        var x = products_list[i].Key
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


