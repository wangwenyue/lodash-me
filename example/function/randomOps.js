const log = console.log.bind(console, '### randomOps')

const ensureEqual = (a, b, message) => {
  a !== b ? log(`${message}, (${a}) 不等于 (${b})`) : log('测试成功')
}

/*
  js 标准数学库有一个随机数函数
  Math.random()
  它返回 0 - 1 之间的小数

  用它实现本函数, 返回 0 或 1
*/

const random01 = () => Math.random() > 0.5 ? 1 : 0

//通用写法
const _random01 = () => {
  let n = Math.random()
  // * 10, 现在就是 0 - 10 之间的小数
  n = n * 10
  // 取整, 这样就是 0 - 10 之前的整数
  n = Math.floor(n)
  // 用余数来得到 0 或者 1
  return n % 2
}

// 返回一个 20 ~ 50 之间的数字

const random2050 = () => {
  let n = Math.random()
  // 0 - 30 之间的数字
  n = n * 30
  // 再转成 20 - 50 之间的数字
  return n + 20
}

// 返回一个 20 ~ 50 之间的整数

const _random2050 = () => {
  let n = Math.random()
  n = Math.floor(n * 30)
  return n + 20
}

/**
 * n < m, 且 n, m 均为整数,
 * 返回一个 n ~ m 之间的整数
 */

const randomNM = (n, m) => {
  let num = Math.random()
  num = Math.floor(num * (m - n))
  return num + n
}

/**
 * n < m, 且 n, m, k 均为整数,
 * 返回一个数组，数组大小为 k, 元素是 n ~ m 范围的整数
 */

const randomK = (n, m, k) => {
  const setRes = new Set()
  for (let i = 0; i < k;) {
    setRes.add(randomNM(n, m))
    i = setRes.size
  }
  return Array.from(setRes)
}

// 测试用辅助函数
const randomScale = (n, m, num) => {
  return n <= num && num <= m
}

const testRandom = () => {
  ensureEqual(randomScale(0, 1, random01()), true, 'testRandom error 1')
  ensureEqual(randomScale(0, 1, _random01(10, 11)), true, 'testRandom error 2')
  ensureEqual(randomScale(20, 50, random2050()), true, 'testRandom error 3')
  ensureEqual(randomScale(10, 11, randomNM(10, 11)), true, 'testRandom error 4')
}

/**
 * 问题：给定一个返回 0 ~ 6 的随机自然数的函数，记为 rand6()，
 * 则如何用 rand6() 函数构造返回0~9随机自然数的函 rand9()？
 * https://blog.csdn.net/wxbmelisky/article/details/50521435
 */

const rand6 = () => randomNM(0, 6)

const rand9 = () => {
  // 给 res 一个初始值，启动 while 循环
  let res = 40
  while (res >= 40) {
    let a = rand6()
    let b = rand6()
    res = a * 7 + b
  }
  return Math.floor(res / 4)
}

const rand7 = () => {
  let res = 42
  while (res > 40) {
    let a = rand6()
    let b = rand6()
    res = a * 7 + b
  }
  return Math.floor(res / 6)
}

const rand5 = () => {
  let res = 42
  while (res > 40) {
    let a = rand6()
    let b = rand6()
    res = a * 7 + b
  }
  return Math.floor(res / 8)
}

const __main = () => {
  testRandom()
  log('randomK', randomK(10, 20, 5))
  log(rand5())
  log(rand7())
  log(rand9())
}

__main()
