const log = console.log.bind(console, '### addTable')

const ensureEqual = (a, b, message) => {
  a !== b ? log(`${message}, (${a}) 不等于 (${b})`) : log('测试成功')
}

const arrayEquals = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false
  return arr1.every((val, idx) => val === arr2[idx])
}

/*
  返回这样格式的加法口诀表(没写全, 但是要返回完整的)
  [
      '1 + 1 = 2',
      '2 + 1 = 3  2 + 2 = 4',
      '3 + 1 = 4  3 + 2 = 5  3 + 3 = 6',
  ]
*/

const addLine = n => {
  const res = []
  for (let i = 1; i <= n; i++) {
    res.push(`${n} + ${i} = ${n + i}`)
  }
  return res.join('  ')
}

const addTable = () => {
  const res = []
  for (let i = 1; i <= 9; i++) {
    res.push(addLine(i))
  }
  return res
}

/*
  start end 都是 int

  返回一个 array, 假设 start 为 1, end 为 5, 返回数据如下
  [1, 2, 3, 4]
*/

const range1 = (start, end) => {
  const res = []
  for (let i = start; i < end; i++) {
    res.push(i)
  }
  return res
}

const testRange1 = () => {
  const test1 = range1(1, 5)
  const test2 = range1(3, 9)
  const test3 = range1(3, 7)

  ensureEqual(arrayEquals(test1, [1, 2, 3, 4]), true, 'range1 test 1')
  ensureEqual(arrayEquals(test2, [3, 4, 5, 6, 7, 8]), true, 'range1 test 2')
  ensureEqual(arrayEquals(test3, [3, 4, 5]), false, 'range1 test 3')
}

/*
  start end step 都是数字
  step 是大于 0 的正整数

  返回一个 array
  假设 start=1, end=5, step=1 返回数据如下
  [1, 2, 3, 4]
  假设 start=0, end=6, step=2 返回数据如下
  [0, 2, 4]
*/

const range2 = (start, end, step) => {
  const res = []
  for (let i = start; i < end; i += step) {
    res.push(i)
  }
  return res
}

const testRange2 = () => {
  const test1 = range2(1, 5, 1)
  const test2 = range2(3, 9, 2)
  const test3 = range2(3, 7, 3)

  ensureEqual(arrayEquals(test1, [1, 2, 3, 4]), true, 'range2 test 1')
  ensureEqual(arrayEquals(test2, [3, 5, 7]), true, 'range2 test 2')
  ensureEqual(arrayEquals(test3, [3, 6]), true, 'range2 test 3')
}

/*
  start end step 都是数字

  和 range2 一样, 但是要求支持负数 step
  使用 while 循环
  返回一个 array
  假设 start=1, end=5, step=1 返回数据如下
  [1, 2, 3, 4]
  假设 start=6, end=0, step=-1 返回数据如下
  [6, 5, 4, 3, 2, 1]

  提示：
      判断 start 和 end 的大小，然后循环生成数组
*/

const range3 = (start, end, step) => {
  const res = []
  if (step > 0) {
    return range2(start, end, step)
  } else {
    for (let i = start; i > end; i += step) {
      res.push(i)
    }
  }
  return res
}

const testRange3 = () => {
  const test1 = range3(1, 5, 1)
  const test2 = range3(6, 0, -2)

  ensureEqual(arrayEquals(test1, [1, 2, 3, 4]), true, 'range3 test 1')
  ensureEqual(arrayEquals(test2, [6, 4, 2]), true, 'range3 test 2')
}

const __main = () => {
  log(addTable())
  testRange1()
  testRange2()
  testRange3()
}

__main()
