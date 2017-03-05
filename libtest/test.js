function hello (val) {
  this.a = 1;
  this.b = 2;
  //hello.a = 2;
}

function hello1 (val) {
  var hello = {}
  hello.a = 1;
  hello.b = 2;
  //hello.a = 2;
  return hello
}
var test = new hello();
var test1 = hello1()
console.log(test.a)
console.log(test1.a)