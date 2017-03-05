var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
const config = require('./config')
// Connection URL

const url = config.url
const errMessage = 'sqllib'

const pdb = MongoClient.connect(url)
exports.pdb = pdb
exports.insertDocuments = insertDocuments
function insertDocuments(doc, col) {
  pdb.then( (db) => {
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
const insertOneDocument = function (doc, col) {
  pdb.then( (db) => {
    const collection = db.collection(col)
    return collection.insertOne(doc)
  }).then( (r) => {
    assert.equal(1, r.insertedCount)
    console.log('insertDocument successfully')
  }).catch( (err) => {
    console.log(errMessage)
    console.log(err)
  })
}

exports.findDocuments = function (rule, col) {
  pdb.then( (db) => {
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

/*
var updateDocument = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Update document where a is 2, set b equal to 1
  collection.updateOne({ a : 2 }
    , { $set: { b : 1, c: 1234, equal:'abcd' } }, function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    console.log("Updated the document with the field a equal to 2");
    callback(result);
  });  
}
*/

var removeDocument = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Insert some documents
  collection.deleteOne({ a : 3 }, function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    console.log("Removed the document with the field a equal to 3");
    callback(result);
  });    
}
const indexColletion = function (rule, opt=null, col) {
  pdb.then( (db) => {
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
/*
var indexCollection = function(db, callback) {
  db.collection('documents').createIndex(
    { "a": 2 },
      null,
      function(err, results) {
        console.log(results);
        callback();
    }
  );
};
*/
// Use connect method to connect to the server
/*
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
  insertDocuments(db, function() {
    indexCollection(db, function() {
      db.close();
    });
  });
});
*/
//insertDocuments([{1:1}, {2:2}], 'test')
//insertOneDocument({3:3, 2:2}, 'test')
//findDocuments({}, 'test')
/*
*/
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

