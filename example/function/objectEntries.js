function* objectEntries() {
  let propKeys = Object.keys(this)
  for (let propKey of propKeys) {
    yield [propKey, this[propKey]]
  }
}

let jane = { first: 'Jane', last: 'Doe', 'kfc': 123 }

// 添加 iterator 功能
jane[Symbol.iterator] = objectEntries

for (let [key, value] of jane) {
  console.log(`${key}: ${value}`)
}
