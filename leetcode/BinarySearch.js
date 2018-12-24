const log = console.log.bind(console, '### binarySearch')

const ensureEqual = (a, b, message) => {
  a !== b ? log(`${message}, (${a}) 不等于 (${b})`) : log('测试成功')
}

/**
 * @param nums: The integer array.
 * @param target: Target to find.
 * @return: The first position of target. Position starts from 0.
 */

const binarySearch = (nums, target) => {
  // write your code here
  let start = 0
  let end = nums.length - 1

  while (start + 1 < end) {
    // Math.floor 是必须的
    const mid = Math.floor((start + end) / 2)
    nums[mid] < target ? start = mid : end = mid
  }

  if (nums[start] === target) {
    return start
  } else if (nums[end] === target) {
    return end
  } else {
    return -1
  }
}

const __test = () => {
  const arr = [1, 4, 7, 8, 12, 34, 67, 88, 99, 100]

  ensureEqual(binarySearch(arr, 12), 4, 'error test 1')
  ensureEqual(binarySearch(arr, 11), -1, 'error test 2')
  ensureEqual(binarySearch(arr, 100), 9, 'error test 3')
}

__test()

