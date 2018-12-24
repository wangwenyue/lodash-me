const log = console.log.bind(console, '### humpCase')

/**
 *
 * 将一个json数据的所有key从下划线改为驼峰
 *
 *  @param {object | array} value 待处理对象或数组
 *  @returns {object | array} 处理后的对象或数组
 *
 **/

const toHumpCase = str => {
  const [head, ...tail] =  str.split('_')
  tail.map((val, index) => {
    if(val.length > 1) {
      const [h, ...t] = val
      tail[index] = [h.toUpperCase(), ...t].join('')
    } else{
      tail[index] = val.toUpperCase()
    }
  })
  return [head, ...tail].join('')
}

const isObject = o => {
  return Object.prototype.toString.call(o) === '[object Object]'
}

const humpCase = obj => {
  let clone = { ...obj }
  Object.keys(clone).forEach(k => {
    if (isObject(obj[k])) {
      clone[toHumpCase(k)] = humpCase(obj[k])
    } else {
      clone[toHumpCase(k)] = obj[k]
    }
  })
  if (Array.isArray(obj)) {
    clone.length = obj.length
    return Array.from(clone)
  } else {
    return clone
  }
}

const humpCase2 = obj => {
  let clone = { ...obj }
  Object.keys(clone).forEach(k => clone[toHumpCase(k)] = isObject(obj[k]) ? humpCase(obj[k]) : obj[k])
  return Array.isArray(obj) ? (clone.length = obj.length && Array.from(clone)) : clone
}

const humpCase3 = (p, c={}) => {
  Object.keys(p).map(key => {
    if (typeof p[key] === 'object') {
      c[key] = Array.isArray(p[key]) ? [] : {}
      humpCase3(p[key], c[key])
    } else {
      c[key] = p[key]
    }
  })
  return c
}

const reverseHumpCase = str => {
  const arrStr = [...str]
  return arrStr.map(char => {
    if (char !== char.toLowerCase()) {
      char = `_${char.toLowerCase()}`
    }
  }).join('')
}

const reverseHump = (p, c = {}) => {
  Object.keys(p).map(key => {
    if (typeof p[key] === 'object') {
      c[key] = Array.isArray(p[key]) ? [] : {}
      humpCase3(p[key], c[key])
    } else {
      c[key] = p[key]
    }
  })
  return c
}

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

const __main = () => {
  log(humpCase(testData))
  // log(humpCase2(testData))
  // log(humpCase3(testData))
  // log('testDataToHumpCase', testDataToHumpCase)
}

__main()
