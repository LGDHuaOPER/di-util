import requireContext, {
  moduleName as requireContextModuleName
} from './libs/require.context';

const proxyKVFactory = requireContext.proxyKVFactory.value;

// 生成dependencies
const dependenciesMap = new Map();
const dependencies = (function(requireContext, _) {
  const dependencies = {};
  _.forOwn(requireContext, (v, k) => {
    dependencies[k] = v.value;
    dependenciesMap.set(k, v.value);
  });
  return dependencies;
})(requireContext, _);
dependencies[requireContextModuleName] = requireContext;
dependenciesMap.set(requireContextModuleName, requireContext);

// 生成导出对象
const DIUtil = {};
// 保留的methods、keys
const rootRetainMethods = {
  dependencies,
  dependenciesMap,
  /**
   * 注册依赖
   * @method register
   * @param {String | Object | Array} key - 依赖名或依赖键值对
   * @param {Array | String} value - 依赖值或isUpdateRoot
   * @param {Boolean} isUpdateRoot - 是否更新到根对象上
   * @return {Array} 成功注册依赖的键名
   */
  register: function(key, value, isUpdateRoot) {
    const fn = function(k, v) {
      let flag = false;
      if (rootRetainKeys.includes(k)) return flag;
      if (DIUtil.dependencies[k] === void 0) {
        DIUtil.dependencies[k] = v;
        flag = true;
      }
      if (!DIUtil.dependenciesMap.has(k)) {
        DIUtil.dependenciesMap.set(k, v);
        flag = true;
      }
      return flag;
    };

    let successKeys = [];
    if (_.isString(key)) {
      successKeys = fn(key, value) ? [key] : [];
    } else if (_.isPlainObject(key)) {
      isUpdateRoot = value;
      _.forOwn(key, (v, k) => {
        successKeys.push(fn(k, v) ? k : false);
      });
    } else if (_.isArray(key)) {
      isUpdateRoot = value;
      if (_.isString(key[0])) {
        _.chunk(key, 2).forEach(item => {
          if (_.isString(item[0]) && item[1] !== void 0) {
            successKeys.push(fn(item[0], item[1]) ? item[0] : false);
          }
        });
      } else if (_.isPlainObject(key[0])) {
        key.forEach(item => {
          if (_.isPlainObject(item)) {
            _.forOwn(item, (v, k) => {
              successKeys.push(fn(k, v) ? k : false);
            });
          }
        });
      }
    }
    // 只有更新成功的key才会有可能被添加到根
    const returnSuccessKeys = successKeys.filter(v => v !== false);
    if (isUpdateRoot === true || isUpdateRoot === void 0) {
      proxyKVFactory(
        DIUtil,
        _.reduce(
          returnSuccessKeys,
          function(result, v, k) {
            result.set(v, DIUtil.dependenciesMap.get(v));
            return result;
          },
          new Map()
        ),
        [],
        {
          configurable: returnSuccessKeys
        }
      );
    }
    return returnSuccessKeys;
  },
  /**
   * 取消注册依赖
   * @method unregister
   * @param {Array | String} keys - 依赖
   * @return {Array} 成功取消注册依赖的键名
   */
  unregister: function(keys) {
    if (keys === void 0) return;
    if (_.isString(keys)) keys = [keys];
    if (!_.isArray(keys)) {
      throw new TypeError(
        `the param 'keys' of function 'unregister' should be one 'String' or 'Array', but now is ${Object.prototype.toString.call(
          keys
        )}`
      );
    }
    const successKeys = [];
    keys.forEach(key => {
      if (rootRetainKeys.includes(key)) return true;
      delete DIUtil.dependencies[key];
      DIUtil.dependenciesMap.delete(key);
      const descriptor = Object.getOwnPropertyDescriptor(DIUtil, key) || {};
      if (descriptor.configurable) {
        delete DIUtil[key];
        successKeys.push(key);
      } else if (descriptor.writable) {
        DIUtil[key] = undefined;
      }
    });
    return successKeys;
  },
  /**
   * 解析依赖
   * @method resolve
   * @param {Array | Function} params[0] - 依赖或者函数
   * @param {Any} params[1] - 作用域
   * @return {Function} 包含了依赖的函数
   */
  resolve: function(...params) {
    let deps;
    let func;
    let scope;
    if (_.isArray(params[0])) {
      const last = _.last(params[0]);
      if (_.isFunction(last)) {
        func = params[0].pop();
      } else {
        func = function() {};
      }
      deps = params[0];
    } else if (_.isFunction(params[0])) {
      // /^function\s*[^\(]*\(\s*([^\)]*)\)/m
      deps = params[0]
        .toString()
        .match(/^function\s*[^\(]*\(\s*([^\)]*)\)/m)[1]
        .replace(/ /g, '')
        .split(',')
        .filter(v => v !== '');
      func = params[0];
    }
    scope = params[1] || {};

    return function(...param) {
      let args = [];
      deps.forEach(depK => {
        if (
          !_.isString(depK) ||
          _.trim(depK) === '' ||
          !DIUtil.dependenciesMap.has(depK)
        ) {
          args.push(param.shift());
        } else {
          args.push(DIUtil.dependenciesMap.get(depK));
        }
      });
      func.apply(scope || {}, _.concat(args, param));
    };
  },
  /**
   * 解析依赖，注入函数内的this
   * @method resolveThis
   * @param {Array} deps - 依赖
   * @param {Function} func - 函数
   * @param {Object} scope - 作用域
   * @return {Function} 包含了依赖的函数
   */
  resolveThis: function(deps, func, scope) {
    if (!_.isArray(deps)) deps = [];
    if (!_.isFunction(func)) func = function() {};
    if (!_.isObject(scope)) scope = {};

    deps.forEach(depK => {
      if (
        !_.isString(depK) ||
        _.trim(depK) === '' ||
        !DIUtil.dependenciesMap.has(depK)
      ) {
        throw new ReferenceError("Can't resolve " + depK);
      } else {
        const descriptor = Object.getOwnPropertyDescriptor(scope, depK) || {
          writable: true
        };
        if (descriptor.writable)
          scope[depK] = DIUtil.dependenciesMap.get(depK);
      }
    });

    return function(...param) {
      func.apply(scope, param);
    };
  }
};
const rootRetainKeys = _.keys(rootRetainMethods);

proxyKVFactory(DIUtil, rootRetainMethods, [], 'enumerable');

proxyKVFactory(DIUtil, dependenciesMap, rootRetainKeys);

export default DIUtil;
