const log = console.log.bind(console, '### applyOps')

const ensureEqual = (a, b, message) => {
  a !== b ? log(`${message}, (${a}) 不等于 (${b})`) : log('测试成功')
}

/*
实现 apply 函数
参数如下
op 是 string 类型, 值是 '+' '-' '*' '/' 其中之一
a b 分别是 2 个数字
根据 op 对 a b 运算并返回结果(加减乘除)
*/

const apply = (op, a, b) => {
  const ops = ['+', '-', '*', '/']
  const calc = [a + b, a - b, a * b, a / b]
  let res = 0
  ops.map((val, index) => {
    if (op === val) res = calc[index]
  })
  return res
}

const testApply = () => {
  ensureEqual(apply('+', 1, 2), 3, 'apply error 1')
  ensureEqual(apply('-', 1, 2), -1, 'apply error 2')
  ensureEqual(apply('*', 1, 2), 2, 'apply error 3')
  ensureEqual(apply('/', 1, 2), 0.5, 'apply error 4')
}

/*
实现 applyList 函数
op 是 '+' '-' '*' '/' 其中之一
oprands 是一个只包含数字的 list
根据 op 对 oprands 中的元素进行运算并返回结果
例如, 下面的调用返回 -4
var n = applyList('-', [3, 4, 2, 1])
log(n)
// 结果是 -4, 用第一个数字减去所有的数字
*/

const applyList = (op, oprands) => {
  let [head, ...tails] = oprands
  for (let tail of tails) {
    head = apply(op, head, tail)
  }
  return head
}

const testApplyList = () => {
  ensureEqual(applyList('+', [1, 2, 3, 4]), 10, 'apply list 1')
  ensureEqual(applyList('-', [1, 2, 3, 4]), -8, 'apply list 2')
  ensureEqual(applyList('*', [1, 2, 3, 4]), 24, 'apply list 3')
  ensureEqual(applyList('/', [12, 2, 3]), 2, 'apply list 4')
}

/*
实现 applyCompare 函数
参数如下
expression 是一个 array(数组), 包含了 3 个元素
第一个元素是 op, 值是 '>' '<' '==' 其中之一
剩下两个元素分别是 2 个数字
根据 op 对数字运算并返回结果(结果是 true 或者 false)
*/

const applyCompare = expression => {
  const [op, a, b] = expression
  const ops = ['>', '===', '<']
  const cmp = [a > b, a === b, a < b]
  let res = false
  ops.map((val, index) => {
    if (op === val) res = cmp[index]
  })
  return res
}

const testApplyCompare = () => {
  ensureEqual(applyCompare(['<', 1, 2]), true, 'apply compare 1')
  ensureEqual(applyCompare(['>', 2, 1]), true, 'apply compare 2')
  ensureEqual(applyCompare(['===', 2, 2]), true, 'apply compare 3')
}

/*
实现 applyOps 函数
参数如下
expression 是一个 array
op 可能取值 ['+', '-', '*', '/', '>', '===', '<',]
expression 中第一个元素是 op, 剩下的元素是和 op 对应的值
根据 expression 运算并返回结果
假设 expression 为 [+ 1 3 5 7]
1 + 3 + 5 + 7 = 16
那么返回的结果为 16
*/

const applyOps = expression => {
  const [op, ...oprands] = expression
  const compares = ['>', '===', '<']
  return compares.includes(op) ? applyCompare(expression) : applyList(op, oprands)
}

const testApplyOps = () => {
  ensureEqual(applyOps(['<', 1, 2]), true, 'apply ops 1')
  ensureEqual(applyOps(['+', 1, 2, 3, 4]), 10, 'apply ops 2')
}

const __main = () => {
  testApply()
  testApplyList()
  testApplyCompare()
  testApplyOps()
}

__main()
