// 原题出处 https://juejin.im/post/5bf769e0518825773a2ebfe5
const log = console.log.bind(console, '### parseObj')

const ensureEqual = (a, b, message) => {
  a !== b ? log(`${message}, (${a}) 不等于 (${b})`) : log('测试成功')
}

const arrayEquals = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false
  return arr1.every((val, idx) => val === arr2[idx])
}

const get = (data, ...args) => {
  return args.map(val => {
    // 将 [] 替换成 .
    const paths = val.replace(/\[/g, ".").replace(/\]/g, "").split('.')
    let res = data
    paths.map(path => {
      res = res[path]
    })
    return res
  })
}

// 处理非法输入
const get1 = (data, ...args) => {
  return args.map(val => {
    // 将 [] 替换成 .
    const paths = val.replace(/\[/g, ".").replace(/\]/g, "").split('.')
    let res = data
    try {
      paths.map(path => {
        res = res[path]
      })
    } catch (err) {
      log(err)
      res = undefined
    }
    return res
  })
}

const testGet = () => {
  const obj = { selector: { to: { toutiao: 'FE Coder', meituan: 'BE Coder' } }, target: [1, 2, { name: 'byted', test: 'front end' }] }
  const test1 = get(obj, 'selector.to.toutiao', 'target[0]', 'target[2].name')
  const test2 = get(obj, 'selector.to.toutiao', 'target[1]', 'target[2].test')
  // target[8] 不存在
  const test3 = get1(obj, 'selector.to.meituan', 'target[8]', 'target[2].name')

  ensureEqual(arrayEquals(test1, ['FE Coder', 1, 'byted']), true, 'get error 1')
  ensureEqual(arrayEquals(test2, ['FE Coder', 2, 'front end']), true, 'get error 1')
  ensureEqual(arrayEquals(test3, ['BE Coder', 2, 'byted']), false, 'get error 1')
}

const __main = () => {
  testGet()
}

__main()
