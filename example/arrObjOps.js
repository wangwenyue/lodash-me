const log = console.log.bind(console, '### arrObjOps')

const ensureEqual = (a, b, message) => {
  a !== b ? log(`${message}, (${a}) 不等于 (${b})`) : log('测试成功')
}

/*
  s1 是一个字符串
  s2 是一个字符串
  检查 s1 是否以 s2 开头, 返回 true 或者 false
*/

const startsWith = (s1, s2) => {
  const len1 = s1.length
  const len2 = s2.length
  if (len1 < len2) {
    return false
  }
  return s1.slice(0, len2) === s2
}

const testStartsWith = () => {
  ensureEqual(startsWith('koakoa', 'koakoa'), true, 'startsWith error 1')
  ensureEqual(startsWith('kfckfc', 'melon'), false, 'startsWith error 2')
  ensureEqual(startsWith('kc', 'kfc'), false, 'startsWith error 3')
}

/*
  s1 是一个字符串
  s2 是一个长度为 1 的字符串
  返回参数 s2 在 s1 中第一次出现的下标
  如果 s2 没有在 s1 中出现, 返回 -1
*/

const findIndex = (s1, s2) => {
  for (char of s1) {
    if (char === s2) {
      return s1.indexOf(char)
    }
  }
  return -1
}

const testFindIndex = () => {
  ensureEqual(findIndex('koakoa', 'k'), 0, 'findIndex error 1')
  ensureEqual(findIndex('koakoa', 'm'), -1, 'findIndex error 2')
  ensureEqual(findIndex('melonkoa', 'k'), 5, 'findIndex error 3')
}

// 判断数组相等
const arrayEquals = (arr1, arr2) => {
  if (arr1.length !== arr2.length) {
    return false
  }
  for (let idx = 0; idx < arr1.length; idx++) {
    if(arr1[idx] !== arr2[idx]) {
      return false
    }
  }
  return true
}

const testArrayEquals = () => {
  ensureEqual(arrayEquals([1, 2], [2, 3]), false, 'arrayEquals error 1')
  ensureEqual(arrayEquals([1, 2], [1, 2]), true, 'arrayEquals error 2')
  ensureEqual(arrayEquals([1, 2, '$'], [2, 3]), false, 'arrayEquals error 3')
}

/*
  s1 是一个字符串
  s2 是一个长度为 1 的字符串
  返回参数 s2 在 s1 中出现的所有下标组成的 array
  如果 s2 没有在 s1 中出现, 返回空数组 []
*/

const findAllIndex = (s1, s2) => {
  if (s1.length < s2.length) {
    return []
  }
  const arrS1 = [...s1]
  const res = []
  arrS1.map((char, idx) => {
    if(char === s2) {
      res.push(idx)
    }
  })
  return res
}

const testFindAllIndex = () => {
  const test1 = findAllIndex('10121320', '1')
  const test2 = findAllIndex('10121320', '0')
  const test3 = findAllIndex('10121320', '3')
  const test4 = findAllIndex('10121320', '9')

  ensureEqual(arrayEquals(test1, [0, 2, 4]), true, 'findAllIndex error 1')
  ensureEqual(arrayEquals(test2, [1, 7]), true, 'findAllIndex error 2')
  ensureEqual(arrayEquals(test3, [5]), true, 'findAllIndex error 3')
  ensureEqual(arrayEquals(test4, []), true, 'findAllIndex error 4')
}

/*
  s1 是一个字符串
  s2 是一个字符串, 长度未知, 不一定为 1
  返回参数 s2 在 s1 中出现的下标组成的 array
  如果 s2 没有在 s1 中出现, 返回 []
*/

const findAllString = (s1, s2) => {
  const len1 = s1.length
  const len2 = s2.length
  if (len1 < len2) {
    return []
  }
  const res = []
  for (let idx = 0; idx < len1; idx++) {
    if(s1.slice(idx, idx + len2) === s2) {
      res.push(idx)
    }
  }
  return res
}

const testFindAllString = () => {
  const test1 = findAllString('1012100120', '10')
  const test2 = findAllString('1012100120', '100')
  const test3 = findAllString('1012100120', '3')

  ensureEqual(arrayEquals(test1, [0, 4]), true, 'findAllString error 1')
  ensureEqual(arrayEquals(test2, [4]), true, 'findAllString error 2')
  ensureEqual(arrayEquals(test3, []), true, 'findAllString error 3')
}

/*
  s1 是一个字符串
  s2 是一个字符串
  检查 s1 是否以 s2 结尾, 返回 true 或者 false
*/

// 直接调用 startsWith
const endsWith1 = (s1, s2) => {
  if (s1.length < s2.length) {
    return false
  }
  const s1Rev = [...s1].reverse().join()
  const s2Rev = [...s2].reverse().join()
  return startsWith(s1Rev, s2Rev)
}

// 传统做法
const endsWith2 = (s1, s2) => {
  if (s1.length < s2.length) {
    return false
  }
  const len1 = s1.length
  const len2 = s2.length
  return s1.slice(len1 - len2) === s2
}

const testEndsWith = () => {
  ensureEqual(endsWith1('koakoa', 'koakoa'), true, 'endsWith error 1')
  ensureEqual(endsWith2('koakoa', 'melon'), false, 'endsWith error 2')
  ensureEqual(endsWith1('melonkoa', 'koa'), true, 'endsWith error 3')
}

// 实现 Max 函数
const max = arr => {
  let [head, ...tails] = arr
  tails.map(val => {
    head = val > head ? val : head
  })
  return head
}

const testMax = () => {
  ensureEqual(max([1, 2, 3]), 3, 'max error 1')
  ensureEqual(max([-1, 10, 3]), 10, 'max error 2')
  ensureEqual(max([1, 2, 2]), 2, 'max error 3')
}

/*
  students 是 array
  里面的每个元素都是如下格式的 object
  {
      'name': 'Caitlyn',
      'sex': 'female',
      'score': 107,
  }
  返回 score 最高的那个元素(object)
*/

const topStudent = obj => {
  const scores = []
  Object.keys(obj).forEach(o => {
    scores.push(obj[o].score)
  })
  const idx = scores.indexOf(max(scores))
  return obj[idx]
}

const testTopStudent = () => {
  const studentList = [
    {
      'name': 'Akali',
      'sex': 'female',
      'score': 127,
    },
    {
      'name': 'Braum',
      'sex': 'male',
      'score': 99,
    },
    {
      'name': 'Caitlyn',
      'sex': 'female',
      'score': 107,
    },
    {
      'name': 'Draven',
      'sex': 'male',
      'score': 104,
    },
    {
      'name': 'Evelynn',
      'sex': 'female',
      'score': 145,
    },
  ]
  const Evelynn = {
    'name': 'Evelynn',
    'sex': 'female',
    'score': 145,
  }
  log(topStudent(studentList))
  log(Evelynn)
}

 /*
  price 是一个 int
  grade 合法情况下一共 6 种取值, 还可能没有给出这个参数
      '小学生'
      '初中生'
      '高中生'
      '大学生'
      '研究生'
  对应的折扣分别是 5 6 7 8 9

  注意, 如果调用者没有给出 grade 参数, 没有折扣

  返回折扣后的价格

  这种使用字典 (object) 解决很多个 if else if 的问题的方法叫做表驱动法
*/

const discount = (price, grade) => {
  const d = {
    '小学生': 0.5,
    '初中生': 0.6,
    '高中生': 0.7,
    '大学生': 0.8,
    '研究生': 0.9,
  }
  if (grade === undefined) {
    return price
  }
  const dis = d[grade]
  return price * dis
}

const testDiscount = () => {
  const price = 100
  ensureEqual(discount(price, '小学生'), 50, 'discount error 1')
  ensureEqual(discount(price, '大学生'), 80, 'discount error 2')
  ensureEqual(discount(price), 100, 'discount error 3')
}

const __main = () => {
  testStartsWith()
  testFindIndex()
  testArrayEquals()
  testFindAllIndex()
  testFindAllString()
  testEndsWith()
  testMax()
  testTopStudent()
  testDiscount()
}

__main()