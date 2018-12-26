const log = console.log.bind(console, '### selectionSort')

const ensureEqual = (a, b, message) => {
  a !== b ? log(`${message}, (${a}) 不等于 (${b})`) : log('测试成功')
}

const arrayEquals = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false
  return arr1.every((val, index) => val === arr2[index])
}

// 每次取最小的 min 放最前面
const selectionSort = arr => {
  const len = arr.length
  if (len <= 1) return arr
  for (let i = 0; i < len; i++) {
    let min = i
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[min]) min = j
    }
    if (i !== min) [arr[i], arr[min]] = [arr[min], arr[i]]
  }
  return arr
}

const testSelectionSort = () => {
  const arr1 = [3, 2, 10, 9, 4, 6]
  ensureEqual(arrayEquals(selectionSort(arr1), [2, 3, 4, 6, 9, 10]), true, 'test selection sort 1')
}

testSelectionSort()
