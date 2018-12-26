const log = console.log.bind(console, '### insertionSort')

const ensureEqual = (a, b, message) => {
  a !== b ? log(`${message}, (${a}) 不等于 (${b})`) : log('测试成功')
}

const arrayEquals = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false
  return arr1.every((val, index) => val === arr2[index])
}

const insertionSort = arr => {
  const len = arr.length
  if (len <= 1) return arr
  for (let i = 1; i < len; i++) {
    for (let j = i; j > 0; j--) {
      if (arr[j] < arr[j - 1]) [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]]
    }
  }
  return arr
}

const testInsertionSort = () => {
  const arr1 = [3, 2, 10, 9, 4, 6]
  ensureEqual(arrayEquals(insertionSort(arr1), [2, 3, 4, 6, 9, 10]), true, 'test quick sort 1')
}

testInsertionSort()
