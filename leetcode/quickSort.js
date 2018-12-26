const log = console.log.bind(console, '### quickSort')

const ensureEqual = (a, b, message) => {
  a !== b ? log(`${message}, (${a}) 不等于 (${b})`) : log('测试成功')
}

const arrayEquals = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false
  return arr1.every((val, index) => val === arr2[index])
}

const quickSort = arr => {
  if (arr.length <= 1) return arr
  let left = quickSort(arr.filter(x => x < arr[0]))
  let mid = quickSort(arr.filter(x => x === arr[0]))
  let right = quickSort(arr.filter(x => x > arr[0]))
  return [...left, ...mid, ...right]
}

const testQuickSort = () => {
  const arr1 = [3, 2, 10, 9, 4, 6]
  ensureEqual(arrayEquals(quickSort(arr1), [2, 3, 4, 6, 9, 10]), true, 'test quick sort 1')
}

testQuickSort()
