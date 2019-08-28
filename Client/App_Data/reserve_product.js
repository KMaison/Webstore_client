
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
        "product": {
            "Key": product.Key.toString(),
            "Amount": product.Amount.toString()
        }
    };
    //dodac tu time
    return doAjaxPOST("POST", "http://127.0.0.1/api/ReserveProduct", fn, params)
}
