1.computed,watch的区别？computed有缓存。
2.BFC，BFC Block formatting context:块级格式上下文
  形成独立的渲染区域
  内部元素的渲染不会影响到外界
  形成BFC常见的条件：浮动元素，绝对定位元素，块级元素overflow不是visible，flex元素，inline-block元素
3.路由懒加载
  Vue路由component里使用箭头函数动态import组件，在加载组件时去请求文件代码，而不是初始化的时候全部加载
4.利用webpack的代码分割实现vue组件的动态加载：components:list:()=>import(/*webpackChunkName: 'list'*/ './list')
