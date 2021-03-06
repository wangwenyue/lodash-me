const log = console.log.bind(console, '### deepEqual')

const ensureEqual = (a, b, message) => {
  a !== b ? log(`${message}, (${a}) 不等于 (${b})`) : log('测试成功')
}

// 高级版
const deepEquals = (a, b) => {
  if (a === b) return true

  if (a && b && typeof a === 'object' && typeof b === 'object' ) {
    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) return false
      return a.every((item, index) => deepEquals(item, b[index]))
    }

    if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime()

    if (a instanceof RegExp && b instanceof RegExp) return a.toString() === b.toString()

    const keys = Object.keys(a)
    if (keys.length !== Object.keys(b).length) return false
    if (!keys.every(key => Object.prototype.hasOwnProperty.call(b, key))) return false
    return keys.every(key => deepEquals(a[key], b[key]))
  }
}

// 平民版
const deepEquals2 = (a, b) => {
  if (a === b) return true
  // 引用类型 判断
  if (a && b && typeof a === 'object' && typeof b === 'object') {
    // 判断 array
    if (Array.isArray(a) && Array.isArray(b)) {
      const len = a.length
      if (len !== b.length) return false
      for (let i = 0; i < len; i++) {
        if (!deepEquals2(a[i], b[i])) return false
      }
      return true
    }
    // Date
    if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime()
    // RegExp
    if (a instanceof RegExp && b instanceof RegExp) return a.toString() === b.toString()
    // object
    const keys = Object.keys(a)
    const len = keys.length
    if (len !== Object.keys(b).length) return false
    // 是否含有所有属性
    for (let i = 0; i < len; i++) {
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false
    }
    // 所有属性是否相等
    for (let i = 0; i < len; i++) {
      const key = keys[i]
      if (!deepEquals2(a[key], b[key])) return false
    }
    return true
  }
}

const deepEquals3 = (a, b) => {
  if (a === b) return true

  if (a && b && typeof a === 'object' && typeof b === 'object') {
    if (Array.isArray(a) && Array.isArray(b)) {
      const cond1 = a.length === b.length
      const cond2 = a.every((val, index) => deepEquals(val, b[index]))
      return cond1 && cond2

    }

    if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime()
    if (a instanceof RegExp && b instanceof RegExp) return a.toString() === b.toString()

    const keys = Object.keys(a)
    const len = keys.length
    const cond1 = len === Object.keys(b).length
    const cond2 = keys.every(key => Object.prototype.hasOwnProperty.call(b, key))
    const cond3 = keys.every(key => deepEquals(a[key], b[key]))
    return cond1 && cond2 && cond3
  }
}

const testDeepEquals = () => {
  const obj = { a: [2, { e: 3 }], b: [4], c: 'foo', d: undefined, e: null, f: '/\d/g' }
  const obj2 = { b: [4], c: 'foo', d: undefined, e: null, a: [2, { e: 3 }], f: '/\d/g' }
  const obj3 = { b: [4, 5], c: 'foo', d: undefined, e: null, a: [2, { e: 3 }] }
  const obj4 = { b: [4, 5], c: 'foo', d: undefined, e: null }
  const obj5 = { a: 3, b: 4, d: 1}
  const obj6 = { b: 4, a: 3, d: 1}

  ensureEqual(deepEquals(obj, obj2), true, 'test deep obj equal 1')
  ensureEqual(deepEquals(obj, obj3), false, 'test deep obj equal 2')
  ensureEqual(deepEquals(obj, obj4), false, 'test deep obj equal 3')
  ensureEqual(deepEquals(obj5, obj6), true, 'test deep obj equal 4')

  ensureEqual(deepEquals2(obj, obj2), true, 'test deep obj equal 1')
  ensureEqual(deepEquals2(obj, obj3), false, 'test deep obj equal 2')
  ensureEqual(deepEquals2(obj, obj4), false, 'test deep obj equal 3')
  ensureEqual(deepEquals2(obj5, obj6), true, 'test deep obj equal 4')

  ensureEqual(deepEquals3(obj, obj2), true, 'test deep obj equal 1')
  ensureEqual(deepEquals3(obj, obj3), false, 'test deep obj equal 2')
  ensureEqual(deepEquals3(obj, obj4), false, 'test deep obj equal 3')
  ensureEqual(deepEquals3(obj5, obj6), true, 'test deep obj equal 4')
}

const __main = () => {
  testDeepEquals()
}

__main()
