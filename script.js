var tableId = '/project/d_order/index/Approved';
var currentUrl = window.location.href;
var remoteUrl = 'http://pk.rehanmanzoor.com/orders';

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
  val = val || '';
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
    product['quantity'] = parseInt(!!split[0] ? split[0] : 0);
    product['price'] = parseInt(!!split[1] ? split[1].replace('PKR ', '') : 0);

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

  var orderElement = $('h2');
  data['order_id'] = !!orderElement.text() ? orderElement.text().replace('Order No: ', '') : 0;

  data['hash'] = window.location.href.substr(window.location.href.lastIndexOf('/') + 1);

  var summaryRows = $('tbody').eq(1).find('tr');

  data['subtotal'] = !!summaryRows.eq(0).find('td').eq(1).text() ? trim(summaryRows.eq(0).find('td').eq(1).text()).replace('PKR ', '') : 0;
  data['discount'] = !!summaryRows.eq(1).find('td').eq(1).text() ? trim(summaryRows.eq(1).find('td').eq(1).text()).replace('PKR ', '') : 0;
  data['shipping'] = !!summaryRows.eq(2).find('td').eq(1).text() ? trim(summaryRows.eq(2).find('td').eq(1).text()).replace('PKR ', '') : 0;
  data['total'] = !!summaryRows.eq(3).find('td').eq(1).text() ? trim(summaryRows.eq(3).find('td').eq(1).text()).replace('PKR ', '') : 0;

  postData(data);
}

if (isTable()) {
  openLinks();
} else {
  captureDetail();
}

