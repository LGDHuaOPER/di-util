export default class refTypeFactory {
  static optionalRefType = refTypeFactory.initRefType();

  static getRefType(val, target) {
    const type = Map.prototype.isPrototypeOf(target)
      ? 'map'
      : _.isPlainObject(target)
      ? 'object'
      : _.isArray(target)
      ? 'collection'
      : 'other';
    if (type === 'other') {
      if (val === void 0) return this.optionalRefType;
      if (this.optionalRefType.has(val)) return this.optionalRefType.get(val);
      return null;
    } else if (type === 'map') {
      if (val === void 0) return target;
      if (target.has(val)) return target.get(val);
      return null;
    } else if (type === 'object') {
      if (val === void 0) return target;
      return target[val];
    } else if (type === 'collection') {
      if (val === void 0) return target;
      if (_.isNumber(val)) return target[val];
      if (_.isString(val))
        return target.find(v => v.refType === _.toLower(val));
      return null;
    }
  }

  static initRefType(returnType = 'map') {
    if (!_.isString(returnType)) returnType = 'map';
    returnType = _.toLower(returnType);
    if (!['map', 'object', 'collection'].includes(returnType))
      returnType = 'map';
    if (returnType === 'map') {
      const initRefTypeMap = new Map();
      initRefTypeMap.set('nullobject', {
        refType: 'nullobject',
        initValue: function() {
          return Object.create(null);
        },
        value: Object.create(null),
        ctor: Object,
        create: function(raw, key, val) {
          let obj = { [key]: val };
          if (_.isPlainObject(key)) obj = key;
          Object.assign(
            this.ctor.prototype.isPrototypeOf(raw) ? raw : this.value,
            obj
          );
          return this;
        },
        retrieve: function() {
          return this;
        },
        update: function() {
          return this;
        },
        delete: function() {
          return this;
        }
      });
      initRefTypeMap.set('object', {
        refType: 'object',
        initValue: function() {
          return new Object();
        },
        value: new Object(),
        ctor: Object,
        create: function(raw, key, val) {
          let obj = { [key]: val };
          if (_.isPlainObject(key)) obj = key;
          Object.assign(
            this.ctor.prototype.isPrototypeOf(raw) ? raw : this.value,
            obj
          );
          return this;
        },
        retrieve: function() {
          return this;
        },
        update: function() {
          return this;
        },
        delete: function() {
          return this;
        }
      });
      initRefTypeMap.set('array', {
        refType: 'array',
        initValue: function() {
          return new Array(0);
        },
        value: new Array(0),
        ctor: Array,
        create: function(raw, method = 'push', val) {
          this.ctor.prototype[method].call(
            raw instanceof this.ctor ? raw : this.value,
            val
          );
          return this;
        },
        retrieve: function() {
          return this;
        },
        update: function() {
          return this;
        },
        delete: function() {
          return this;
        }
      });
      initRefTypeMap.set('map', {
        refType: 'map',
        initValue: function() {
          return new Map();
        },
        value: new Map(),
        ctor: Map,
        create: function(raw, key, val) {
          let temp = this.ctor.prototype.isPrototypeOf(raw) ? raw : this.value;
          if (!this.ctor.prototype.has.call(temp, key)) {
            temp.set(key, val);
          }
          temp = null;
          return this;
        },
        retrieve: function() {
          return this;
        },
        update: function() {
          return this;
        },
        delete: function() {
          return this;
        }
      });
      initRefTypeMap.set('weakmap', {
        refType: 'weakmap',
        initValue: function() {
          return new WeakMap();
        },
        value: new WeakMap(),
        ctor: WeakMap,
        create: function(raw, key, val) {
          let temp = this.ctor.prototype.isPrototypeOf(raw) ? raw : this.value;
          if (!this.ctor.prototype.has.call(temp, key)) {
            temp.set(key, val);
          }
          temp = null;
          return this;
        },
        retrieve: function() {
          return this;
        },
        update: function() {
          return this;
        },
        delete: function() {
          return this;
        }
      });
      initRefTypeMap.set('set', {
        refType: 'set',
        initValue: function() {
          return new Set();
        },
        value: new Set(),
        ctor: Set,
        create: function(raw, val) {
          let temp = this.ctor.prototype.isPrototypeOf(raw) ? raw : this.value;
          if (!this.ctor.prototype.has.call(temp, val)) {
            temp.add(val);
          }
          temp = null;
          return this;
        },
        retrieve: function() {
          return this;
        },
        update: function() {
          return this;
        },
        delete: function() {
          return this;
        }
      });
      initRefTypeMap.set('weakset', {
        refType: 'weakset',
        initValue: function() {
          return new WeakSet();
        },
        value: new WeakSet(),
        ctor: WeakSet,
        create: function(raw, val) {
          let temp = this.ctor.prototype.isPrototypeOf(raw) ? raw : this.value;
          if (!this.ctor.prototype.has.call(temp, val)) {
            temp.add(val);
          }
          temp = null;
          return this;
        },
        retrieve: function() {
          return this;
        },
        update: function() {
          return this;
        },
        delete: function() {
          return this;
        }
      });
      return initRefTypeMap;
    } else if (returnType === 'object') {
      return {
        nullobject: {
          refType: 'nullobject',
          initValue: function() {
            return Object.create(null);
          },
          value: Object.create(null),
          ctor: Object,
          create: function(raw, key, val) {
            let obj = { [key]: val };
            if (_.isPlainObject(key)) obj = key;
            Object.assign(
              this.ctor.prototype.isPrototypeOf(raw) ? raw : this.value,
              obj
            );
            return this;
          },
          retrieve: function() {
            return this;
          },
          update: function() {
            return this;
          },
          delete: function() {
            return this;
          }
        },
        object: {
          refType: 'object',
          initValue: function() {
            return new Object();
          },
          value: new Object(),
          ctor: Object,
          create: function(raw, key, val) {
            let obj = { [key]: val };
            if (_.isPlainObject(key)) obj = key;
            Object.assign(
              this.ctor.prototype.isPrototypeOf(raw) ? raw : this.value,
              obj
            );
            return this;
          },
          retrieve: function() {
            return this;
          },
          update: function() {
            return this;
          },
          delete: function() {
            return this;
          }
        },
        array: {
          refType: 'array',
          initValue: function() {
            return new Array(0);
          },
          value: new Array(0),
          ctor: Array,
          create: function(raw, method = 'push', val) {
            this.ctor.prototype[method].call(
              raw instanceof this.ctor ? raw : this.value,
              val
            );
            return this;
          },
          retrieve: function() {
            return this;
          },
          update: function() {
            return this;
          },
          delete: function() {
            return this;
          }
        },
        map: {
          refType: 'map',
          initValue: function() {
            return new Map();
          },
          value: new Map(),
          ctor: Map,
          create: function(raw, key, val) {
            let temp = this.ctor.prototype.isPrototypeOf(raw)
              ? raw
              : this.value;
            if (!this.ctor.prototype.has.call(temp, key)) {
              temp.set(key, val);
            }
            temp = null;
            return this;
          },
          retrieve: function() {
            return this;
          },
          update: function() {
            return this;
          },
          delete: function() {
            return this;
          }
        },
        weakmap: {
          refType: 'weakmap',
          initValue: function() {
            return new WeakMap();
          },
          value: new WeakMap(),
          ctor: WeakMap,
          create: function(raw, key, val) {
            let temp = this.ctor.prototype.isPrototypeOf(raw)
              ? raw
              : this.value;
            if (!this.ctor.prototype.has.call(temp, key)) {
              temp.set(key, val);
            }
            temp = null;
            return this;
          },
          retrieve: function() {
            return this;
          },
          update: function() {
            return this;
          },
          delete: function() {
            return this;
          }
        },
        set: {
          refType: 'set',
          initValue: function() {
            return new Set();
          },
          value: new Set(),
          ctor: Set,
          create: function(raw, val) {
            let temp = this.ctor.prototype.isPrototypeOf(raw)
              ? raw
              : this.value;
            if (!this.ctor.prototype.has.call(temp, val)) {
              temp.add(val);
            }
            temp = null;
            return this;
          },
          retrieve: function() {
            return this;
          },
          update: function() {
            return this;
          },
          delete: function() {
            return this;
          }
        },
        weakset: {
          refType: 'weakset',
          initValue: function() {
            return new WeakSet();
          },
          value: new WeakSet(),
          ctor: WeakSet,
          create: function(raw, val) {
            let temp = this.ctor.prototype.isPrototypeOf(raw)
              ? raw
              : this.value;
            if (!this.ctor.prototype.has.call(temp, val)) {
              temp.add(val);
            }
            temp = null;
            return this;
          },
          retrieve: function() {
            return this;
          },
          update: function() {
            return this;
          },
          delete: function() {
            return this;
          }
        }
      };
    } else if (returnType === 'collection') {
      return [
        {
          refType: 'nullobject',
          initValue: function() {
            return Object.create(null);
          },
          value: Object.create(null),
          ctor: Object,
          create: function(raw, key, val) {
            let obj = { [key]: val };
            if (_.isPlainObject(key)) obj = key;
            Object.assign(
              this.ctor.prototype.isPrototypeOf(raw) ? raw : this.value,
              obj
            );
            return this;
          },
          retrieve: function() {
            return this;
          },
          update: function() {
            return this;
          },
          delete: function() {
            return this;
          }
        },
        {
          refType: 'object',
          initValue: function() {
            return new Object();
          },
          value: new Object(),
          ctor: Object,
          create: function(raw, key, val) {
            let obj = { [key]: val };
            if (_.isPlainObject(key)) obj = key;
            Object.assign(
              this.ctor.prototype.isPrototypeOf(raw) ? raw : this.value,
              obj
            );
            return this;
          },
          retrieve: function() {
            return this;
          },
          update: function() {
            return this;
          },
          delete: function() {
            return this;
          }
        },
        {
          refType: 'array',
          initValue: function() {
            return new Array(0);
          },
          value: new Array(0),
          ctor: Array,
          create: function(raw, method = 'push', val) {
            this.ctor.prototype[method].call(
              raw instanceof this.ctor ? raw : this.value,
              val
            );
            return this;
          },
          retrieve: function() {
            return this;
          },
          update: function() {
            return this;
          },
          delete: function() {
            return this;
          }
        },
        {
          refType: 'map',
          initValue: function() {
            return new Map();
          },
          value: new Map(),
          ctor: Map,
          create: function(raw, key, val) {
            let temp = this.ctor.prototype.isPrototypeOf(raw)
              ? raw
              : this.value;
            if (!this.ctor.prototype.has.call(temp, key)) {
              temp.set(key, val);
            }
            temp = null;
            return this;
          },
          retrieve: function() {
            return this;
          },
          update: function() {
            return this;
          },
          delete: function() {
            return this;
          }
        },
        {
          refType: 'weakmap',
          initValue: function() {
            return new WeakMap();
          },
          value: new WeakMap(),
          ctor: WeakMap,
          create: function(raw, key, val) {
            let temp = this.ctor.prototype.isPrototypeOf(raw)
              ? raw
              : this.value;
            if (!this.ctor.prototype.has.call(temp, key)) {
              temp.set(key, val);
            }
            temp = null;
            return this;
          },
          retrieve: function() {
            return this;
          },
          update: function() {
            return this;
          },
          delete: function() {
            return this;
          }
        },
        {
          refType: 'set',
          initValue: function() {
            return new Set();
          },
          value: new Set(),
          ctor: Set,
          create: function(raw, val) {
            let temp = this.ctor.prototype.isPrototypeOf(raw)
              ? raw
              : this.value;
            if (!this.ctor.prototype.has.call(temp, val)) {
              temp.add(val);
            }
            temp = null;
            return this;
          },
          retrieve: function() {
            return this;
          },
          update: function() {
            return this;
          },
          delete: function() {
            return this;
          }
        },
        {
          refType: 'weakset',
          initValue: function() {
            return new WeakSet();
          },
          value: new WeakSet(),
          ctor: WeakSet,
          create: function(raw, val) {
            let temp = this.ctor.prototype.isPrototypeOf(raw)
              ? raw
              : this.value;
            if (!this.ctor.prototype.has.call(temp, val)) {
              temp.add(val);
            }
            temp = null;
            return this;
          },
          retrieve: function() {
            return this;
          },
          update: function() {
            return this;
          },
          delete: function() {
            return this;
          }
        }
      ];
    }
  }

  #optionalRefType = refTypeFactory.initRefType();

  refType = this.#optionalRefType.get('nullobject').refType;
  value = this.#optionalRefType.get('nullobject').initValue();
  ctor = this.#optionalRefType.get('nullobject').ctor;
  // 增
  create = this.#optionalRefType.get('nullobject').create.bind(this);
  // 查
  retrieve = this.#optionalRefType.get('nullobject').retrieve.bind(this);
  // 改
  update = this.#optionalRefType.get('nullobject').update.bind(this);
  // 删
  delete = this.#optionalRefType.get('nullobject').delete.bind(this);

  constructor(type) {
    if (_.isString(type)) {
      const item = this.#optionalRefType.get(type);
      if (item) {
        this.refType = item.refType;
        this.value = item.initValue();
        this.ctor = item.ctor;
        this.create = item.create.bind(this);
        this.retrieve = item.retrieve.bind(this);
        this.update = item.update.bind(this);
        this.delete = item.delete.bind(this);
      }
    }
  }
}
