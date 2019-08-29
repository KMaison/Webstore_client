function add_to_card(id, amount_input) {
  var products_list = [];
  products_list = JSON.parse(localStorage.getItem("card"));
  if (products_list == null) products_list = [];

  for (i = 0; i < products_list.length; i++) {
    if (products_list[i].Key == id) {
      products_list[i].Amount = amount_input;
      localStorage.setItem("card", JSON.stringify(products_list));
      viewCard();
      return;
    }
  }
  const product = {
    Key: id,
    Amount: amount_input
  };

  products_list.push(product);
  localStorage.setItem("card", JSON.stringify(products_list));
  viewCard();
}

function addIfProductAmountEnough(id, amount, /*par,*/ i) {
  //TODO: do refresh
  var fn = function(request) {
    var products = document.getElementById("products");
    var x = request.responseXML.childNodes[0].childNodes[0].nodeValue;
    if (x === "false") {
      var products = [];
      products_from_card = JSON.parse(localStorage.getItem("card"));
      console.log(i)
      for (n = 0; n < i; n++) {
        products.push(products_from_card[n]);
      }
      for (n = i; n < products_from_card.length - 1; n++) {
        products.push(products_from_card[n + 1]);
      }
      localStorage.setItem("card", JSON.stringify(products));
      console.log(JSON.parse(localStorage.getItem("card")));
      alert("The product with barcode " + products_from_card[i].Key + " was bought by someone else.")
    }
  };
  var params = {
    id: id,
    amount: amount
  };
  var temp = doAjaxPOSTSum(
    "POST",
    "http://127.0.0.1/api/ifProductAmountEnough",
    fn,
    params
  );
  return temp;
}

function getSumOfPrices(id, amount) {
  var fn = function(request) {
    var s = document.getElementById("price");
    var x = request.responseXML.childNodes[0].childNodes[0].nodeValue;
    var sum;
    if (x) {
      sum = s.innerHTML;
      sum = parseFloat(sum);
      sum += parseFloat(parseFloat(x) * parseFloat(amount));
      s.innerHTML = sum.toPrecision(5);
    }
  };
  var params = {
    id: id
  };
  var temp = doAjaxPOSTSum(
    "POST",
    "http://127.0.0.1/api/getProductPrice",
    fn,
    params
  );
  //return temp;
}

function viewCard() {
  var card_area = document.getElementById("card");
  var s = document.getElementById("price");
  s.innerHTML = "0";
  card_area.innerHTML = "<strong>Card:</strong> <br>";

  var products_list = [];
  products_list = JSON.parse(localStorage.getItem("card"));
  if (products_list == null) {
    card_area.innerHTML = "Your card is empty.";
    return;
  }
  for (i = 0; i < products_list.length; i++) {
    let key = products_list[i].Key;
    let amount = products_list[i].Amount;
    card_area.innerHTML += "Key: " + key + "Amount: " + amount + "<br>";
    getSumOfPrices(key, amount);
    addIfProductAmountEnough(key, amount, i);
  }
}
//TO DO:refresh card
