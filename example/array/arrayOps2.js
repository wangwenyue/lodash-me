const log = console.log.bind(console, '### arrayOps2')

const ensureEqual = (a, b, message) => {
  a !== b ? log(`${message}, (${a}) 不等于 (${b})`) : log('测试成功')
}

const arrayEquals = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false
  return arr1.every((val, index) => val === arr2[index])
}

/*
  a 是一个 array
  返回一个 array, 包含了 a 中所有元素, 但不包含重复元素
  例如 a 是 [1, 2, 3, 1, 3, 5]
  返回 [1, 2, 3, 5]
*/

// 用 set 处理下重复数据，再返回成 array
const unique = arr => [...new Set(arr)]

// 常规做法
const unique2 = arr => {
  const res = []
  arr.map(val => {
    if (!res.includes(val)) {
      res.push(val)
    }
  })
  return res
}

const testUnique = () => {
  const u1 = unique([1, 2, 3, 1, 3, 5])
  const u2 = unique2([1, 1, 3, 3, 1, 3])

  ensureEqual(arrayEquals(u1, [1, 2, 3, 5]), true, 'unique test 1')
  ensureEqual(arrayEquals(u2, [1, 3]), true, 'unique test 2')
}

/*
  arr1 arr2 都是 array

  返回一个 array, 里面的元素是同时出现在 arr1 arr2 中的元素, 也就是取交集
  这个 array 中不包含重复元素
*/

const intersection = (arr1, arr2) => {
  let res = []
  res = arr1.filter(val => arr2.includes(val))
  return unique(res)
}

const intersection2 = (arr1, arr2) => [... new Set(arr1.filter(ele => arr2.includes(ele)))]

const testIntersection = () => {
  const a = [1, 1, 2, 3, 4]
  const b = [2, 2, 3, 4, 4, 5]
  const c = [1, 4, 6, 8]

  const i1 = intersection2(a, b)
  const i2 = intersection2(a, c)
  const i3 = intersection2(b, c)

  ensureEqual(arrayEquals(i1, [2, 3, 4]), true, 'intersection test 1')
  ensureEqual(arrayEquals(i2, [1, 4]), true, 'intersection test 2')
  ensureEqual(arrayEquals(i3, [4]), true, 'intersection test 3')
}

/*
  arr1 arr2 都是 array

  返回一个 array, 里面的元素是所有出现在 arr1 arr2 中的元素
  这个 array 中不包含重复元素
*/

const union = (arr1, arr2) => unique([...arr1, ...arr2])

const union2 = (arr1, arr2) => [... new Set([...arr1, ...arr2])]

const testUnion = () => {
  const a = [1, 2, 3, 4]
  const b = [2, 3, 4, 5]
  const c = [1, 4, 6, 8]

  const u1 = union2(a, b)
  const u2 = union2(a, c)
  const u3 = union2(b, c)

  ensureEqual(arrayEquals(u1, [1, 2, 3, 4, 5]), true, 'union test 1')
  ensureEqual(arrayEquals(u2, [1, 2, 3, 4, 6, 8]), true, 'union test 2')
  ensureEqual(arrayEquals(u3, [2, 3, 4, 5, 1, 6, 8]), true, 'union test 3')
}

/*
  arr1 arr2 都是 array

  返回一个 array, 里面的元素是
  所有在 arr1 中有 arr2 中没有的元素
  这个 array 中不包含重复元素
*/

const difference = (arr1, arr2) => {
  let res = []
  res = arr1.filter(val => !arr2.includes(val))
  return unique(res)
}

const difference2 = (arr1, arr2) => [... new Set(arr1.filter(ele => !arr2.includes(ele)))]

const testDifference = () => {
  const a = [1, 2, 3, 4]
  const b = [2, 3, 4, 5]
  const c = [1, 4, 6, 8]

  const d1 = difference2(a, b)
  const d2 = difference2(a, c)
  const d3 = difference2(b, c)

  ensureEqual(arrayEquals(d1, [1]), true, 'difference test 1')
  ensureEqual(arrayEquals(d2, [2, 3]), true, 'difference test 2')
  ensureEqual(arrayEquals(d3, [2, 3, 5]), true, 'difference test 3')
}

/*
  arr1 arr2 都是 array

  返回一个 array, 里面的元素是
  所有在 arr1 arr2 中的非公共元素
  这个 array 中不包含重复元素
*/

const differenceAll = (arr1, arr2) => {
  // arr1 中出现 arr2 中不出现
  const arr12 = difference(arr1, arr2)
  // arr2 中出现 arr1 中不出现
  const arr21 = difference(arr2, arr1)
  return union(arr12, arr21)
}

const testDifferenceAll = () => {
  const a = [1, 2, 3, 4]
  const b = [2, 3, 4, 5]
  const c = [1, 4, 6, 8]

  const d1 = differenceAll(a, b)
  const d2 = differenceAll(a, c)
  const d3 = differenceAll(b, c)

  ensureEqual(arrayEquals(d1, [1, 5]), true, 'differenceAll test 1')
  ensureEqual(arrayEquals(d2, [2, 3, 6, 8]), true, 'differenceAll test 2')
  ensureEqual(arrayEquals(d3, [2, 3, 5, 1, 6, 8]), true, 'differenceAll test 3')
}

/*
  arr1 arr2 都是 array

  检查是否 arr1 中的每个元素都在 arr2 中出现
  返回 bool
*/

const isSubset = (arr1, arr2) => {
  for (let val of arr1) {
    if(!arr2.includes(val)) {
      return false
    }
  }
  return true
}

const isSubset2 = (arr1, arr2) => arr1.every(ele => arr2.includes(ele))

const testIsSubset = () => {
  const test1 = isSubset2([1, 2, 3], [1, 2, 3, 4])
  const test2 = isSubset2([1, 2], [2, 3, 4])

  ensureEqual(test1, true, 'test is subset 1')
  ensureEqual(test2, false, 'test is subset 2')
}

const __main = () => {
  testUnique()
  testIntersection()
  testUnion()
  testDifference()
  testDifferenceAll()
  testIsSubset()
}

__main()
