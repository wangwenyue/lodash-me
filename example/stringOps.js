const log = console.log.bind(console, '### stringOps')

const ensureEqual = (a, b, message) => {
  a !== b ? log(`${message}, (${a}) 不等于 (${b})`) : log('测试成功')
}

// 生成 n 个 Char
const nChar = (char, n) => {
  let res = ''
  for (let i = 0; i < n; i++) {
    res += char
  }
  return res
}

/*
  n 是 int 类型
  width 是 int 类型

  把 n 的位数变成 width 这么长，并在右对齐，不足部分用 0 补足并返回
  具体请看测试, 注意, 返回的是 string 类型

  返回 string 类型
*/

const zfill = (n, width) => {
  const str = String(n)
  const len = width - str.length > 0 ? width - str.length : 0
  return `${nChar(0, len)}${str}`
}

const testZfill = () => {
  ensureEqual(zfill(1, 4), '0001', 'zfill error 1')
  ensureEqual(zfill(23, 4), '0023', 'zfill error 2')
  ensureEqual(zfill(12345, 4), '12345', 'zfill error 3')
  ensureEqual(zfill(169, 5), '00169', 'zfill error 4')
}

/*
  s 是 string
  width 是 int
  fillchar 是 长度为 1 的字符串, 默认为空格 ' '

  如果 s 长度小于 width, 则在末尾用 fillchar 填充并返回
  否则, 原样返回, 不做额外处理

  返回 string 类型
*/

const ljust = (s, width, fillchar=' ') => {
  const len = width - s.length > 0 ? width - s.length : 0
  return `${s}${nChar(fillchar, len)}`
}

const testLjust = () => {
  ensureEqual(ljust('koa', 5), 'koa  ', 'ljust error 1')
  ensureEqual(ljust('koakoa', 5), 'koakoa', 'ljust error 2')
  ensureEqual(ljust('koa', 5, '*'), 'koa**', 'ljust error 3')
}

/*
  s 是 string
  width 是 int
  fillchar 是 长度为 1 的字符串, 默认为空格 ' '

  如果 s 长度小于 width, 则在开头用 fillchar 填充并返回

  返回 string 类型
*/

const rjust = (s, width, fillchar=' ') => {
  const len = width - s.length > 0 ? width - s.length : 0
  return `${nChar(fillchar, len)}${s}`
}

const testRjust = () => {
  ensureEqual(rjust('koa', 5), '  koa', 'rjust error 1')
  ensureEqual(rjust('koakoa', 5), 'koakoa', 'rjust error 2')
  ensureEqual(rjust('koa', 5, '*'), '**koa', 'rjust error 3')
}

/*
  s 是 string
  width 是 int
  fillchar 是 长度为 1 的字符串, 默认为空格 ' '

  如果 s 长度小于 width, 则在两边用 fillchar 填充并返回
  如果 s.length 和 width 互为奇偶, 则无法平均分配两边的 fillchar
  这种情况下, 让左边的 fillchar 数量小于右边

  返回 string 类型
*/

const center = (s, width, fillchar=' ') => {
  const len = width - s.length > 0 ? width - s.length : 0
  const lLen = Math.floor(len / 2)
  const rLen = len - lLen
  return `${nChar(fillchar, lLen)}${s}${nChar(fillchar, rLen)}`
}

const testCenter = () => {
  ensureEqual(center('koa', 5), ' koa ', 'center error 1')
  ensureEqual(center('koa', 5, '*'), '*koa*', 'center error 2')
  ensureEqual(center('ko', 5), ' ko  ', 'center error 3')
  ensureEqual(center('koa', 6), ' koa  ', 'center error 4')
}

/*
  s 是 string
  检查 s 中是否只包含空格

  返回 boolean, 如果 s 中包含的只有空格则返回 true, 否则返回 false
*/

const isSpace = s => {
  return s.trim().length === 0
}

const testIsSpace = () => {
  ensureEqual(isSpace(' '), true, 'isSpace error 1')
  ensureEqual(isSpace('   '), true, 'isSpace error 2')
  ensureEqual(isSpace(''), true, 'isSpace error 3')
  ensureEqual(isSpace('koa'), false, 'isSpace error 4')
}

/*
  s 是字符串
  检查 s 中是否只包含数字
  返回: bool, 如果 s 中包含的只有数字则返回 true, 否则返回 false
*/

const isDigit = s => {
  const digits = '0123456789'
  for(str of s) {
    if(!digits.includes(str)) {
      return false
    }
  }
  return true
}

var testIsDigit = function () {
  ensureEqual(isDigit('123'), true, 'isDigit error 1')
  ensureEqual(isDigit('0'), true, 'isDigit error 2')
  ensureEqual(isDigit('  '), false, 'isDigit error 3')
  ensureEqual(isDigit('1.1'), false, 'isDigit error 4')
  ensureEqual(isDigit('gua'), false, 'isDigit error 5')
}

/*
  s 是 string
  返回一个 "删除了字符串开始的所有空格" 的字符串

  返回 string
*/

const stripLeft = s => {
  if (s.length === 0 || isSpace(s)) {
    return ''
  }
  let idx = 0
  for (char of s) {
    if (char !== ' ') {
      idx = s.indexOf(char)
      break
    }
  }
  return s.slice(idx)
}

const testStripLeft = () => {
  ensureEqual(stripLeft('  koa'), 'koa', 'stripLeft error 1')
  ensureEqual(stripLeft(' koa  '), 'koa  ', 'stripLeft error 2')
  ensureEqual(stripLeft(''), '', 'stripLeft error 3')
  ensureEqual(stripLeft('    '), '', 'stripLeft error 4')
}

/*
  s 是 string
  返回一个「删除了字符串末尾的所有空格」的字符串

  返回 string
*/

const stripRight = s => {
  if (s.length === 0 || isSpace(s)) {
    return ''
  }
  let idx = s.length
  for (let i = idx - 1; i >= 0; i--) {
    if (s[i] !== ' ') {
      idx = i
      break
    }
  }
  return s.slice(0, idx + 1)
}

// 复用 stripLeft
const stripRight2 = s => {
  if (s.length === 0 || isSpace(s)) {
    return ''
  }
  // 'kfc   ' -> '   cfk'
  const reverseStr = [...s].reverse().join('')
  // '   cfk' -> 'cfk'
  const newStr = stripLeft(reverseStr)
  return [... newStr].reverse().join('')
}

const testStripRight = () =>  {
  ensureEqual(stripRight2('  koa'), '  koa', 'stripRight error 1')
  ensureEqual(stripRight(' koa  '), ' koa', 'stripRight error 2')
  ensureEqual(stripRight2(''), '', 'stripRight error 3')
  ensureEqual(stripRight('    '), '', 'stripRight error 4')
}

/*
  s 是 string
  返回一个「删除了字符串首尾的所有空格」的字符串

  返回 string
*/

const strip = s => {
  return stripLeft(stripRight(s))
}

const testStrip = () => {
  ensureEqual(strip('  koa'), 'koa', 'strip error 1')
  ensureEqual(strip(' koa  '), 'koa', 'strip error 2')
  ensureEqual(strip(''), '', 'strip error 3')
  ensureEqual(strip('    '), '', 'strip error 4')
}

/**
 * s1, s2 是字符串，找出 s2 在 s1 第一次出现的 index
 * 若不存在则返回 -1
 */

const findIndex = (s1, s2) => {
  const len1 = s1.length
  const len2 = s2.length
  for (let i = 0; i <= len1; i++) {
    const s = s1.slice(i, i + len2)
    if (s === s2) {
      return i
    }
  }
  return -1
}

const testFindIndex = () => {
  ensureEqual(findIndex('kfcolas', 'kfc'), 0, 'findIndex error 1')
  ensureEqual(findIndex('fcolas', 'kfc'), -1, 'findIndex error 2')
  ensureEqual(findIndex('cokfclakfcs', 'kfc'), 2, 'findIndex error 3')
}

/*
  3 个参数 s old newString 都是字符串
  返回一个「将 s 中的 old 字符串替换为 newString 字符串」的字符串
  假设 old 存在并且只出现一次

  返回 string
*/

const replace = (s, old, newString) => {
  const [head, tail] = s.split(old)
  return `${head}${newString}${tail}`
}

var testReplace = function () {
  ensureEqual(replace('hello, world', 'world', 'koa'), 'hello, koa', 'replace error 1')
  ensureEqual(replace('hello', 'll', 'gua'), 'heguao', 'replace error 2')
}

const __main = () => {
  testZfill()
  testLjust()
  testRjust()
  testCenter()
  testIsSpace()
  testIsDigit()
  testStripLeft()
  testStripRight()
  testStrip()
  testFindIndex()
  testReplace()
}

__main()