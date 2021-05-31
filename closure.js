var foo = function(...args) { // 要求实现函数体}
var f1 = foo(1,2,3); f1.getValue(); // 6 输出是参数的和
var f2 = foo(1)(2,3); f2.getValue(); // 6
var f3 = foo(1)(2)(3)(4); f3.getValue(); // 10
  

  

  
  
  
  
  
  
  
  
  
  
  
  
  
  
function foo(...args) {
  const target = (...args1)=> foo(...args,...args1)
  target.getValue = ()=> args.reduce((a,b)=> a + b, 0)
  return target
}
