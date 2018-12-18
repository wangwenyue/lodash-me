const log = console.log.bind(console, '### deepEqual')

const ensureEqual = (a, b, message) => {
  a !== b ? log(`${message}, (${a}) 不等于 (${b})`) : log('测试成功')
}

const equals = (a, b) => {
  // 简单类型的判断
  if (a === b) return true
  // 时间类型的判断, 转换成时间戳判断
  if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime()
  // 基本类型的判断
  if (!a || !b || (typeof a !== 'object' && typeof b != 'object')) return a === b
  // a, b 有一个为 null 或者 undefined，则为 false
  if (a === null || b === null || a === undefined || b === undefined) return false
  // 判断 object 相等
  const keysA = Object.keys(a)
  const keysB = Object.keys(b)
  if (keysA.length !== keysB.length) return false
  return keysA.every(k => equals(a[k], b[k]))
}

const equals2 = (a, b) => JSON.stringify(a) === JSON.stringify(b)

const test1 = () => {
  const obj = { a: [2, { e: 3 }], b: [4], c: 'foo', d: undefined, e: null }
  const obj2 = { a: [2, { e: 3 }], b: [4], c: 'foo', d: undefined, e: null }
  ensureEqual(equal(obj, obj2), true, 'test deep equal 1')
  ensureEqual(equal2(obj, obj2), true, 'test deep equal 2')
}

const test2 = () => {
  // 若调换 obj 中属性的位置，则 equals 报错， equals2 不相等
  const obj = { a: [2, { e: 3 }], b: [4], c: 'foo', d: undefined, e: null }
  const obj2 = { b: [4], c: 'foo', d: undefined, e: null, a: [2, { e: 3 }] }
  ensureEqual(equals(obj, obj2), true, 'test deep equal 1') // 报错
  ensureEqual(equals2(obj, obj2), true, 'test deep equal 2') // 不相等

}

const __main = () => {
  test1()
  // test2()
}

__main()
