var MongoClient = require('mongodb').MongoClient
  , test = require('assert');
// Connection URL
var url = 'mongodb://192.168.99.100:27017/myproject';

var insertDocuments = (db) => new Promise( (resolve, reject) =>  {
  // Get the documents collection
  var collection = db.collection('documents');
  // Insert some documents
  collection.insertMany([
    {a : 1}, {a : 2}, {a : 3}
  ], function(err) {
    try {
      console.log(abc)
      console.log("Inserted 3 documents into the collection");
      resolve(db)
    } catch(e) {
      reject(db)
    }
  });
})

/*
MongoClient.connect(url).then(insertDocuments).then( (db) => {
  db.close()
}).then( (db) => {
  db.close()
}, (db) => {
  console.log('abc')
  db.close()
}).catch( (err) => {
  console.log('13')
  err.close()
})
console.log(134)
*/
const insertItems = exports.insertItems = (Items) => {
  MongoClient.connect(url).then( (db) => {
    // Get the collection
    var col = db.collection('shopItem');
    col.insertMany(Items).then(function(r) {
      test.equal(Items.length, r.insertedCount);
      console.log('insert success')
      // Finish up test
      db.close();
    }).catch( (err) => {
      console.log(err)
    });
  }).catch( (err) => {
    console.log('connect Error')
  })
}

exports.insertItems = (Items) => {
  let db
  MongoClient.connect(url)
  .then( (D) => {
    // Get the collection
    db = D
    var col = db.collection('shopItem');
    //console.log('hello')
    //console.log(Items)
    return col.insertMany(Items)
  })
  .then( function(r) {
      test.equal(Items.length, r.insertedCount);
      console.log('insert success')
      db.close();
  })
  .catch( (err) => {
      console.log('insertItems Error')
      console.log(err)
  });
}

exports.findItems = () => {
  let db
  MongoClient.connect(url)
  .then( (D) => {
    // Get the collection
    db = D
    var col = db.collection('shopItem');
    return col.find({ "Price" : { $gt: 10 }}).toArray()
    //return col.find({}).toArray()
  })
  .then( function(docs) {
    console.log(docs)
    db.close();
  })
  .catch( (err) => {
      console.log('findItems Error')
      console.log(err)
  });
}

/*
MongoClient.connect(url).then( (db) => {
  db.close()
  return new Promise( (resolve, reject) => {
    reject('1234')
  })
}).then( (db) => {
  console.log(db)
  console.log('bbb')
}, (db) => {
  console.log('ccc')
})
*/
