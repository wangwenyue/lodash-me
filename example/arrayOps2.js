const log = console.log.bind(console, '### arrayOps2')

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

/*
  a 是一个 array
  返回一个 array, 包含了 a 中所有元素, 但不包含重复元素
  例如 a 是 [1, 2, 3, 1, 3, 5]
  返回 [1, 2, 3, 5]
  */


  /*  这是提示
  1, 创建新数组 r 来保存数据
  2, 遍历 a，对于每个在 a 中的元素 n，检测 r 中是否已经包含了 n
  3, 如果不包含，就把 n 添加到 r 中
  4, 循环结束后，返回 r
*/

