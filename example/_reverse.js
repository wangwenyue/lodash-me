const log = console.log.bind(console, '### reverse')

const ensureEqual = (a, b, message) => {
  a !== b ? log(`${message}, (${a}) 不等于 (${b})`) : log('测试成功')
}

const reverse = (str) => {
  const arr = [...str]
  const len = arr.length
  const newArr = []
  for(let i = 0; i < len; i++) {
    newArr.push(arr.pop())
  }
  return newArr.join('')
}

const testReverse = () => {
  ensureEqual(reverse('Kowal$ki'), 'ik$lawoK', 'reverse1 error')
  ensureEqual(reverse('abc'), 'cba', 'reverse2 error')
}
const __main = () => {
  testReverse()
}

__main()
