const a = require('./index.js');
console.log(a);

console.log(a.dependencies);

const b = a.resolve;
var c = b([
  '',
  'env',
  null,
  function(a, b, c, d, e) {
    console.log(a);
    console.log(b);
    console.log(c);
    console.log(d);
    console.log(e);
  }
]);
c(1, 2, 3, 4, 5, 6);
