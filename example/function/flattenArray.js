const log = console.log.bind(console, '### flattenArray')

const ensureEqual = (a, b, message) => {
  a !== b ? log(`${message}, (${a}) 不等于 (${b})`) : log('测试成功')
}

const arrayEquals = (arr1, arr2) => {
  if (arr1.length !== arr2.length) {
    return false
  }
  for (let idx = 0; idx < arr1.length; idx++) {
    if (arr1[idx] !== arr2[idx]) {
      return false
    }
  }
  return true
}

const flattenArray = arr => {
  let res = []
  for (let ele of arr) {
    if (Array.isArray(ele)) {
      res = res.concat(flattenArray(ele))
    } else {
      res.push(ele)
    }
  }
  return res
}

const flattenArray2 = arr => {
  return arr.reduce((prev, item) => {
    return prev.concat(Array.isArray(item) ? flattenArray2(item) : item)
  }, [])
}

const flattenArray3 = arr => {
  while(arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr)
  }
  return arr
}

// arrary.flat([depth]) node 不支持，chrome 支持的原生方法
// return arr.flat(2) // [1, 2, 3, 4, 5, 6]

const testFlattenArray = () => {
  const arr = [1, [[2, 3], 4], [5, 6]]
  const test1 = [1, 2, 3, 4, 5, 6]

  ensureEqual(arrayEquals(flattenArray(arr), test1), true, 'test faltten array 1')
  ensureEqual(arrayEquals(flattenArray2(arr), test1), true, 'test faltten array 1')
  ensureEqual(arrayEquals(flattenArray3(arr), test1), true, 'test faltten array 1')
}

const __main = () => {
  testFlattenArray()
}

__main()
