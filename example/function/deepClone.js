const log = console.log.bind(console, '### deepClone')

// 最简单的办法，不过有点缺陷，某些特殊情况不能用，比如值是 function
const deepClone = obj => JSON.parse(JSON.stringify(obj))

// ruanyifeng version http://www.ruanyifeng.com/blog/2010/05/object-oriented_javascript_inheritance_continued.html
function deepCopy(p, c={}) {
  // for in 遍历可枚举自身属性和继承属性
  for (var i in p) {
    if (typeof p[i] === 'object') {
      c[i] = (p[i].constructor === Array) ? [] : {}
      deepCopy(p[i], c[i])
    } else {
      c[i] = p[i]
    }
  }
  return c
}

const deepClone2 = (p, c={}) => {
  // Object.keys() 遍历可枚举自身属性
  Object.keys(p).forEach(key => {
    if (typeof p[key] === 'object') {
      c[key] = Array.isArray(p[key]) ? [] : {}
      deepClone2(p[key], c[key])
    } else {
      c[key] = p[key]
    }
  })
  return c
}

const testDeepClone = () => {
  const a = { foo: 'bar', obj: { a: 1, b: 2 }, arr: [1, 3, 5, 7] }
  const b = deepCopy(a)
  b.foo = 'foo of b'
  const c = deepClone2(a)
  c.arr[1] = 9
  log(a)
  log(b)
  log(c)
}

testDeepClone()
