const fs = require('fs');

exports.savedContent = (file, doc) => {
  return new Promise( (resolve, reject) => {
    fs.writeFile(file, doc, function (err) {
      if (err) {
        reject('saveContent error' + err);
      } else {
        resolve('saveContent success')
      }
    })
  })
}

exports.readContent = (file) => {
  return new Promise( (resolve, reject) => {
    fs.readFile(file, function (err, data) {
        if (err) reject(err)
        else resolve(data)
    });
  })
}

exports.sleep = (ms) => {
  console.log( 'sleep', ms )
  return (x) => new Promise( (resolve, rejecet) => {
    setTimeout(resolve, ms, x)
  })
}
