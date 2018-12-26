// 将一天24小时按每半小划分成48段，我们用一个位图表示选中的时间区间，
// 例如`110000000000000000000000000000000000000000000000`，
// 表示第一个半小时和第二个半小时被选中了，其余时间段都没有被选中，
// 也就是对应00:00~01:00这个时间区间。一个位图中可能有多个不连续的
// 时间区间被选中，例如`110010000000000000000000000000000000000000000000`，
// 表示00:00-1:00和02:00-02:30这两个时间区间被选中了。

// 要求：写一个函数timeBitmapToRanges，将上述规则描述的时间位图转换成一个选中时间区间的数组。
// 示例输入：`"110010000000000000000000000000000000000000000000"`
// 示例输出：`["00:00~01:00", "02:00~02:30"]`

const log = console.log.bind(console, '### timeBitmapToRanges')

const bitmap = '110010000000000000000000000000000000000000000000'

const encodeHour = num => num < 10 ? `0${num}` : num

const flatten = arr => {
  while (arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr)
  }
  return arr
}

const timeBitmapToRanges = bitmap => {
  let list = []
  const lenb = bitmap.length
  for (let i = 0; i < lenb; i += 2) {
    let s = bitmap.slice(i, i + 2)
    list.push(s)
  }

  let result = []
  let r = ''
  // 将 index 与 时间对应起来
  list.forEach((item, index) => {
    if (item === '11') {
      r = [`${encodeHour(index)}:00`, `${encodeHour(index + 1)}:00`]
      result.push(r)
    } else if (item === '10') {
      r = [`${encodeHour(index)}:00`, `${encodeHour(index)}:30`]
      result.push(r)
    } else if (item === '01') {
      r = [`${encodeHour(index)}:30`, `${encodeHour(index + 1)}:00`]
      result.push(r)
    }
  })

  // 展开数组
  result = flatten(result)
  // 剔除公共时间段，如 [07:00 ~ 08:00] [08:00 ~ 09:00] 中的 08:00
  let s = new Set()
  for (ele of result) {
    s.has(ele) ? s.delete(ele) : s.add(ele)
  }

  // 两两切分，调整输出格式
  result = []
  const lens = [...s].length
  for (let i = 0; i < lens; i += 2) {
    const [start, end] = [...s].slice(i, i + 2)
    result.push(`${start} ~ ${end}`)
  }
  return result
}

log(timeBitmapToRanges(bitmap))
