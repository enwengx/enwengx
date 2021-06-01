1.computed,watch的区别？computed有缓存。
2.BFC，BFC Block formatting context:块级格式上下文
  形成独立的渲染区域
  内部元素的渲染不会影响到外界
  形成BFC常见的条件：浮动元素，绝对定位元素，块级元素overflow不是visible，flex元素，inline-block元素
3.路由懒加载
  Vue路由component里使用箭头函数动态import组件，在加载组件时去请求文件代码，而不是初始化的时候全部加载，component: import(/*webpackChunkName: 'list'*/ './list')
4.利用webpack的代码分割实现vue组件的动态加载：components:{list:()=>import(/*webpackChunkName: 'list'*/ './list')}
  另一种使用方式const asyncList = ()=>{
    component: import(/*webpackChunkName: 'list'*/ './list'),
    loading:--,
    error:,
    delay:200,
    timeout:500
  }
5.指令使用
  export default {
    inserted(el, bindings, vnode) {
        let btnPer = bindings.value;
        let boolean = vnode.context.$store.state.bindPer[btnPer];
        !boolean && el.parentNode.removeChild(el)
    }
  }
  <button v-has="add"></button>
  directives:{has}
6.typeOf可判断那些类型
7.css
  .overflow-eclipsis {
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    white-space: nowrap !important;
  }
8.loader 和 plugin 的区别是什么 
  loader，它是一个转换器，将A文件进行编译成B文件，比如：将A.less转换为A.css，单纯的文件转换过程。
  plugin是一个扩展器，它丰富了webpack本身，针对是loader结束后，webpack打包的整个过程，它并不直接操作文件，而是基于事件机制工作，会监听webpack打包过程中的某些节点，执行广泛的任务
9.v-if会调用addIfCondition方法，生成vnode的时候会忽略对应节点，render的时候就不会渲染；
  v-show会生成vnode，render的时候也会渲染成真实节点，只是在render过程中会在节点的属性中修改show属性值，也就是常说的display；
  v-html会先移除节点下的所有节点，调用html方法，通过addProp添加innerHTML属性，归根结底还是设置innerHTML为v-html的值
10. '10000000000'.replace( /\B(?=(?:\d{3})+$)/g, ',' ) '10000000000'.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  (?=pattern)为例，就是捕获以pattern结尾的内容xxx
  (?!pattern)为例，就是捕获不以pattern结尾的内容xxx
  (?<=pattern)xxx为例，就是捕获以pattern开头的内容xxx
  (?<!pattern)xxx为例，就是捕获不以pattern开头的内容xxx
11.利用set求两个数组的合集，交集和差集
12.在一个字符串数组中有红、黄、蓝三种颜色的球，且个数不相等、顺序不一致，请为该数组排序。使得排序后数组中球的顺序为:黄、红、蓝。
  例如：红蓝蓝黄红黄蓝红红黄红，排序后为：黄黄黄红红红红红蓝蓝蓝。
13.求两个日期中间的有效日期 如 2015-2-8 到 2015-3-3
