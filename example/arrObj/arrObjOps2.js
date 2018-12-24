const log = console.log.bind(console, '### arrObjOps2')

const ensureEqual = (a, b, message) => {
  a !== b ? log(`${message}, (${a}) 不等于 (${b})`) : log('测试成功')
}

const arrayEquals = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false
  return arr1.every((val, index) => val === arr2[index])
}

// array equals 的改进版，可以比较多维数组是否相等
const arrayEquals2 = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false
  return JSON.stringify(arr1) === JSON.stringify(arr2)
}

/*
  n 是 int
  判断 n 是否是素数(质数)
*/

const isPrime = n => {
  for (let i = 2; i < n; i++) {
    if (n % i === 0) return false
  }
  return true
}

const testIsPrime = () => {
  ensureEqual(isPrime(2), true, 'is prime test 1')
  ensureEqual(isPrime(3), true, 'is prime test 1')
  ensureEqual(isPrime(4), false, 'is prime test 1')
}

/*
  返回 100 内的素数列表
*/

const primeNumbers = () => {
  const res = []
  for (let i = 2; i < 100; i++) {
    if (isPrime(i)) res.push(i)
  }
  return res
}

const testPrimeNumbers = () => {
  const result = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29,
    31, 37, 41, 43, 47, 53, 59, 61, 67,
    71, 73, 79, 83, 89, 97]
  ensureEqual(arrayEquals2(primeNumbers(), result), true, 'prime numbers test 1')
}

/*
  给定一个英文句子 str（一个只有字母的字符串）
  例子如下, 单词之间有空格隔开
  'thank you very much'
  返回「将句中所有单词变为有且只有首字母大写的形式」的 string
*/

const capString = str => {
  arrStr = str.split(' ')
  return arrStr.map(val => {
    const [head, ...tails] = val
    return [head.toUpperCase(), ...tails].join('')
  }).join(' ')
}

const testCapString = () => {
  const test1 = capString('how are you?')
  const test2 = capString('fine, thank you, and you?')
  const test3 = capString('i am fine, thank you.')

  ensureEqual(test1, 'How Are You?', true, 'cap string test 1')
  ensureEqual(test2, 'Fine, Thank You, And You?', true, 'cap string test 2')
  ensureEqual(test3, 'I Am Fine, Thank You.', true, 'cap string test 3')
}

/*
  给定一个只包含字母的字符串，返回单个字母出现的次数
  考察字典的概念和使用
  返回值为包含数组的数组，格式如下（对数组中数组的顺序不做要求）

  // 可以使用 Object.keys 函数
  var obj = {
    foo: 1,
    bar: 2,
  }
  Object.keys(obj)
  ["foo", "bar"]

  参数 "hello"
  返回值 [['h', 1], ['e', 1], ['l', 2], ['o', 1]]
*/

const letterCount = str => {
  const count = {}
  for (char of str) {
    const keys = Object.keys(count)
    count[char] = keys.includes(char) ? count[char] += 1 : 1
  }
  // forEach 也可以
  // Object.keys(count).forEach(key => {
  //   count[char] = keys.includes(char) ? count[char] += 1 : 1
  // })
  return Object.keys(count).map(key => [key, count[key]])
}

const testLetterConunt = () => {
  const test1 = letterCount('foobarbaz')
  const res1 = [
    ['f', 1], ['o', 2], ['b', 2],
    ['a', 2], ['r', 1], ['z', 1],
  ]
  ensureEqual(arrayEquals2(test1, res1), true, 'letter count test 1')
}

/*
  param 是一个 object
  例子如下
  param 是 {
      'foo': 1,
      'bar': 'far',
  }
  返回如下 string, 顺序不做要求(foo bar 的顺序)
  foo=1&bar=far

  注意, 使用 Object.keys 函数
*/

const queryFromObject = param => {
  return Object.keys(param).map(key => `${key}=${param[key]}`).join('&')
}

const testQueryFromObject = () => {
  const param = { 'foo': 1, 'bar': 'baz' }
  const param2 = { 'foo': 1, 'bar': '2', 'baz': 'kfc' }

  ensureEqual(queryFromObject(param), 'foo=1&bar=baz', 'quert from object test 1')
  ensureEqual(queryFromObject(param2), 'foo=1&bar=2&baz=kfc', 'quert from object test 2')
}

/*
  queryString 是一个 string
  例子如下
  queryString 是 foo=1&bar=far
  返回如下 object, 顺序不做要求(foo bar 的顺序)
  {
      'foo': '1',
      'bar': 'far',
  }
*/

const argsFromQuery = queryString => {
  const arrStr = queryString.split('&')
  const res = {}
  arrStr.map(kvs => {
    const [key, val] = kvs.split('=')
    res[key] = val
  })
  return res
}

const testArgsFromQuery = () => {
  const str1 = 'foo=1&bar=2&baz=kfc'
  const str2 = 'foo=1&bar=baz'

  const res1 = { foo: '1', bar: '2', baz: 'kfc' }
  const res2 = { foo: '1', bar: 'baz' }

  ensureEqual(arrayEquals2(argsFromQuery(str1), res1), true, 'args from query test 1')
  ensureEqual(arrayEquals2(argsFromQuery(str2), res2), true, 'args from query test 2')
}

const __main = () => {
  testIsPrime()
  testPrimeNumbers()
  testCapString()
  testLetterConunt()
  testQueryFromObject()
  testArgsFromQuery()
}

__main()
