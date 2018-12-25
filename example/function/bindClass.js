/**
 * element 是一个标签
 * html 是一段 html 字符串
 * 把 html 作为子元素插入到 element 的末尾
 *
 * 用法如下:
    var b = document.querySelector('body')
    appendHtml(b, '<h1>hello</h1>')
 */

const appendHtml = (element, html) => {
  element.insertAdjacentHTML('beforeEnd', html)
}


/**
 *
 * @param element 是一个标签
 * @param eventName 是一个 string, 表示事件的名字
 * @param callback 是一个函数
 *
 */

const bindEvent = (element, eventName, callback) => {
  element.addEventListener(eventName, callback)
}

/**
 *
 * @param element 是一个标签
 * @param eventName 是一个 string, 表示事件的名字
 * @param callback 是一个函数
 * @param responseClass 是一个字符串
 *
 * 在 element 上绑定一个事件委托
 * 只会响应拥有 responseClass 类的元素
 *
 */

const bindEventDelegate = (element, eventName, callback, responseClass) => {
  element.addEventListener(eventName, (event) => {
    const self = event.target
    if (self.classList.contains(responseClass)) {
      callback(event)
    }
  })
}

/*
  selector 是一个 string, 选择器, 有如下三种取值
      1, 标签选择器, 如 'div'
      2, class 选择器, 如 '.red'
      3, id 选择器, 如 '#id-input-name'
  html 是一段 html 字符串
  把 html 作为子元素插入到 selector 选中的所有元素的末尾
*/

/**
 *
 * @param selector 是一个 string, 选择器, 有如下三种取值
 * 1, 标签选择器, 如 'div'
 * 2, class 选择器, 如 '.red'
 * 3, id 选择器, 如 '#id-input-name'
 * @param html 是一段 html 字符串
 * 把 html 作为子元素插入到 selector 选中的所有元素的末尾
 *
 */

const append = (selector, html) => {
  const elements = document.querySelectorAll(selector)
  for (let element of elements) {
    element.insertAdjacentHTML('beforeend', html)
  }
}

/**
 *
 * @param selector
 * @param eventName
 * @param callback
 * @param responseClass
 *
 * 给 selector 选中的所有元素绑定 eventName 事件
 * 当 responseClass 给出的时候, callback 只会响应拥有 responseClass 类的元素
 * 当 responseClass 没有给的时候, callback 直接响应
 *
 */

const bindAll = (selector, eventName, callback, responseClass) => {
  const elements = document.querySelectorAll(selector)
  for (let element of elements) {
    element.addEventListener(eventName, (event) => {
      if (responseClass === undefined) {
        callback(event)
      } else {
        const self = event.target
        if (self.classList.contains(responseClass)) {
          callback(event)
        }
      }
    })
  }
}
