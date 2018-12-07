const log = console.log.bind(console, '### humpCase')

const testData = {
  a_bbb: 123,
  a_g: [1, 2, 3, 4],
  a_d: { s: 2, s_d: 3 },
  a_f: [1, 2, 3, { a_g: 5 }],
  a_d_s: 1
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

const checkType = obj => {
  if(isObject(obj)) {
    return {}
  } else if (Array.isArray(obj)) {
    return []
  } else {
    return obj
  }
}

const helper = (obj, res) => {
  Object.keys(obj).forEach(key => {
    const newKey = toHumpCase(key)
    res[newKey] = checkType(obj[key])
    helper(obj[key], res[newKey])
  })
}

const humpCase = () => {
  const res = {}
  helper(testData, res)
  return res
}

const testDataToHumpCase = {
  aBbb: 123,
  aG: [1, 2, 3, 4],
  aD: { s: 2, sD: 3 },
  aF: [1, 2, 3, { aG: 5 }],
  aDS: 1
}

const __main = () => {
  log(humpCase())
  log('testDataToHumpCase', testDataToHumpCase)
}

__main()