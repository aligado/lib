var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
const config = require('../config')
// Connection URL

const configUrl = config.url
const errMessage = 'sqllib'

function DB(option) {
  this.pdb = {}
  this.col = {}
}

DB.prototype.connect = function (url, col) {
  url = url === undefined?configUrl:url
  this.pdb = MongoClient.connect(url)
  this.col = col === undefined?'test':col 
}

DB.prototype.close = function () {
  this.pdb.then( (db) => {
    db.close()
  }).catch( (err) => {
    console.log(errMessage)
    console.log(err)
  })
}

DB.prototype.insertDocuments = function (doc, col) {
  //console.log('this', this.pdb)
  console.log('dddoooccc', doc)
  //doc = [{1:1}]
  //console.log('dddoooccc', doc)
  this.pdb.then( (db) => {
    col = col === undefined?this.col:col
    const collection = db.collection(col)
    return collection.insertMany(doc)
  }).then( (r) => {
    assert.equal(doc.length, r.insertedCount)
    console.log('insertDocuments successfully')
  }).catch( (err) => {
    console.log(errMessage)
    console.log(err)
  })
}

DB.prototype.findDocuments = function (rule, col) {
  this.pdb.then( (db) => {
    col = col === undefined?this.col:col
    const collection = db.collection(col)
    return collection.find(rule).toArray()
  }).then( (docs) => {
    console.log('findDocuments successfully')
    return docs
  }).catch( (err) => {
    console.log(errMessage)
    console.log(err)
  })
}

DB.prototype.removeOne = function (rule, col) {
  this.pdb.then( (db) => {
    col = col === undefined?this.col:col
    const collection = db.collection('documents');
    return collection.deleteOne({ a : 3 })
  }).then( (result) => {
      assert.equal(err, null);
      assert.equal(1, result.result.n);
      console.log("Removed the document successfully");
  }).catch( (err) => {
    console.log(errMessage)
    console.log(err)
  })
}

DB.prototype.indexColletion = function (rule, opt=null, col) {
  this.pdb.then( (db) => {
    col = col === undefined?this.col:col
    const collection = db.collection(col)
    return collection.createIndex(rule, opt)
  }).then( (indexName) => {
    console.log(indexName)
    console.log('indexCollection successfully')
  }).catch( (err) => {
    console.log(errMessage)
    console.log(err)
  })
}

module.exports = exports = DB

if ( require.main === module ) {
  console.log( 'module run')
  insertDocuments([{1:1}, {2:2}], 'test')
  /*
  indexColletion({w:1, a:1}, null, 'test')
  pdb.then( (db) => {
    db.close()
  })
  */
}
