<h1 align="center">di-util</h1>

<h3 align="center">JavaScript tool library based on DI. You can use this tool to register modules, resolve dependencies, and uninstall modules.</h3>

<div align="center">
![npm](https://img.shields.io/npm/dt/di-util)
<!-- ![MIT](https://img.shields.io/badge/license-MIT-000000.svg) -->
![webpack](https://img.shields.io/badge/webpack-4-blue.svg)
![lodash](https://img.shields.io/badge/lodash-4.17.15-green.svg)
</div>

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
