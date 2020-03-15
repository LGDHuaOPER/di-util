export default function proxyKVFactory(
  target,
  oTarget,
  excludeKeys = [],
  descriptorType = ''
) {
  if (!_.isPlainObject(target)) {
    throw new TypeError(
      `the param 'target' of function 'proxyKeyValue' should be one 'plainObject', but now is ${Object.prototype.toString.call(
        target
      )}`
    );
  }
  // 构建属性描述符
  const descriptorMap = new Map();
  const descriptorDefault = {
    configurable: false,
    enumerable: false,
    writable: false
  };
  if (_.isString(descriptorType)) {
    const descriptorTypeArray = descriptorType.split('-');
    descriptorMap.set(
      true,
      _.mapValues(descriptorDefault, (v, k) => descriptorTypeArray.includes(k))
    );
  } else if (_.isPlainObject(descriptorType)) {
    _.forOwn(descriptorType, (v, k) => {
      if (_.isString(v)) v = [v];
      if (!_.isArray(v)) {
        throw new TypeError(
          `the 'key-value' for param 'descriptorType' of function 'proxyKeyValue' should be 'String-String' or 'String-Array', but now is 'String-${Object.prototype.toString.call(
            v
          )}'`
        );
      }
      const descriptorTypeArray = k.split('-');
      v.forEach(prop => {
        descriptorMap.set(
          prop,
          _.mapValues(descriptorDefault, (val, key) =>
            descriptorTypeArray.includes(key)
          )
        );
      });
    });
  } else {
    throw new TypeError(
      `the param 'descriptorType' of function 'proxyKeyValue' should be one 'String' or 'plainObject', but now is ${Object.prototype.toString.call(
        descriptorType
      )}`
    );
  }

  if (_.isPlainObject(oTarget)) {
    _.forOwn(oTarget, (val, key) => {
      if (excludeKeys.includes(key)) return true;
      Object.defineProperty(
        target,
        key,
        Object.assign(
          {},
          descriptorMap.get(descriptorMap.has(key) ? key : true),
          { value: val }
        )
      );
    });
  } else if (Map.prototype.isPrototypeOf(oTarget)) {
    // 不能使用_.isMap(oTarget)，是因为IE返回false
    const oTargetKeysIterator = oTarget.keys();
    while (true) {
      const key = oTargetKeysIterator.next().value;
      if (key === void 0) break;
      if (excludeKeys.includes(key)) continue;
      Object.defineProperty(
        target,
        key,
        Object.assign(
          {},
          descriptorMap.get(descriptorMap.has(key) ? key : true),
          { value: oTarget.get(key) }
        )
      );
    }
  } else {
    throw new TypeError(
      `the param 'oTarget' of function 'proxyKeyValue' should be one 'plainObject' or 'Map', but now is ${Object.prototype.toString.call(
        oTarget
      )}`
    );
  }

  return target;
}
