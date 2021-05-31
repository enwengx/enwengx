var foo = function(...args) { // 要求实现函数体}
var f1 = foo(1,2,3); f1.getValue(); // 6 输出是参数的和
var f2 = foo(1)(2,3); f2.getValue(); // 6
var f3 = foo(1)(2)(3)(4); f3.getValue(); // 10
  
/**
 * 输出以下代码运行结果，为什么？如果希望每隔 1s 输出一个结果，应该如何改造？注意不可改动 square 方法
 */
const list = [1, 2, 3]
const square = num => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(num * num)
    }, 1000)
  })
}

function test() {
  list.forEach(async x=> {
    const res = await square(x)
    console.log(res, Date.now())
  })
}
test()
  

  

  
  
  
  
  
  
  
  
  
  
  
  
  
  
function foo(...args) {
  const target = (...args1)=> foo(...args,...args1)
  target.getValue = ()=> args.reduce((a,b)=> a + b, 0)
  return target
}
  
//async function
for(let x of list) {
    const res = await square(x);
    console.log(res,Date.now())
}
