const log = console.log.bind(console, '### deepEqual')

const ensureEqual = (a, b, message) => {
  a !== b ? log(`${message}, (${a}) 不等于 (${b})`) : log('测试成功')
}

const equals = (a, b) => {
  // 简单类型的判断
  if (a === b) return true
  // 时间类型的判断
  if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime()
  // 基本类型的判断
  if (!a || !b || (typeof a !== 'object' && typeof b != 'object')) return a === b
  // a, b 有一个为 null 或者 undefined，则为 false
  if (a === null || b === null || a === undefined || b === undefined) return false
  // 判断 object 相等
  if (Object.keys(a).length !== Object.keys(b).length) return false
  return keys.every(k => equals(a[k], b[k]))
}

const equals2 = (a, b) => JSON.stringify(a) === JSON.stringify(b)

const __main = () => {
  const obj = { a: [2, { e: 3 }], b: [4], c: 'foo', d: undefined, e: null }
  ensureEqual(equals(obj, obj), true, 'test deep equal 1')
  ensureEqual(equals2(obj, obj), true, 'test deep equal 2')
}

__main()
