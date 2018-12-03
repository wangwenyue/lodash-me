const log = console.log.bind(console, '### reverse')

const reverse = (str) => {
  const arr = [...str]
  const len = arr.length
  const newArr = []
  for(let i = 0; i < len; i++) {
    newArr.push(arr.pop())
  }
  return newArr.join('')
}

const __main = () => {
  const str1 = 'Kowal$ki'
  const str2 = 'abc'
  log(reverse(str1))
  log(reverse(str2))
}

__main()
