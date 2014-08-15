/**
 * Created by liorsion on 8/15/14.
 */
'use strict';

function BringgClient(options) {
  this.accessToken = options.accessToken;
  this.secretKey = options.secretKey;
  this.url = options.url || 'http://api.bringg.com';
  this.CryptoJS = options.CryptoJS;
}

BringgClient.prototype.createTask = function(task_deails) {
  var uri =this.url + 'partner_api/tasks'
    , request = new XMLHttpRequest();

  request.onreadystatechange = function() {
    if (request.readyState == 4 && request.status == 200) {
    } else {
    }
  };

  var params = this.sign_request(task_details);

  request.setRequestHeader('Content-type', 'application/json');
  request.open( 'POST', uri, true );
  request.send( params );
};

BringgClient.prototype.sign_request = function(params) {
  if (!params.timestamp) {
    params.timestamp = new Date();
  }
  if (!params.access_token) {
    params.access_token = this.access_token;
  }

  var query_params = '';

  params.forEach(function(param) {
    if (query_params.length > 0) {
      query_params += '&';
    }
    query_params += encodeURIComponent(param);
  });

  var signature = CryptoJS.HmacSHA1(query_params, this.secretKey);
  params[signature] = signature;
  return params;
};

module.exports = BringgClient;
