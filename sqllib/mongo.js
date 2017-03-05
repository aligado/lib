var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
// Connection URL

//const url = 'mongodb://192.168.99.100:27017/myproject';
const url = 'mongodb://test:buhaochi@54.169.187.244:32770/test';
const errMessage = 'sqllib'

const pdb = MongoClient.connect(url)
const insertDocuments = function (doc, col) {
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

const findDocuments = function (rule, col) {
  pdb.then( (db) => {
    const collection = db.collection(col)
    return collection.find(rule).toArray()
  }).then( (docs) => {
    console.log(docs)
    console.log('findDocuments successfully')
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
insertOneDocument({3:3, 2:2}, 'test')

//findDocuments({}, 'test')
pdb.then( (db) => {
  db.close()
})
