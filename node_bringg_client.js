/**
 * Created by liorsion on 8/30/15.
 */
'use strict';

var http = require('http')
  , CryptoJS = require("crypto-js")
  , util = require('util');

function BringgClient(options) {
  this.accessToken = options.accessToken;
  this.secretKey = options.secretKey;
  this.url = options.url || 'http://api.bringg.com/';
  this.CryptoJS = options.CryptoJS;
  this.debug = options.debug || true;
}

BringgClient.prototype.createTask = function(task_details) {
  var uri =this.url + 'partner_api/tasks'
    , request = new XMLHttpRequest();

  request.onreadystatechange = function() {
    if (request.readyState == 4 && request.status == 200) {
    } else {
    }
  };

  var params = this.sign_request(task_details);

  request.open( 'POST', uri, true );
  request.setRequestHeader('Content-type', 'application/json');
  request.send( JSON.stringify(params) );
};

BringgClient.prototype.createTaskWithFormattedNote = function(taskDetails) {
  var uri = this.url + 'partner_api/tasks'
    , params = this.sign_request(taskDetails);

  debugger;
  var body = JSON.stringify(params)

  var post_options = {
    host:  this.url,
    port: '3000',
    path: '/partner_api/tasks',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', //'application/x-www-form-urlencoded',
      "Content-Length": Buffer.byteLength(body)
    }
  };

  var post_req = http.request(post_options, function(res) {
    debugger;
    console.log('Status: ' + res.statusCode);
    console.log('Headers: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      console.log('Response: ' + chunk);
    });
  });

  post_req.on('error', function(e) {
    debugger;
    console.log('problem with request: ' + e.message);
  });


  post_req.write(body);
  post_req.end();
};

var serialize = function(obj, prefix) {
  var str = []
    , pString;
  for(var p in obj) {
    if (util.isArray(obj)) {
      pString = '';
    } else {
      pString = p;
    }
    if (obj.hasOwnProperty(p)) {
      var k = prefix ? prefix + "[" + pString + "]" : pString, v = obj[p];
      str.push(typeof v == "object" ?
        serialize(v, k) :
      encodeURIComponent(k) + "=" + encodeURIComponent(v));
    }
  }
  return str.join("&");
};

BringgClient.prototype.sign_request = function(params) {
  if (!params.timestamp) {
    params.timestamp = Date.now();
  }
  if (!params.access_token) {
    params.access_token = this.accessToken;
  }

  //var query_params = '';

  //for (var paramIdx in params) {
  //  var param = params[paramIdx];
  //  if (query_params.length > 0) {
  //    query_params += '&';
  //  }
  //  query_params += paramIdx+'='+encodeURIComponent(param);
  //}

  var query_params = serialize(params);

  debugger;

  var signature = CryptoJS.HmacSHA1(query_params, this.secretKey).toString();
  debugger;
  params.signature = signature;
  return params;
};

module.exports = BringgClient;