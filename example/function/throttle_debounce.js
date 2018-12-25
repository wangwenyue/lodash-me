// 节流 throttle
const throttle = (fn, interval) => {
  let last = 0
  return function () {
    let [ctx, args] = [this, arguments]
    let now = new Date()
    if (now - last >= interval) {
      last = now
      fn.apply(ctx, args)
    }
  }
}

// 测试
// 每 1s 周期内只会打印一次 console
// document.addEventListener('scroll', throttle(log1, 1000))

const print = text => console.log(text)

const t = throttle(print, 500)

// 300 < 500 只有 t1
const testThrottle = () => {
  t('t1')
  t('t2')
  t('t3')
  setTimeout(() => {
    t('t4')
  }, 300)
}

// time < 500 范围内，只会触发第一个，即只有 t1
const testThrottle2 = () => {
  t('t1')
  t('t2')
  t('t3')
}

// time > 500 t1 t4
const testThrottle3 = () => {
  t('t1')
  t('t2')
  t('t3')
  setTimeout(() => {
    t('t4')
  }, 600)
}

// 防抖
const debounce = (fn, delay) => {
  let timer = null
  return function () {
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
// document.addEventListener('scroll', debounce(log2, 1000))

const d = debounce(print, 500)

// 只会输出 d3， 因为 d3 最后触发，timer 从 d3 开始重新计时了
const testDebounce1 = () => {
  d('d1')
  d('d2')
  d('d3')
}

// 501 > 500 输出 d3, d4
const testDebounce2 = () => {
  d('d1')
  d('d2')
  d('d3')
  setTimeout(() => {
    d('d4')
  }, 501)
}

// 300 < 500 只输出 d4 因为 d4 最后触发，timer 从 d4 开始重新计时了
const testDebounce3 = () => {
  d('d1')
  d('d2')
  d('d3')
  setTimeout(() => {
    d('d4')
  }, 300)
}

// 800 === 300 + 500 只输出 d5，因为 d4 执行需要时间，在执行的期间，d5 重新计时了，所以最后执行 d5
const testDebounce4 = () => {
  d('d1')
  d('d2')
  d('d3')
  setTimeout(() => {
    d('d4')
  }, 300)
  setTimeout(() => {
    d('d5')
  }, 800)
}

// 810 > 300 + 500 输出 d4 d5
const testDebounce5 = () => {
  d('d1')
  d('d2')
  d('d3')
  setTimeout(() => {
    d('d4')
  }, 300)
  setTimeout(() => {
    d('d5')
  }, 810)
}

// 输出 d3 d5 ，因为 d4 已经进入下一个周期，被后来执行的 d5 取代了
const testDebounce6 = () => {
  d('d1')
  d('d2')
  d('d3')
  setTimeout(() => {
    d('d4')
  }, 500)
  setTimeout(() => {
    d('d5')
  }, 810)
}

const __main = () => {
  // testDebounce6()
  // testThrottle3()
}

__main()
