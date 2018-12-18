const log = console.log.bind(console, '### deepClone')

const deepClone = obj => {
  // 先 shallow clone
  // let clone = Object.assign({}, obj)
  let clone = { ...obj }
  // 检查每一个 key，若 value 是 obj, 则递归深拷贝，否则直接赋值
  Object.keys(clone).forEach(
    key => (clone[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key])
  )
  // return clone
  // 直接 return clone 会返回 arrayLike 的数组，arr: { '0': 1, '1': 3, '2': 100, '3': 7 }
  // 将 array like 的数组转换为真正的数组
  if (Array.isArray(obj)) {
    // 给 obj 添加 length 属性，才能将 obj 转为 array
    clone.length = obj.length
    return Array.from(clone)
  } else {
    return clone
  }
  // 简写
  // return Array.isArray(obj) ? (clone.length = obj.length) && Array.from(clone) : clone
}

// 最简单的办法，不过有点缺陷，某些特殊情况不能用，比如值是 undefined
const deepClone2 = obj => JSON.parse(JSON.stringify(obj))

// ruanyifeng version http://www.ruanyifeng.com/blog/2010/05/object-oriented_javascript_inheritance_continued.html
function deepCopy(p, c={}) {
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

const testDeepClone = () => {
  const a = { foo: 'bar', obj: { a: 1, b: 2 }, arr: [1, 3, 5, 7] }
  const b = deepCopy(a)
  b.foo = 'foo of b'
  const c = deepCopy(a)
  c.arr[1] = 9
  log(a)
  log(b)
  log(c)
}

testDeepClone()
