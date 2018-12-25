const log = console.log.bind(console, '### base64')

const ensureEqual = (a, b, message) => {
  a !== b ? log(`${message}, (${a}) 不等于 (${b})`) : log('测试成功')
}

const ascii = char => char.charCodeAt(0)

const charFromAscii = code => String.fromCharCode(code)

/*
  n 是一个不大于 255 的 int
  返回 n 的 8 位二进制形式的字符串
  例如 binary(7) 返回 '00000111'
*/

const zerofill = str => {
  const len = 8 - str.length
  for (let i = 0; i < len; i++) {
    str = '0' + str
  }
  return str
}

const binary = n => zerofill(n.toString(2))

const binary2 = n => n.toString(2).padStart(8, '0')

const testBinary = () => {
  ensureEqual(binary(7), '00000111', 'test binary 1')
  ensureEqual(binary2(255), '11111111', 'test binary 2')
  ensureEqual(binary2(100), '01100100', 'test binary 3')
}

const int = bin => {
  // 对于传进来的 bin，以2进制的方式解析成 int 类型
  return parseInt(bin, 2)
}

// 删除高位的 0
const lzero = bin => {
  for (let i = 0; i < bin.length; i++) {
    if (bin[i] !== '0') {
      bin = bin.slice(i)
      break
    }
  }
  return String(bin)
}

// 手动模拟 parseInt, 2代表二进制，可以替换成任意进制
const int2 = bin => {
  bin = lzero(bin)
  let revBin = [...bin].reverse()
  return revBin.map((val, index) => {
    return val * Math.pow(2, index)
  }).reduce((a, b) => a + b)
}

const testInt = () => {
  ensureEqual(int('00000111'), 7, 'test int 1')
  ensureEqual(int2('01100100'), 100, 'test int 2')
  ensureEqual(int2('11111111'), 255, 'test int 3')
}

/*
  s 是一个 string
  返回 s 的二进制字符串
  例如 binaryStream('Man') 返回
  '010011010110000101101110'

  使用上面的函数
*/

const binaryStream = str => {
  let res = ''
  for (char of str) {
    res += binary(ascii(char))
  }
  return res
}

const binaryStream2 = str => [...str].map(char => binary(ascii(char))).join('')

const testBinaryStream = () => {
  ensureEqual(binaryStream('Man'), '010011010110000101101110', 'test binary stream 1')
  ensureEqual(binaryStream2('is'), '0110100101110011', 'test binary stream 2')
}

/*
  bins 是一个二进制形式的字符串
  返回 bins 代表的原始字符串
  例如 stringFromBinary('010011010110000101101110') 返回 'Man'

  使用上面的函数
*/

const stringFromBinary = bins => {
  let res = ''
  for (let i = 0; i < bins.length; i += 8) {
    const bin = bins.slice(i, i + 8)
    res += charFromAscii(int(bin))
  }
  return res
}

const testStringFromBinary = () => {
  ensureEqual(stringFromBinary('010011010110000101101110'), 'Man', 'test string from binary 1')
  ensureEqual(stringFromBinary('0110100101110011'), 'is', 'test string from binary 2')
}

/*
  s 是一个 string
  返回 s 的 base64 编码

  Base64是一种基于 64 个可打印字符来表示数据的方法
  它用每 6 个比特为一个单元，对应某个可打印字符
  ASCII 码一个字符是 8 比特, 也就是一字节
  3 个字节就有 24 个比特, 对应了 4 个 base64 单元

  如下所示
  原始信息        M            a           n
  ASCII         77            7           110
  二进制         01001101     01100001     01101110
  4 个单元       010011     010110     000101     101110
  每个单元转换后  19         22         5          46

  转换后每个 base64 单元都是一个 0-63 的数字
  因为 6 比特表示的范围就是这么大
  然后数字到字符串的转换是下面这段字符串取下标所得
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

  19 对应的是 T
  22 对应的是 W
  5 对应的是  F
  46 对应的是 u
  那么 Base64 编码结果就是    T   W   F  u

  所以 base64Encode('Man') 返回 'TWFu'


  既然 3 个字节转换为 4 个 base64 单元
  那么 1 个字节怎么办呢?
  答案是用 0 补出 3 字节(这样就可以凑满 24 位, 也就可以分成 4 个单元), 如下所示
  原始信息    M
  ASCII     77           0            0
  二进制     01001101     00000000     00000000
  4 个单元   010011     010000     000000     000000
  单元转换后  19 16 0 0
  因为末尾是强行补上的, 所以给他用 '=' 凑出字符(这是一个例外)
  所以 base64Encode('M') 返回 'TQ=='
*/

const base64Encode = str => {
  const ma64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
  let bins = binaryStream(str)
  // 如果 bins 的长度不是 24 的倍数, 就用 '0' 补到 24 的倍数
  while (bins.length % 24 !== 0) {
    bins += '0'
  }
  let res = ''
  for (let i = 0; i < bins.length; i += 6) {
    const bin = bins.slice(i, i + 6)
    const b2int = int(bin)
    b2int !== 0 ? res += ma64[b2int] : res += '='
  }
  return res
}

const testBase64Encode = () => {
  ensureEqual(base64Encode('Man'), 'TWFu', 'test base64 encode 1')
  ensureEqual(base64Encode('M'), 'TQ==', 'test base64 encode 2')
  ensureEqual(base64Encode(' is'), 'IGlz', 'test base64 encode 3')
}

const __main = () => {
  testBinary()
  testInt()
  testBinaryStream()
  testStringFromBinary()
  testBase64Encode()
}

__main()
