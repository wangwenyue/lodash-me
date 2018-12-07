const log = console.log.bind(console, '### counter')

const ensureEqual = (a, b, message) => {
  a !== b ? log(`${message}, (${a}) 不等于 (${b})`) : log('测试成功')
}

var counter = (function () {
  var i = 0
  return function () {
    i++
    return i
  }
})() // counter 就是个闭包

counter() // 1
counter() // 2

// 给一个对象添加 get 和 set 方法
// 使用 set 方法可以设置一个 key 的值
// 使用 get 方法可以获取那个 key 的值

const foo = () => {
  const data = {}

  const _get = key => {
    return data[key]
  }

  const _set = (key, value) => {
    data[key] = value
  }
  // 定义一个对象，这个对象的 value 是函数，并且函数中使用了变量 data
  // 注意函数结束的时候，这个字典本来是会被销毁的，但是因为返回的对象中的 value 使用了变量 data
  // 所以 data 并不会被销毁，这个是因为闭包的特性导致的
  const out = {
    get: _get,
    set: _set,
  }

  return out
}

const testFoo = () => {
  const f = foo()
  f.set('name', 'kfc')
  ensureEqual(f.get('name'), 'kfc', 'test foo get')
}

const __main = () => {
  testFoo()
}

__main()
