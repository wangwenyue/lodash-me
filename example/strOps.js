const log = console.log.bind(console, '### strOps')

const ensureEqual = (a, b, message) => {
  a !== b ? log(`${message}, (${a}) 不等于 (${b})`) : log('测试成功')
}

/*
    delimiter 是 string
    array 是包含 string 的 array

    把 array 中的元素用 delimiter 连接成一个字符串并返回
*/

const join = (delimiter, array) => {
  let res = array[0]
  for (let idx = 1; idx < array.length; idx++) {
    res += (delimiter + array[idx])
  }
  return res
}

const testJoin = () => {
  ensureEqual(join('#', ['hello', 'koa']), 'hello#koa', 'join error 1')
  ensureEqual(join(' ', ['hello', 'koa']), 'hello koa', 'join error 2')
  ensureEqual(join('\n', ['multi', 'line', 'string']), 'multi\nline\nstring', 'join error 3')
}

/*
    str 是 string
    delimiter 是 string, 默认为空格 ' '

    以 delimiter 为分隔符号, 返回一个 array
    例如
    split('1 2 3', ' ') 返回 ['1', '2', '3']
    split('a=b&c=d', '&') 返回 ['a=b', 'c=d']
    注意, 测试 array 是否相等得自己写一个函数用循环来跑
*/

// 判断数组相等
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

const split = (str, delimiter=' ') => {
  const res = []
  const dLen = delimiter.length
  // idx 标记下次切割的起始位置
  let idx = 0
  for (let i = 0; i < str.length; i++) {
    if (str.slice(i, i + dLen) === delimiter) {
      res.push(str.slice(idx, i))
      idx = i + dLen
    }
  }
  // 加入最后切剩下的一个元素
  res.push(str.slice(idx))
  return res
}

const testSplit = () => {
  const test1 = split('1 2 3')
  const test2 = split('a=b&c=d', '&')
  const test3 = split('akfcbkfcckfcd', 'kfc')

  ensureEqual(arrayEquals(test1, ['1', '2', '3']), true, 'split test 1')
  ensureEqual(arrayEquals(test2, ['a=b', 'c=d']), true, 'split test 2')
  ensureEqual(arrayEquals(test3, ['a', 'b', 'c', 'd']), true, 'split test 3')
}

/*
  str old newString 都是 string
  返回一个「将 str 中出现的所有 old 字符串替换为 new 字符串」的字符串
*/

// 复用之前的 join 以及 split 函数
const replaceAll =  (str, old, newString) => {
  return join(newString, split(str, old))
}

const testReplaceAll = () => {
  ensureEqual(replaceAll('1 2 3', ' ', '#'), '1#2#3', 'replace all test 1')
  ensureEqual(replaceAll('1&2&3', '&', ' '), '1 2 3', 'replace all test 2')
  ensureEqual(replaceAll('hello#gua', '#', ' '), 'hello gua', 'replace all test 3')
}

/*
  n 是 int
  返回这样规律的字符串, 特殊情况不考虑
  n       返回值
  1       '1'
  2       '121'
  3       '12321'
*/

const str1 = n => {
  let res = String(n)
  let s = ''
  for (let i = 1; i < n; i++) {
    s += i
  }
  res = `${s}${res}${[...s].reverse().join('')}`
  return res
}

const testStr1 = () => {
  ensureEqual(str1(3), '12321', 'str1 test 1')
  ensureEqual(str1(5), '123454321', 'str1 test 2')
  ensureEqual(str1(7), '1234567654321', 'str1 test 3')
}

/*
  n 是 int
  返回这样规律的字符串, 特殊情况不考虑
  n       返回值
  1       'A'
  2       'ABA'
  3       'ABCBA'
*/

// 直接利用 str1 先处理 n, 然后再转换成大写字母
const str2 = n => {
  const arr = str1(n)
  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let res = ''
  for (char of arr) {
    res += upper[parseInt(char, 10) - 1]
  }
  return res
}

// 2 个 for 循环搞定，先加左边，再加右边
const strr2 = n => {
  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let res = ''
  // 加左边
  for (let i = 0; i < n; i++) {
    res += upper[i]
  }
  // 加右边, n - 2 不确定，就试一下，试出来
  for (let i = n - 2; i >=0; i--) {
    res += upper[i]
  }
  return res
}

const testStr2 = () => {
  ensureEqual(str2(3), 'ABCBA', 'str2 test 1')
  ensureEqual(strr2(5), 'ABCDEDCBA', 'str2 test 2')
  ensureEqual(str2(7), 'ABCDEFGFEDCBA', 'str2 test 3')
}

const __main = () => {
  testJoin()
  testSplit()
  testReplaceAll()
  testStr1()
  testStr2()
}

__main()