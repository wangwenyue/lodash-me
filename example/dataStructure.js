const log = console.log.bind(console, '### dataStructure')

const ensureEqual = (a, b, message) => {
  a !== b ? log(`${message}, (${a}) 不等于 (${b})`) : log('测试成功')
}

// 模拟栈
class Stack {
  constructor() {
    this.data = []
  }
  // push 添加一个元素
  push(e) {
    this.data.push(e)
  }

  // pop 删除并返回最新添加的元素
  pop() {
    const index = this.data.length - 1
    return this.data.splice(index, 1)
  }

  // top 仅返回最新添加的元素
  top() {
    const index = this.data.length - 1
    return this.data[index]
  }

  size() {
    return this.data.length
  }
}

const testStack = () => {
  const s = new Stack()
  s.push('hello')
  s.push('world')
  ensureEqual(s.size(), 2, 'stack test 1')
}

/*
  验证括号匹配
  s 是这样的字符串 "{(1 + 2) * [3]}"
  用栈来验证括号是否匹配
*/

const popBrackets = (item, res) => {
  // 这里用 === 会判断失败？？？
  const case1 = item == ')' && res.slice(-1) == '('
  const case2 = item == ']' && res.slice(-1) == '['
  const case3 = item == '}' && res.slice(-1) == '{'
  if (case1 || case2 || case3) res.pop()
}

const validPair = s => {
  const res = []
  const valid = ['(', '[', '{']
  for (let item of s) {
    valid.includes(item) ? res.push(item) : popBrackets(item, res)
  }
  return res.length === 0
}

const testValidPair = () => {
  const test1 = '((1 + 2) * 3)'
  const test2 = '(({[()]}))'
  const test3 = '((])'

  ensureEqual(validPair(test1), true, 'test1 failed')
  ensureEqual(validPair(test2), true, 'test2 failed')
  ensureEqual(validPair(test3), false, 'test3 failed')
}

testValidPair()

// 实现一个 node
class Node {
  constructor(e) {
    this.element = e
    this.next = null
  }
}

// 实现一个链表
class LinkedList {
  constructor() {
    // 这里初始化之后 { element: undefined, next: null }
    // 新加入的元素会在 this.head.next 当中，不会覆盖 this.head
    this.head = new Node()
    this._length = 0
  }

  append(e) {
    const node = new Node(e)
    let n = this.head
    while (n.next != null) {
      n = n.next
    }
    n.next = node
    this._length++
  }

  // 找不到就返回 -1
  indexOf(e) {
    let index = -1
    let n = this.head
    let i = 0
    while (n.next != null) {
      if (e === n.element) {
        index = i
        break
      }
      n = n.next
      i++
    }
    return index
  }

  length() {
    return this._length
  }

  log() {
    let n = this.head.next
    log('遍历链表')
    while (n != null) {
      log(' > ', n.element)
      n = n.next
    }
    log('length:', this._length)
  }

  prepend(e) {
    const node = new Node(e)
    const n = this.head.next
    this.head.next = node
    node.next = n
    this._length++
  }

  removeFirst() {
    const n = this.head.next.next
    this.head.next = n
    this._length--
  }

  removeLast() {
    let n = this.head
    while (n.next.next != null) {
      n = n.next
    }
    n.next = null
    this._length--
  }
}

const testLinkedList = () => {
  const list = new LinkedList()
  list.append('hello')
  list.append('kfc')
  list.append('你好')
  list.prepend('Good')
  list.log()
  list.removeFirst()
  list.log()
  list.removeLast()
  list.log()
}

/**
 * 定义一个 HashTable 类
 * 它有一个 data 属性(类型是 array)来存储数据
 * 有一个 size 属性来指定 data 的长度, 令它为 101
 *
 * hash(s)
 * s 是一个 string
 * 通过 s 来返回一个数字
 * 这个算法可以自己设计
 * 最后返回一个 数字
 */

class HashTable {
  constructor() {
    this.data = []
    this.size = 101
  }

  hash(s) {
    let sum = 0
    for (let i = 0; i < s.length; i++) {
      sum += s[i].charCodeAt(0) * i * Math.pow(10, i)
    }
    return sum
  }

  index(s) {
    let num = this.hash(s)
    return num % this.size
  }

  set(key, value) {
    let idx = this.index(key)
    let data = this.data[idx]
    if (data === undefined) {
      data = [[key, value]]
    } else {
      for (let i = 0; i < data.length; i++) {
        if (data[i][0] === key) {
          data[i][1] = value
        } else {
          data.push([key, value])
        }
      }
    }
    this.data[idx] = data
  }

  get(key, value) {
    let data = this.data
    for (let i = 0; i < data.length; i++) {
      if (data[i] === undefined) {
        continue
      }
      for (let j = 0; j < data[i].length; j++) {
        if (data[i][j][0] == key) {
          return data[i][j][1]
        }
      }
    }
    return value
  }

  has(key) {
    let data = this.data
    for (let i = 0; i < data.length; i++) {
      if (data[i] === undefined) {
        continue
      }
      for (var j = 0; j < data[i].length; j++) {
        if (data[i][j][0] === key) {
          return true
        }
      }
    }
    return false
  }
}

const testHash = (hs, s) => {
  ensureEqual(11071704786610, hs.hash(s), 'test hash')
}

const testIndex = (hs, s) => {
  ensureEqual(39, hs.index(s), 'test index')
}

const testSet = hs => {
  hs.set('hello', 'world')
  hs.set('hello2', 'www2')
  hs.set('hello2', 'reverse')
  hs.set('KFC', '123')
  log(hs.data)
}

const testGet = hs => {
  ensureEqual('123', hs.get('KFC', undefined), 'test get 1')
  ensureEqual(undefined, hs.get('hello312321', undefined), 'test get 2')
}

const testHas = hs => {
  ensureEqual(true, hs.has('KFC'), 'test has 1')
  ensureEqual(false, hs.has('McDonalds'), 'test has 2')
}

const testHashTable = () => {
  const hs = new HashTable()
  const s = 'hello world'
  testHash(hs, s)
  testIndex(hs, s)
  testSet(hs)
  testHas(hs)
  testGet(hs)
}

const __main = () => {
  testStack()
  testValidPair()
  testLinkedList()
  testHashTable()
}

__main()
