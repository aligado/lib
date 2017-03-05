var promise = new Promise(function(resolve, reject) {
  resolve(1);
});

var promise1 = new Promise(function(resolve, reject) {
  resolve(2);
});
promise.then((val) => {
  console.log(val)
  return new Promise( (resolve, reject) => {
    resolve(1+1)
  })
}).then((val) => {
  console.log(val)
})
