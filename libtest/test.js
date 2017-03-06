const tt = require('./test1')
let t1 = new tt 
let t1a = new tt
let t2 = require('./test2')
let t2a = require('./test2')
console.log(t1.a, t1a.a)
t1.a = 'bb'
console.log(t1.a, t1a.a)
if ( t1.a === t1a.a ) console.log( 'ttt111' )
if ( t2 === t2a ) console.log( 'ttt222' )
if ( {1:1} === {1:1} ) console.log('333')