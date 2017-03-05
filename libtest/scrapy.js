const fs = require('fs');
const cheerio = require('cheerio');
const request = require('request');
const iconv = require('iconv-lite');
const DB = require('./mongo');
const events = require('events');
const emitter = new events.EventEmitter();

var x = 'https://s.2.taobao.com/list/list.htm?st_edtime=1&page=1&q=new+3ds&ist=0'
//var x = 'https://www.taobao.com'
var req_header = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.64 Safari/537.11',
  'Accept': 'text/html;q=0.9,*/*;q=0.8',
  'Accept-Charset': 'utf-8',
}
//httpProxy.createProxyServer({target:'http://127.0.0.1:8888'}); // See (†)
var options = {
  url: x,
  encoding: null,
  headers: {
  }
};

exports.startRequest = startRequest
function startRequest(options) {
  console.log(options)
  return new Promise( (resolve, reject) => {
    request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        //var info = JSON.parse(body);
        //console.log(body)
        resolve(iconv.decode(body, 'gbk'))
        //savedContent(body)
      } else {
        reject("startRquset Error")
      }
    })
  })
}

exports.savedContent = function savedContent(file='1.html', x) {
  return new Promise( (resolve, reject) => {
    fs.writeFile(file, x, function (err) {
      if (err) {
        reject('saveContent error' + err);
      } else {
        resolve('saveContent success')
      }
    })
  })
}

exports.readContent = function readContent(file='1.html') {
  return new Promise( (resolve, reject) => {
    fs.readFile(file, function (err, data) {
        if (err) reject(err)
        else resolve(data)
    });
  })
}

//startRequest(options)

function analyseHtml (html) {
  //console.log(html)
  let $ = cheerio.load(html,{decodeEntities: false, ignoreWhitespace: true});
  const Items = []
  $('ul.item-lists li').each( (i, elem) => {
    const d = $(elem) 
    const _ = cheerio.load(d.html(),{decodeEntities: false, ignoreWhitespace: true});
    const item = {}
    item.Image = _('.item-pic a img').attr('src')
    item.Title = _('.item-title').text()
    item.Url = _('.item-title a').attr('href')
    item.Price = parseFloat(_('.item-price em').text())
    item.Description = _('.item-description').text()
    item.PubTime = _('.item-pub-time').text()
    item.SellerNick = _('.seller-info span').attr('data-nick')
    item.SellerUrl = _('.seller-info a').attr('href')
    item.SellerLocation = _('.seller-location').text()
    Items.push(item)
  })
  //DB.insertItems( items )
  //DB.findItems()
  return Items
}
function sleep(ms) {
  return () => new Promise( (resolve, rejecet) => {
    setTimeout(resolve, ms)
  })
}
//readContent()
function work(ms) {
  startRequest(options)
  .then( analyseHtml )
  .then( DB.insertItems )
  .then( sleep(ms) )
  .then( () => {
    emitter.emit('event1', 'done')
  })
  .catch( (err) => {
    reject(err)
  })
}
work(2000);
emitter.on('event1', (mes) => {
  console.log(mes)
  work(15000)
})

