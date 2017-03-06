const fs = require('fs'),
      cheerio = require('cheerio'),
      iconv = require('iconv-lite'),
      base = require('../file'),
      savedContent = base.savedContent,
      readContent = base.readContent,
      sleep = base.sleep,
      startRequest = require('./req').startRequest,
      events = require('events'),
      emitter = new events.EventEmitter(),
      utils = require('utility')

//let x = 'https://s.2.taobao.com/list/list.htm?st_edtime=1&page=1&q=new+3ds&ist=0'

function scrapy(db, E) {
  this.event = E
  //console.log(this.event)
  this.db = db 
  this.queue = [] 
  this.innerEvent = emitter 
}

scrapy.prototype.go = function() {
  const ss = this
  const db = this.db
  console.log("ppppddddbbb", ss.db.pdb)
  this.queue.forEach( function(url) {
    console.log( 'hello' )
    console.log('URL', url)
    startRequest(url)
    .then( (body) => {
      return ss.analyseHtml(iconv.decode(body, 'gbk')) 
    })
    .then( 
      db.insertDocuments 
    )
    .then( sleep(5000) )
    .then( () => {
      ss.innerEvent.emit("go")
    })
    .catch( (err) => {
      console.log(err)
    })
  })
}

scrapy.prototype.run = function () {
  const ss = this
  this.event.on("newUrl", function (url) {
    console.log('newUrl', url)
    ss.queue.push(url)
    console.log('queue', ss.queue)
    ss.go();
  })
  this.go();
  this.innerEvent.on("go", () => {
    (sleep(5000)()).then( () => {
      ss.go()
    }).catch( (err) => {
      console.log(err)
    })
  })
}


scrapy.prototype.analyseHtml = function(html) {
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
    item.md5 = utils.md5(item)
    //Items.push(item)
    //if (this.db.findDocuments({md5:item.md5}, 'a').length === 0) 
    Items.push(item)
  })
  //DB.insertItems( items )
  //DB.findItems()
  return Items
}
console.log( '中文输入法' )
/*
*/
module.exports = exports = scrapy

if (require.main === module) {
  readContent('123.html')
  .then( (x) => {
    insertDocuments(analyseHtml(x), 'a')
  })
  console.log('hello')
  Promise.resolve()
  .then(sleep(3000))
  .then( () => {
    pdb.then( (db) => {
      console.log('dbclose')
      db.close()
    })
  }).catch( (err) => {
    console.log(err)
  })
}