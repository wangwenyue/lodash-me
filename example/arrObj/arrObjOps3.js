const log = console.log.bind(console, '### arrObjOps3')

const ensureEqual = (a, b, message) => {
  a !== b ? log(`${message}, (${a}) 不等于 (${b})`) : log('测试成功')
}

const arrayEquals = (arr1, arr2) => {
  if (arr1.length !== arr2.length) {
    return false
  }
  return JSON.stringify(arr1) === JSON.stringify(arr2)
}

/*
  array 是数组
  callback 是一个测试函数，参数是数组 array 中的元素

  find 函数的返回值是数组中第一个满足测试条件的元素
  如果对于数组中的所有元素都不满足测试条件，则返回 undefined
  参考 https://lodash.com/docs/4.17.4#find
*/

// 返回第一个满足条件的元素
const find = (array, callback) => {
  for (element of array) {
    if (callback(element)) {
      return element
    }
  }
  return undefined
}

// js 自带的 array.find 方法
const find1 = (array, callback) => {
  return array.find(callback)
}

const testFind = () => {
  const array = [12, 5, 8, 130, 44]
  const callback = element => element >= 15

  const result1 = find1(array, callback)
  const result = find(array, callback)

  ensureEqual(130, result, 'test find ')
  ensureEqual(130, result1, 'test find 1')
}

// 返回所有符合条件的元素组成的数组
const findAll = (array, callback) => {
  const res = []
  for (element of array) {
    if (callback(element)) {
      res.push(element)
    }
  }
  return res
}

// js 自带的 array.filter 方法
const findAll1 = (array, callback) => {
  return array.filter(callback)
}

const testFindAll = () => {
  const array = [12, 5, 8, 130, 44]
  const callback = element => element >= 15

  const result = findAll(array, callback)
  const result1 = findAll1(array, callback)

  ensureEqual(arrayEquals([130, 44], result), true, 'test find all ')
  ensureEqual(arrayEquals([130, 44], result1), true, 'test find all 1')
}

/*
  array 是数组
  callback 是一个测试函数，参数是数组 array 中的元素

  findIndex 函数的返回值是数组中第一个满足测试条件的元素在数组中的下标
  如果所有元素都不满足测试条件，返回 -1
  参考 https://lodash.com/docs/4.17.4#findIndex

*/

const findIndex = (array, callback) => {
  for (element of array) {
    if (callback(element)) {
      return array.indexOf(element)
    }
  }
  return -1
}

// js 自带的 array.findIndex 方法
const findIndex1 = (array, callback) => {
  return array.findIndex(callback)
}

const testFindIndex = () => {
  const array = [12, 5, 8, 130, 44]
  const callback = element => element >= 15

  const result = findIndex(array, callback)
  const result1 = findIndex1(array, callback)

  ensureEqual(3, result, 'test find index ')
  ensureEqual(3, result1, 'test find index 1')
}

// 返回所有符合的元素的下标组成的数组，如果不存在则返回 []
const findAllIndex = (array, callback) => {
  const res = []
  array.map((element, index) => {
    if (callback(element)) {
      res.push(index)
    }
  })
  return res
}

const testFindAllIndex = () => {
  const array = [12, 5, 8, 130, 44]
  const callback = element => element >= 15

  const result = findAllIndex(array, callback)

  ensureEqual(arrayEquals([3, 4], result), true, 'test find index 1')
}

/*
  zip 的参数是 n 个数组 array1, array2, array3, ...arrayN
  每个数组的元素的个数是一样的

  返回值是一个数组，数组里面的每一个元素都是数组
  其中第一个元素包含所有 arrays 里的第一个元素
  第二个元素包含所有 arrays 里的第二个元素
  以此类推
  参考 https://lodash.com/docs/4.17.4#zip
*/

const zip = (...args) => {
  // 每一组长度都一样，任意取一组计算循环次数即可
  const len = args[0].length
  const result = []
  for (let i = 0; i < len; i++) {
    const res = []
    args.map(element => {
      res.push(element[i])
    })
    result.push(res)
  }
  return result
}

const testZip = () => {
  const array1 = ['kof95', 'kof2000']
  const array2 = [80, 90]
  const array3 = [true, false]

  const result1 = [['kof95', 80, true], ['kof2000', 90, false]]
  const result2 = zip(array1, array2, array3)

  ensureEqual(arrayEquals(result1, result2), true, 'test zip 1')
}

/*
  object 是字典
  key 是一个字符串

  根据 object 对象的 key 获取值，如果解析出来的 value 是 undefined，就返回 defaultValue
*/

const get = (object, key, defaultValue) => {
  return object[key] === undefined ? defaultValue : object[key]
}

const testGet = () => {
  const object = {
    a: '123',
    b: undefined,
  }

  const r1 = get(object, 'a', 'aaa')
  const r2 = get(object, 'b', 'bbb')
  const r3 = get(object, 'c', 'ccc')

  ensureEqual(r1, '123', 'test get 1')
  ensureEqual(r2, 'bbb', 'test get 2')
  ensureEqual(r3, 'ccc', 'test get 3')
}

/*
  object 是字典
  properties 是属性数组

  返回一个对象，这个对象的每个 key 都在 properties 数组中
  参考 https://lodash.com/docs/4.17.4#pick
*/

const pick = (object, properties) => {
  const res = {}
  const keys = Object.keys(object)
  for (key of keys) {
    if (properties.includes(key)) {
      res[key] = object[key]
    }
  }
  return res
}

const pick1 = (object, properties) => {
  const res = {}
  Object.keys(object).map(key => {
    if (properties.includes(key)) {
      res[key] = object[key]
    }
  })
  return res
}

const testPick = () => {
  const object = {
    a: '111',
    b: '222',
    c: '333',
    d: '444',
  }

  const r1 = pick(object, ['a', 'c'])
  const r2 = {
    a: '111',
    c: '333',
  }
  const r3 = pick1(object, ['b', 'd'])
  const r4 = {
    b: '222',
    d: '444',
  }

  ensureEqual(arrayEquals(r1, r2), true, 'test pick 1')
  ensureEqual(arrayEquals(r3, r4), true, 'test pick 2')
}

const __main = () => {
  testFind()
  testFindAll()
  testFindIndex()
  testFindAllIndex()
  testZip()
  testGet()
  testPick()
}

__main()