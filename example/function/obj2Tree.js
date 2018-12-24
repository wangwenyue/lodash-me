const log = console.log.bind(console, '### obj2Tree')

const ensureEqual = (a, b, message) => {
  a !== b ? log(`${message}, (${a}) 不等于 (${b})`) : log('测试成功')
}

const deepEquals = (a, b) => {
  if (a === b) return true

  if (a && b && typeof a === 'object' && typeof b === 'object') {
    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) return false
      if (!a.every((item, index) => deepEquals(item, b[index]))) return false
      return true
    }

    if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime()

    if (a instanceof RegExp && b instanceof RegExp) return a.toString() === b.toString()

    const keys = Object.keys(a)
    if (keys.length !== Object.keys(b).length) return false
    if (!keys.every(key => Object.prototype.hasOwnProperty.call(b, key))) return false
    if (!keys.every(key => deepEquals(a[key], b[key]))) return false
    return true
  }
}

const plain2Tree = obj => {
  let res = {}
  Object.keys(obj).map(key => {
    const parent = obj[key].parent
    if (parent === '') {
      res = obj[key]
    } else {
      obj[parent][key] = obj[key]
    }
  })
  return res
}

const testObj2Tree = () => {
  const input = {
    h3: {
      parent: 'h2',
      name: '副总经理(市场)'
    },
    h1: {
      parent: 'h0',
      name: '公司机构'
    },
    h7: {
      parent: 'h6',
      name: '副总经理(总务)'
    },
    h4: {
      parent: 'h3',
      name: '销售经理'
    },
    h2: {
      parent: 'h1',
      name: '总经理'
    },
    h8: {
      parent: 'h0',
      name: '财务总监'
    },
    h6: {
      parent: 'h4',
      name: '仓管总监'
    },
    h5: {
      parent: 'h4',
      name: '销售代表'
    },
    h0: {
      parent: '',
      name: 'root'
    }
  }
  const res = {
    parent: '',
    name: 'root',
    h1: {
      parent: 'h0',
      name: '公司机构',
      h2: {
        parent: 'h1',
        name: '总经理',
        h3: {
          parent: 'h2',
          name: '副总经理(市场)',
          h4: {
            parent: 'h3',
            name: '销售经理',
            h5: {
              parent: 'h4',
              name: '销售代表'
            },
            h6: {
              parent: 'h4',
              name: '仓管总监',
              h7: {
                parent: 'h6',
                name: '副总经理(总务)'
              }
            }
          }
        }
      }
    },
    h8: {
      parent: 'h0',
      name: '财务总监'
    }
  }

  ensureEqual(deepEquals(plain2Tree(input), res), true, 'test obj2tree error 1')
}

const __main = () => {
  testObj2Tree()
}

__main()
