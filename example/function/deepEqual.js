const log = console.log.bind(console, '### deepEqual')

const ensureEqual = (a, b, message) => {
  a !== b ? log(`${message}, (${a}) 不等于 (${b})`) : log('测试成功')
}

const equals = (a, b) => {
  // 原始类型的判断
  if (a === b) {
    return true
  }
  // object 的判断
  if (a && b && typeof a === 'object' && typeof b === 'object' ) {
    // array 的判断
    if (Array.isArray(a) && Array.isArray(b)) {
      const len = a.length
      if (len !== b.length) return false
      for (let i = 0; i <= len; i++) {
        if (!equals(a[i], b[i])) {
          return false
        }
      }
      return true
    }

    if (a instanceof RegExp && b instanceof RegExp) {
      return a.toString() === b.toString()
    }

    if (a instanceof Date && b instanceof Date) {
      return a.getTime() === b.getTime()
    }

    const keys = Object.keys(a)
    len = keys.length
    if (len !== Object.keys(b).length) {
      return false
    }
    // 是否属性都存在
    for (let i = 0; i < len; i++)
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) {
        return false
      }
    // 是否属性的值都相等
    for (let i = 0; i < len; i++) {
      if (!equals(a[keys[i]], b[keys[i]])) {
        return false
      }
    }
    return true
  }
}

const testEquals = () => {
  const obj = { a: [2, { e: 3 }], b: [4], c: 'foo', d: undefined, e: null, f: '/\d/g' }
  const obj2 = { b: [4], c: 'foo', d: undefined, e: null, a: [2, { e: 3 }], f: '/\d/g' }
  const obj3 = { b: [4, 5], c: 'foo', d: undefined, e: null, a: [2, { e: 3 }] }
  const obj4 = { b: [4, 5], c: 'foo', d: undefined, e: null }

  ensureEqual(equals(obj, obj2), true, 'test deep obj equal 1')
  ensureEqual(equals(obj, obj3), false, 'test deep obj equal 2')
  ensureEqual(equals(obj, obj4), false, 'test deep obj equal 3')
}

const __main = () => {
  testEquals()
}

__main()
