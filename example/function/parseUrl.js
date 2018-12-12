const log = console.log.bind(console, '### parseUrl')

const ensure = (condition, message) => {
  if (!condition) {
    log('测试失败:', message)
  } else {
    log('测试成功')
  }
}

/*
  url 是字符串, 返回协议

  如果 url 中省略了协议部分, 那么默认用的是 http 协议
  如果没有省略, 则按照 url 中协议部分的解析
  返回代表协议的字符串, 'http' 或者 'https'
*/
const urls = [
  ['g.cn', 'http', 'g.cn', 80, '/'],
  ['g.cn/', 'http', 'g.cn', 80, '/'],
  ['g.cn:3000', 'http', 'g.cn', 3000, '/'],
  ['g.cn:3000/search', 'http', 'g.cn', 3000, '/search'],
  ['http://g.cn', 'http', 'g.cn', 80, '/'],
  ['https://g.cn', 'https', 'g.cn', 443, '/'],
  ['http://g.cn/', 'http', 'g.cn', 80, '/'],
]

const protocolOfUrl = url => url.startsWith('https://') ? 'https' : 'http'

const testProtocolOfUrl = () => {
  for (let u of urls) {
    const [url, protocol, , , ,] = u
    ensure(protocolOfUrl(url) === protocol, 'test protocol of url')
  }
}

/*
  url 是字符串, 返回主机

  返回代表主机的字符串, 比如 'g.cn'
*/

const hostOfUrl = url => {
  let host = ''
  let u = ''
  if(url.startsWith('https://') || url.startsWith('http://')) {
    u = url.split('://')[1]
  } else {
    u = url
  }
  const idx = u.indexOf(':')
  if (idx > -1) {
    host = u.slice(0, idx)
  } else {
    host = u.split('/')[0]
  }
  return host
}

const testHostOfUrl = () => {
  for (let u of urls) {
    const [url, , host, , ,] = u
    ensure(hostOfUrl(url) === host, 'test host of url')
  }
}

/*
  url 是字符串, 返回端口

  返回代表端口的数字, 比如 80 或者 3000
  80 是 http 协议的默认端口, 443 是 https 协议的默认端口
*/

const portOfUrl = url => {
  // 先写个默认的映射表
  const portMapper = {
    'http': 80,
    'https': 443,
  }
  // 设置一个默认的 protocol 和 port
  let [protocol, port] = ['http', 80]
  if(url.startsWith('https://') || url.startsWith('http://')) {
    [protocol, u] = url.split('://')
  } else {
    u = url
  }
  const idx = u.indexOf(':')
  // 如果有 ：, 就证明存在端口号
  if(idx > -1) {
    // g.cn:3000/search --> 3000/search
    u = u.slice(idx + 1)
    port = Number(u.split('/')[0])
  } else {
    // 没有 ：, 那就直接查映射表就可以了
    port = portMapper[protocol]
  }
  return port
}

const testPortOfUrl = () => {
  for (let u of urls) {
    const [url, , , port, ,] = u
    ensure(portOfUrl(url) === port, 'test port of url')
  }
}

/*
  url 是字符串, 返回路径

  返回代表路径的字符串, 比如 '/' 或者 '/search'
  当没有给出路径的时候, 默认路径是 '/'
*/

const pathOfUrl = url => {
  let u = ''
  if (url.startsWith('https://') || url.startsWith('http://')) {
    u = url.split('://')[1]
  } else {
    u = url
  }
  let path = '/'
  const idx = u.indexOf('/')
  if (idx > -1) {
    path = u.slice(idx)
  }
  return path
}

const testPathOfUrl = () => {
  for (let u of urls) {
    const [url, , , , path,] = u
    ensure(pathOfUrl(url) === path, 'test path of url')
  }
}

/*
  url 是字符串, 返回解析后的 url

  返回一个 object, 内容如下
  {
      protocol: protocol,
      host: host,
      port: port,
      path: path,
  }
*/

const parsedUrl = url => {
  return {
    protocol: protocolOfUrl(url),
    host: hostOfUrl(url),
    port: portOfUrl(url),
    path: pathOfUrl(url),
  }
}

const testParsedUrl = () => {
  for (let u of urls) {
    const [url, p1, h, p2, p3] = u
    const { protocol, host, port, path } = parsedUrl(url)
    const equal = p1 === protocol && h === host && p2 === port && p3 === path
    ensure(equal, 'test parsed url')
  }
}

const __main = () => {
  testProtocolOfUrl()
  testHostOfUrl()
  testPortOfUrl()
  testPathOfUrl()
  testParsedUrl()
}

__main()