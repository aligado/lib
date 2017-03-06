const fs = require('fs'),
      cheerio = require('cheerio'),
      iconv = require('iconv-lite'),
      base = require('../base'),
      savedContent = base.savedContent,
      readContent = base.readContent,
      sleep = base.sleep,
      startRequest = require('./base').startRequest,
      events = require('events'),
      emitter = new events.EventEmitter(),
      insertDocuments = require('../sqllib').insertDocuments,
      findDocuments = require('../sqllib').findDocuments,
      pdb = require('../sqllib').pdb,
      utils = require('utility')


let x = 'https://s.2.taobao.com/list/list.htm?st_edtime=1&page=1&q=new+3ds&ist=0'

function strategyF2taobao(url, db) {
  this.url = url
  this.db = db
}
strategyF2taobao.prototype.request = () => {
  return startRequest(this.url)
}
strategyF2taobao.prototype.analyseHtml => (html) => {
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
    if (findDocuments({md5:item.md5}, 'a').length === 0) Items.push(item)
  })
  //DB.insertItems( items )
  //DB.findItems()
  return Items
}
console.log( '中文输入法' )
/*
startRequest(x)
.then( (body) => {
  //console.log(body)
  savedContent(file='123.html', iconv.decode(body, 'gbk'))
  .then((err) => {
    console.log(err)
  })
})
*/

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