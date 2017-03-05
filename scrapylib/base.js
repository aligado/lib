const fs = require('fs');
const request = require('request');
const iconv = require('iconv-lite');

let x = 'https://s.2.taobao.com/list/list.htm?st_edtime=1&page=1&q=new+3ds&ist=0'
//var x = 'https://www.taobao.com'
//var x = 'https://www.baidu.com'
let req_header = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.64 Safari/537.11',
  'Accept': 'text/html;q=0.9,*/*;q=0.8',
  'Accept-Charset': 'utf-8',
}

const options = {
  url: x,
  encoding: null,
  headers: {
  }
};

exports.startRequest = (url) => {
  options.url = url
  console.log(options)
  return new Promise( (resolve, reject) => {
    request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        resolve(body)
      } else {
        reject("startRquset Error")
      }
    })
  })
}
