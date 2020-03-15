const path = require('path');
import refTypeFactory from './ref.type.factory';

const exclude = ['./require.context.js', './index.js'];
const dataType = 'object';
// resolve {Function} -接受一个参数request,request为test文件夹下面匹配文件的相对路径,返回这个匹配文件相对于整个工程的相对路径
// keys {Function} -返回匹配成功模块的名字组成的数组
// id {String} -执行环境的id,返回的是一个字符串,主要用在module.hot.accept,应该是热加载
// resolve is a function and returns the module id of the parsed request.
// keys is a function that returns an array of all possible requests that the context module can handle.
// id is the module id of the context module. This may be useful for module.hot.accept
const files = require.context('./', false, /^\.\/.+\.js$/, 'sync');
const data = new refTypeFactory(dataType);

files.keys().forEach(key => {
  const isExclude = exclude.some(v => {
    if (_.isRegExp(v)) return v.test(key);
    return v === key;
  });
  if (isExclude) return;
  const extname = path.extname(key);
  const basename = path.basename(key, extname);
  const dirname = path.dirname(key);
  data.create(null, _.camelCase(basename), {
    extname,
    basename,
    dirname,
    relativePath: key,
    original: files(key),
    value: (function(files, key, _) {
      let temp = files(key);
      if (temp.__esModule === true) {
        let exportRequireContextKeys = _.cloneDeep(
          temp.exportRequireContextKeys
        );
        exportRequireContextKeys =
          exportRequireContextKeys === void 0
            ? temp.default === void 0
              ? true
              : ['default']
            : _.isArray(exportRequireContextKeys)
            ? exportRequireContextKeys
            : true;
        if (exportRequireContextKeys === true) {
          temp = _.omit(temp, ['exportRequireContextKeys', '__esModule']);
        } else {
          const pickKeys = _.pull(
            exportRequireContextKeys,
            'exportRequireContextKeys',
            '__esModule'
          );
          temp = _.pick(temp, pickKeys);
        }
        return _.has(temp, 'default') && _.size(temp) === 1
          ? temp.default
          : temp;
      } else {
        return temp;
      }
    })(files, key, _)
  });
});

export const moduleName = 'requireContext';

export default data.value;
