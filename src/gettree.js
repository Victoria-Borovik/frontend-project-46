import _ from 'lodash';

const getUnitedKeys = (data1, data2) => {
  const uniqKeys = _.uniq([..._.keys(data1), ..._.keys(data2)]);
  return _.sortBy(uniqKeys);
};

const getDiffTree = (data1, data2) => {
  const keys = getUnitedKeys(data1, data2);
  const tree = keys.map((key) => {
    if (!_.hasIn(data1, key)) {
      return { type: 'added', key, value: data2[key] };
    }
    if (!_.hasIn(data2, key)) {
      return { type: 'removed', key, value: data1[key] };
    }
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return { type: 'nested', key, children: getDiffTree(data1[key], data2[key]) };
    }
    if (data1[key] !== data2[key]) {
      return {
        type: 'updated', key, value1: data1[key], value2: data2[key],
      };
    }
    return { type: 'unchanged', key, value: data2[key] };
  });

  return tree;
};

export default getDiffTree;
