var uri = location.href;

var getFacebookCount = function () {
  $.getJSON('https://graph.facebook.com/'+uri, function(data){
    var facebookShares = data.share.share_count;
    console.log(data);
    if (facebookShares) {
      $('.fbshare').append(facebookShares);
    } else {
	  $('.fbshare').append(0);
    }
  });
};
getFacebookCount();

var getTwitterCount = function () {
  $.getJSON('http://opensharecount.com/count.json?url='+uri, function(data){
    var twitterShares = data.count;
    if (data.count) {
      $('.twshare').append(twitterShares);
    } else {
	  $('.twshare').append(0);  
    }
  });
};
getTwitterCount();

$.ajax({
  type: 'POST',
  url: 'https://clients6.google.com/rpc',
  processData: true,
  contentType: 'application/json',
  data: JSON.stringify({
    'method': 'pos.plusones.get',
    'id': uri,
    'params': {
      'nolog': true,
      'id': uri,
      'source': 'widget',
      'userId': '@viewer',
      'groupId': '@self'
    },
    'jsonrpc': '2.0',
    'key': 'p',
    'apiVersion': 'v1'
  }),
  success: function(googleShares) {
    $('.gshare').append(googleShares.result.metadata.globalCounts.count);
  }
});