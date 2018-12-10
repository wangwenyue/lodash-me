// 节流 throttle
const throttle = (fn, delay) => {
  let last = 0
  return function() {
    let [ctx, args] = [this, arguments]
    let now = new Date()
    if(now - last >= delay) {
      last = now
      fn.apply(ctx, args)
    }
  }
}

// 测试
const log1 = () => {
  console.log('throttle 滚动事件')
}
// 每1s周期内只会打印一次 console
document.addEventListener('scroll', throttle(log1, 1000))

// 防抖
const debounce = (fn, delay) => {
  let timer = null
  return function() {
    let [ctx, args] = [this, arguments]
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(ctx, args)
    }, delay)
  }
}

// 测试
const log2 = () => {
  console.log('debounce 滚动事件')
}
// 每一次操作只会打印一次 console
document.addEventListener('scroll', debounce(log2, 1000))