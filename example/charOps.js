const log = console.log.bind(console, '### charOps')

const ensureEqual = (a, b, message) => {
  a !== b ? log(`${message}, (${a}) 不等于 (${b})`) : log('测试成功')
}

const lower = 'abcdefghijklmnopqrstuvwxyz'
const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

/*
s1 s2 都是 string
但 s2 的长度是 1

返回 s2 在 s1 中的下标, 从 0 开始, 如果不存在则返回 -1
*/

const find = (s1, s2) => {
  const arrS1 = [...s1]
  let res = -1
  arrS1.map((char, index) => {
    if (char === s2) {
      res = index
    }
  })
  return res
}

const testFind = () => {
  ensureEqual(find('hello', 'a'), -1, 'find error 1')
  ensureEqual(find('hello', 'e'), 1, 'find error 2')
  ensureEqual(find('hello', 'l'), 3, 'find error 3')
}

/*
定义一个函数
参数是一个字符串 s
返回小写后的字符串
注意, 假设 s 字符串全是大写字母
*/

const lowerCase = str => {
  const arrStr = [...str]
  let res = ''
  arrStr.map(char => {
    const idx = find(upper, char)
    res += lower[idx]
  })
  return res
}

const testLowerCase = () => {
  ensureEqual(lowerCase('HELLO'), 'hello', 'lowerCase error 1')
  ensureEqual(lowerCase('KFC'), 'kfc', 'lowerCase error 2')
  ensureEqual(lowerCase('KOWALSKI'), 'kowalski', 'lowerCase error 3')
}

/*
定义一个函数
参数是一个字符串 s
返回大写后的字符串
注意, 假设 s 字符串全是小写字母
*/

const upperCase = str => {
  const arrStr = [...str]
  let res = ''
  arrStr.map(char => {
    const idx = find(lower, char)
    res += upper[idx]
  })
  return res
}

const testUpperCase = () => {
  ensureEqual(upperCase('hello'), 'HELLO', 'upperCase error 1')
  ensureEqual(upperCase('kfc'), 'KFC', 'upperCase error 2')
  ensureEqual(upperCase('kowalski'), 'KOWALSKI', 'upperCase error 3')
}

/*
实现 lowerCase1
它能正确处理带 小写字母 的字符串
*/

const lowerCase1 = str => {
  const arrStr = [...str]
  let res = ''
  arrStr.map(char => {
    const idx = find(upper, char)
    res = idx === -1 ? res + char : res + lower[idx]
  })
  return res
}

const testLowerCase1 = () => {
  ensureEqual(lowerCase1('HEllO'), 'hello', 'lowerCase1 error 1')
  ensureEqual(lowerCase1('KfC'), 'kfc', 'lowerCase1 error 2')
  ensureEqual(lowerCase1('KoWaLsKI'), 'kowalski', 'lowerCase1 error 3')
}

/*
实现 lowerCase1
它能正确处理带 小写字母 的字符串
*/

const upperCase1 = str => {
  const arrStr = [...str]
  let res = ''
  arrStr.map(char => {
    const idx = find(lower, char)
    res = idx === -1 ? res + char : res + upper[idx]
  })
  return res
}

const testUpperCase1 = () => {
  ensureEqual(upperCase1('HEllO'), 'HELLO', 'upperCase1 error 1')
  ensureEqual(upperCase1('KfC'), 'KFC', 'upperCase1 error 2')
  ensureEqual(upperCase1('KoWaLsKI'), 'KOWALSKI', 'upperCase1 error 3')
}

/*
实现一个叫 凯撒加密 的加密算法, 描述如下
对于一个字符串, 整体移位, 就是加密
以右移 1 位为例
原始信息 'afz' 会被加密为 'bga'
实现 encode1 函数, 把明文加密成密码并返回
右移 1 位

注意:
  s 是一个只包含小写字母的字符串
*/

const encode1 = str => {
  const arrStr = [...str]
  let res = ''
  arrStr.map(char => {
    let idx = find(lower, char)
    idx = (idx + 1) % lower.length
    res += lower[idx]
  })
  return res
}

const testEncode1 = () => {
  ensureEqual(encode1('afz'), 'bga', 'encode1 error 1')
  ensureEqual(encode1('gw'), 'hx', 'encode1 error 2')
  ensureEqual(encode1('abc'), 'bcd', 'encode1 error 3')
}

/*
实现 decode1 函数, 把上面加密的密码解密为明文并返回

注意:
  s 是一个只包含小写字母的字符串
*/

const decode1 = str => {
  const arrStr = [...str]
  let res =''
  arrStr.map(char => {
    let idx = find(lower, char)
    // 加上 lower.length 防止 idx - 1 为负数
    idx = (lower.length + idx - 1) % lower.length
    res += lower[idx]
  })
  return res
}

const testDecode1 = () => {
  ensureEqual(decode1('bga'), 'afz', 'decode1 error 1')
  ensureEqual(decode1('hx'), 'gw', 'decode1 error 2')
  ensureEqual(decode1('bcd'), 'abc', 'decode1 error 3')
}

/*
实现 encode2
多了一个参数 shift 表示移的位数

注意:
  s 是一个只包含小写字母的字符串

*/

const encode2 = (str, shift) => {
  const arrStr = [...str]
  let res = ''
  arrStr.map(char => {
    let idx = find(lower, char)
    idx = (idx + shift) % lower.length
    res += lower[idx]
  })
  return res
}

const testEncode2 = () => {
  ensureEqual(encode2('afz', 2), 'chb', 'encode2 error 1')
  ensureEqual(encode2('gw', 3), 'jz', 'encode2 error 2')
}

/*
实现 decode2
多了一个参数 shift 表示移的位数

注意:
  s 是一个只包含小写字母的字符串
*/

const decode2 = (str, shift) => {
  const arrStr = [...str]
  let res = ''
  arrStr.map(char => {
    let idx = find(lower, char)
    idx = (lower.length + idx - shift) % lower.length
    res += lower[idx]
  })
  return res
}

const testDecode2 = () => {
  ensureEqual(decode2('bga', 2), 'zey', 'decode2 error 1')
  ensureEqual(decode2('hx', 2), 'fv', 'decode2 error 2')
  ensureEqual(decode2('bcd', 3), 'yza', 'decode2 error 3')
}

/*
实现 encode3
多了一个参数 shift 表示移的位数
如果 s 中包含了不是字母的字符, 比如空格或者其他符号, 则对这个字符不做处理保留原样

注意:
  s 是一个只包含小写字母和不是字母的字符的字符串
*/

const encode3 = (str, shift) => {
  const arrStr = [...str]
  let res = ''
  arrStr.map(char => {
    let idx = find(lower, char)
    if (idx === -1) {
      res += char
    } else {
      idx = (idx + shift) % lower.length
      res += lower[idx]
    }
  })
  return res
}

const testEncode3 = function () {
  ensureEqual(encode3('a fz', 2), 'c hb', 'encode3 error 1')
  ensureEqual(encode3('g#w', 3), 'j#z', 'encode3 error 2')
}

/*
实现 decode3
多了一个参数 shift 表示移的位数
如果 s 中包含了不是字母的字符, 比如空格或者其他符号, 则对这个字符不做处理保留原样

注意:
  s 是一个只包含小写字母和不是字母的字符的字符串
*/

const decode3 = (str, shift) => {
  const arrStr = [...str]
  let res = ''
  arrStr.map(char => {
    let idx = find(lower, char)
    if (idx === -1) {
      res += char
    } else {
      idx = (lower.length + idx - shift) % lower.length
      res += lower[idx]
    }
  })
  return res
}

const testDecode3 = function () {
  ensureEqual(decode3('ch#b', 2), 'af#z', 'decode3 error 1')
  ensureEqual(decode3('j z', 3), 'g w', 'decode3 error 2')
}

// 破解凯撒加密
const code = 'VRPHWLPHV L ZDQW WR FKDW ZLWK BRX, EXW L KDYH QR UHDVRQ WR FKDW ZLWK BRX'

const decode4 = str => {
  // 大写全部转小写
  const lowerCode = lowerCase1(str)
  // shift 取值 0 ~ 25, 然后 log 出来看哪个语句有意义
  for(let i = 0; i < lower.length; i++) {
    const res = encode3(lowerCode, i)
    log(res)
  }
}

const testDecode4 = () => {
  decode4(code)
}

const __main = () => {
  testFind()
  testLowerCase()
  testUpperCase()
  testLowerCase1()
  testUpperCase1()
  testEncode1()
  testDecode1()
  testEncode2()
  testDecode2()
  testEncode3()
  testDecode3()
  testDecode4()
}

__main()