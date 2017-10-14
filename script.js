var tableId = '/project/d_order/index/Approved';
var currentUrl = window.location.href;
var remoteUrl = 'http://pk.rehanmanzoor.com/qin';

function getCurrentPage() {
  var match = /\d+/.exec(currentUrl);

  if (null === match) {
    return 0;
  }

  console.log(match);

  return parseInt(match[1]);
}

function moveNext() {
  var page = getCurrentPage() + 10;

  var url = 'http://pizzapoint.com.pk/project/d_order/index/Approved/' + page;

  console.log(url);

  //window.location.href = url;
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
    data: JSON.stringify(data),
    success: function (data) {

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

  setTimeout(function () {
    //window.close();
  }, 1500);
}

if (isTable()) {
  openLinks();
} else {
  captureDetail();
}

