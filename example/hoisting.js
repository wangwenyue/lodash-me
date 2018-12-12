const test1 = () => {
  var a = function () {
    console.log("hello")
  }
  a() // hello
  function a() {
    console.log("world")
  }
  a() // hello
}

const test11 = () => {
  var a = undefined // fuction a() {} 引起的变量声明
  a = function () {
    console.log('world')
  }
  a = function () {
    console.log("hello")
  }
  a()
  a()
}


const test2 = () => {
  function a() {
    console.log("world")
  }
  a() // world
  var a = function () {
    console.log("hello")
  }
  a() // hello
}

const test22 = () => {
  var a = undefined // fuction a() {} 引起的变量声明
  a = function () {
    console.log("world")
  }
  a() // world
  a = function () {
    console.log("hello")
  }
  a() // hello
}

const test3 = () => {
  b() // call b second
  function b() {
    console.log('call b fist')
  }
  function b() {
    console.log('call b second')
  }
  var b = 'Hello world'
}

const test33 = () => {
  var b = undefined
  b = function () {
    console.log('call b fist')
  }
  b = function () {
    console.log('call b second')
  }
  b() // call b second
  b = 'Hello world'
}

const test4 = () => {
  b() // call b
  console.log(a) // undefined
  var a = 'Hello world'
  function b() {
    console.log('call b')
  }
}

const test44 = () => {
  var b = undefined
  b = function () {
    console.log('call b')
  }
  var a = undefined
  b()
  console.log(a)
  a = 'Hello world'
}

const test5 = () => {
  b() // call b
  console.log(b) // [Function: b]
  var b = 'Hello world'
  function b() {
    console.log('call b')
  }
}

const test55 = () => {
  var b = undefined // 由 function b() {} 引起的变量声明
  b = function () {
    console.log('call b')
  }
  b()
  console.log(b)
  b = 'Hello world'
}

const test6 = () => {
  b() // b is not a function，报错
  console.log(b) // 不会执行到这一步
  var b = 'Hello world'
  var b = function () {
    console.log('call b')
  }
}

const test66 = () => {
  var b = undefined // 由 var b = function() {} 引起的变量声明
  b() // b is not a function， 报错
  console.log(b) // 不会执行到这一步
  b = 'Hello world'
  b = function () {
    console.log('call b')
  }
}


const __main = () => {
  test1()
  test11()
  test2()
  test22()
  test3()
  test33()
  test4()
  test44()
  test5()
  test55()
  // test6()
  // test66()
}

__main()