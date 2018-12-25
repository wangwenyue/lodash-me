const log = console.log.bind(console, '### underscoreHump')

const ensureEqual = (a, b, msg) => {
  a !== b ? log(`${msg} (${a}) 不等于 (${b})`) : log('测试成功')
}

const deepEquals = (a, b) => {
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


/**
 *
 * 将一个json数据的所有key从下划线改为驼峰
 *
 *  @param {object | array} value 待处理对象或数组
 *  @returns {object | array} 处理后的对象或数组
 *
 **/

const toHumpCase = str => {
  const [head, ...tail] = str.split('_')
  tail.map((val, index) => {
    if (val.length > 1) {
      const [h, ...t] = val
      tail[index] = [h.toUpperCase(), ...t].join('')
    } else {
      tail[index] = val.toUpperCase()
    }
  })
  return [head, ...tail].join('')
}

const humpCase = (p, c = {}) => {
  // Object.keys() 遍历可枚举自身属性
  Object.keys(p).forEach(key => {
    if (typeof p[key] === 'object') {
      c[toHumpCase(key)] = Array.isArray(p[key]) ? [] : {}
      humpCase(p[key], c[toHumpCase(key)])
    } else {
      c[toHumpCase(key)] = p[key]
    }
  })
  return c
}

const toUnderscoreCase = str => {
  const arrStr = [...str]
  return arrStr.map(char => {
    return char !== char.toLowerCase() ? `_${char.toLowerCase()}` : char
  }).join('')
}

const underscoreCase = (p, c = {}) => {
  // Object.keys() 遍历可枚举自身属性
  Object.keys(p).forEach(key => {
    if (typeof p[key] === 'object') {
      c[toUnderscoreCase(key)] = Array.isArray(p[key]) ? [] : {}
      underscoreCase(p[key], c[toUnderscoreCase(key)])
    } else {
      c[toUnderscoreCase(key)] = p[key]
    }
  })
  return c
}

const __main = () => {
  const testData = {
    a_bbb: 123,
    a_g: [1, 2, 3, 4],
    a_d: { s: 2, s_d: 3 },
    a_f: [1, 2, 3, { a_g: 5 }],
    a_d_s: 1
  }

  const testDataToHumpCase = {
    aBbb: 123,
    aG: [1, 2, 3, 4],
    aD: { s: 2, sD: 3 },
    aF: [1, 2, 3, { aG: 5 }],
    aDS: 1
  }

  ensureEqual(
    deepEquals(humpCase(testData), testDataToHumpCase),
    true,
    'test error 1')
  ensureEqual(
    deepEquals(underscoreCase(testDataToHumpCase), testData),
    true,
    'test error 2')
}

__main()
