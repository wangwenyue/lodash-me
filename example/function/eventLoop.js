// 写出打印结果
const eventLoop1 = () => {
  async function async1() {
    console.log('async1 start') // 1
    await async2()
    console.log('async1 end') // 2
  }

  async function async2() {
    console.log('async2') // 3
  }

  console.log('script start') // 4

  setTimeout(() => {
    console.log('setTimeout') // 5
  }, 0)

  async1()

  new Promise((resolve) => {
    console.log('promise1') // 6
    resolve()
  }).then(() => {
    console.log('promise2') // 7
  })

  console.log('script end') // 8
}

const eventLoop2 = () => {
  console.log('1');

  setTimeout(function () {
    console.log('2');
    // process.nextTick(function () {
    //   console.log('3');
    // })
    new Promise(function (resolve) {
      console.log('4');
      resolve();
    }).then(function () {
      console.log('5')
    })
  })
  // process.nextTick(function () {
  //   console.log('6');
  // })
  new Promise(function (resolve) {
    console.log('7');
    resolve();
  }).then(function () {
    console.log('8')
  })

  setTimeout(function () {
    console.log('9');
    // process.nextTick(function () {
    //   console.log('10');
    // })
    new Promise(function (resolve) {
      console.log('11');
      resolve();
    }).then(function () {
      console.log('12')
    })
  })
}


const __main = () => {
  // 4 1 3 6 8 7 2 5
  eventLoop1()
  // 1 7 8 2 4 5 9 11 12
  eventLoop2()
}