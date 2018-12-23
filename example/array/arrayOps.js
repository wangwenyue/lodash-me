const log = console.log.bind(console, '### arrOps')

const ensureEqual = (a, b, message) => a !== b ? log(`${message}, (${a}) 不等于 (${b})`) : log('测试成功')

// sum of array
const arrSum1 = arr => {
  let s = 0
  const len = arr.length
  for (let i = 0; i < len; i++) {
    s += arr[i]
  }
  return s
}

const arrSum2 = arr => arr.reduce((a, b) => a + b)

const testArrSum = () => {
  ensureEqual(arrSum1([1, 2, 3, 4]), 10, 'arrSum1 error 1')
  ensureEqual(arrSum2([1, 2, 3, 4]), 10, 'arrSum2 error 2')
  ensureEqual(arrSum2([-1, 2, 3, 4]), 8, 'arrSum2 error 3')
}

//product of array
const arrProduct1 = arr => {
  let s = 1
  const len = arr.length
  for (let i = 0; i < len; i++) {
    s *= arr[i]
  }
  return s
}

const arrProduct2 = arr => arr.reduce((a, b) => a * b)

const testArrProduct = () => {
  ensureEqual(arrProduct1([1, 2, 3, 4]), 24, 'arrProduct1 error 1')
  ensureEqual(arrProduct2([1, 2, 3, 4]), 24, 'arrProduct2 error 2')
  ensureEqual(arrProduct2([-1, 2, 3, 4]), -24, 'arrProduct2 error 3')
}

// min number of array
const arrMin = arr => {
  let [min, ...rest] = arr
  for(let num of rest) {
    min = min > num ? num : min
  }
  return min
}

const arrMin2 = arr => Math.min(...arr)

const testArrMin = () => {
  ensureEqual(arrMin([1, 2, 3, 4]), 1, 'arrMin error 1')
  ensureEqual(arrMin([-10, 2, 3, 4]), -10, 'arrMin error 2')
  ensureEqual(arrMin([-1, 2, 3, -4]), -4, 'arrMin error 3')
}

// factorial of n
const arrFac = n => {
  let s = 1
  const len = n + 1
  for (let i = 1; i < len; i++) {
    s *= i
  }
  return s
}

// n 太大会爆栈
const arrFac2 = n => n === 1 ? n : n * arrFac2(n - 1)

// 尾递归优化
const arrFac3 = (n, total = 1) => n === 1 ? total : arrFac3(n - 1, n * total)

const testArrFac = () => {
  ensureEqual(arrFac3(7), 5040, 'arrFac error 1')
  ensureEqual(arrFac2(5), 120, 'arrFac error 2')
  ensureEqual(arrFac2(2), 2, 'arrFac error 3')
}

const __main = () => {
  testArrSum()
  testArrProduct()
  testArrMin()
  testArrFac()
}

__main()
