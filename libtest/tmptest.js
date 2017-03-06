const a = Promise.resolve()
if (typeof Promise.prototype.done === 'undefined') {
  console.log('undefined')
}
a.then( () => {
  return 1
}).then ( (a) => {
  console.log(a)
  return 2
}).then ( (a) => {
  console.log(a)
  return 2
})