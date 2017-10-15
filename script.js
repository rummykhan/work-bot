var tableId = '/project/d_order/index/Approved';
var currentUrl = window.location.href;
var remoteUrl = 'http://pk.rehanmanzoor.com/qin';

function getCurrentPage() {
  var match = /\d+/.exec(currentUrl);

  if (null === match) {
    return 0;
  }

  return parseInt(match[0]);
}

function moveNext() {
  var page = getCurrentPage() + 10;

  window.location.href = 'http://pizzapoint.com.pk/project/d_order/index/Approved/' + page;
}

function openLinks() {
  $('tr').each(function () {
    var link = $(this).find("a");
    link.attr('target', '_blank');
    if (undefined !== link.attr('href')) {
      window.open(link.attr('href'));
    }
  });

  setTimeout(moveNext, 3000);
}

function isTable() {
  return currentUrl.indexOf(tableId) !== -1;
}

function postData(data) {
  $.ajax({
    url: remoteUrl,
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(data),
    processData: false,
    success: function (data) {
      window.close();
    },
    fail: function (data) {

    }
  })
}

function trim(val) {
  return val.trim().replace(/[\r\n]/g, '').replace(/  +/g, ' ')
}

function splitQuantity(quantityText) {
  return quantityText.split(' x ').map(function (item) {
    return trim(item);
  });
}

function getProducts() {

  var products = [];

  $('tbody').eq(0).find('tr').each(function () {

    var row = $(this);

    var productName = trim(row.find('td').eq(1).text());
    var split = splitQuantity(trim(row.find('td').eq(2).text()));

    var product = {};
    product['name'] = productName;
    product['quantity'] = parseInt(split[0]);
    product['price'] = parseInt(split[1].replace('PKR ', ''));

    products.push(product);
  });

  return products;
}

function captureDetail() {
  var data = {};
  var nameElement = $('h4.text-info');
  data['name'] = trim(nameElement.text().replace('Name :', ''));

  var phoneElement = $('span.ng-binding');
  data['phone'] = trim(phoneElement.text());

  data['email'] = trim(phoneElement.next().next().text());

  var addressElement = $('p.ng-binding').eq(1);
  data['address'] = trim(addressElement.text());

  data['products'] = getProducts();

  postData(data);
}

if (isTable()) {
  openLinks();
} else {
  captureDetail();
}

