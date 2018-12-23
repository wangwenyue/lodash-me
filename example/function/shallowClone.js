const log = console.log.bind(console, '### shallowClone')

const shallowClone = src => {
  let dst = {}
  // for in 遍历可枚举的自身属性以及继承属性
  // for(let prop in src) {
  //   dst[prop] = src[prop]
  // }
  // Object.keys 遍历可枚举的自身属性
  Object.keys(src).forEach(key => {
    dst[key] = src[key]
  })
  return dst
}

const shallowClone2 = src => Object.assign({}, src)

// 扩展符号进行浅拷贝
const shallowClone3 = src => { return { ...src } }

const test1 = () => {
  const a = { a: 1, arr: [1, 2, 3] }
  const b = shallowClone(a)
  const c = shallowClone2(a)
  const d = shallowClone3(a)
  log('before b', b)
  b.arr[0] = 5
  log('after b', b)
  log('after a', a)
  log('after c', c)
  log('after d', d)
}

// ### before b { a: 1, arr: [ 1, 2, 3 ] }
// ### after b { a: 1, arr: [ 5, 2, 3 ] }
// ### after a { a: 1, arr: [ 5, 2, 3 ] }
// ### after c { a: 1, arr: [ 5, 2, 3 ] }
// ### after d { a: 1, arr: [ 5, 2, 3 ] }

const test2 = () => {
  const a = [1, 2, 3]
  const b = a.slice()
  log(a === b) // false  slice() 是针对数组元素的，b 数组是新的数组，所以和 a 不相等
  log('before b', b)
  b[2] = 5
  log('after b', b)
  log('after a', a)
}

// false
// ### before b [ 1, 2, 3 ]
// ### after b [ 1, 2, 5 ]
// ### after a [ 1, 2, 3 ]


const test3 = () => {
  const a = [1, [1, 2, 3], 3]
  // slice() 浅拷贝数组
  const b = a.slice()
  log(a[1] === b[1]) // true   a[1] b[1] 指向同一块内存地址
  log('before b', b)
  b[1][1] = 5
  log('after b', b)
  log('after a', a)
}

// true
// ### before b [ 1, [ 1, 2, 3 ], 3 ]
// ### after b [ 1, [ 1, 5, 3 ], 3 ]
// ### after a [ 1, [ 1, 5, 3 ], 3 ]

// test4 is deep copy of test3
const test4 = () => {
  const a = [1, [1, 2, 3], 3]
  // 有缺陷的深拷贝
  const b = JSON.parse(JSON.stringify(a))
  log('before b', b)
  b[1][1] = 5
  log('after b', b)
  log('after a', a)
}

// ### deepCopy before b[1, [1, 2, 3], 3]
// ### deepCopy after b[1, [1, 5, 3], 3]
// ### deepCopy after a[1, [1, 2, 3], 3]

const __main = () => {
  test1()
  // test2()
  // test3()
  // test4()
}

__main()
