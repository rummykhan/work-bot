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
    window.open(link.attr('href'));
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

function captureDetail() {
  var data = {};
  var nameElement = $('h4.text-info');
  data['name'] = nameElement.text();

  var phoneElement = $('span.ng-binding');
  data['phone'] = phoneElement.text();

  data['email'] = phoneElement.next().next().text();

  var addressElement = $('p.ng-binding').eq(1);
  data['address'] = addressElement.text().trim(' ').replace(/[\r\n]/g, '').replace(/  +/g, ' ');

  postData(data);
}

if (isTable()) {
  openLinks();
} else {
  captureDetail();
}

