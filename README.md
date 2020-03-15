# di-util

JavaScript tool library based on DI. You can use this tool to register modules, resolve dependencies, and uninstall modules.

## Installing

### npm

```
npm install --save di-util
```

### yarn

```
yarn add di-util
```

## Usage

Example:

```
var DIUtil = require('di-util);

console.log(DIUtil.env);

DIUtil.register('key1', [1, 2], true)

console.log(DIUtil.key1); // => [1, 2]

var resolveFn = DIUtil.resolve(['key1', function (a, b, c) {
  console.log('a', a);
  console.log('b', b);
  console.log('c', c);
}])

resolveFn(11, 22, 33);
// =>
// 'a' [1, 2]
// 'b' 11
// 'c' 22

DIUtil.unregister('key1');

console.log(DIUtil.key1); // => undefined
```

## Contribute

- [LGD.HuaFEEng(LGD.HuaOPER)][blog]

## Documentation

- [Quick tutorial](https://github.com/LGDHuaOPER/di-util#readme)
- [Issue](https://github.com/LGDHuaOPER/di-util/issues)

[blog]: https://lgdhuaoper.github.io/ '敬昭的博客'
