const log = console.log.bind(console, '### shallowClone')

const shallowClone = src => {
  let dst = {}
  for(let prop in src) {
    if(src.hasOwnProperty(prop)){
      dst[prop] = src[prop]
    }
  }
  return dst
}

const shallowClone2 = src => Object.assign({}, src)

const test1 = () => {
  const a = { a: 1, arr: [1, 2, 3,] }
  const b = shallowClone(a)
  const c = shallowClone2(a)
  log('before b', b)
  b.arr[0] = 5
  log('after b', b)
  log('after a', a)
  log('after c', c)
}

// ### before b { a: 1, arr: [ 1, 2, 3 ] }
// ### after b { a: 1, arr: [ 5, 2, 3 ] }
// ### after a { a: 1, arr: [ 5, 2, 3 ] }
// ### after c { a: 1, arr: [ 5, 2, 3 ] }

const test2 = () => {
  const a = [1, 2, 3,]
  const b = a.slice()
  log('before b', b)
  b[2] = 5
  log('after b', b)
  log('after a', a)
}

// ### before b [ 1, 2, 3 ]
// ### after b [ 1, 2, 5 ]
// ### after a [ 1, 2, 3 ]


const test3 = () => {
  const a = [1, [1, 2, 3], 3,]
  const b = a.slice()
  log('before b', b)
  b[1][1] = 5
  log('after b', b)
  log('after a', a)
}

// ### before b [ 1, [ 1, 2, 3 ], 3 ]
// ### after b [ 1, [ 1, 5, 3 ], 3 ]
// ### after a [ 1, [ 1, 5, 3 ], 3 ]

// test4 is deep copy of test3
const test4 = () => {
  const a = [1, [1, 2, 3], 3,]
  const b = JSON.parse(JSON.stringify(a))
  log('before b', b)
  b[1][1] = 5
  log('after b', b)
  log('after a', a)
}

// ### shallowCopy before b[1, [1, 2, 3], 3]
// ### shallowCopy after b[1, [1, 5, 3], 3]
// ### shallowCopy after a[1, [1, 2, 3], 3]

const __main = () => {
  test1()
  test2()
  test3()
  test4()
}

__main()
