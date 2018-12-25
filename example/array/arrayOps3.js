const log = console.log.bind(console, '### arrayOps3')

const ensureEqual = (a, b, message) => {
  a !== b ? log(`${message}, (${a}) 不等于 (${b})`) : log('测试成功')
}

// 返回 array 中第一个只出现一次的元素

const firstUniqueElement = arr => {
  for (ele of arr) {
    if (arr.indexOf(ele) === arr.lastIndexOf(ele)) return ele
  }
}

const testFirstUniqueElement = () => {
  ensureEqual(firstUniqueElement([1, 1, 3, 7, 2, 3, 5]), 7, 'test error 1')
}

testFirstUniqueElement()
