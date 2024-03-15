### 写在前面

> 今天说一下什么是IIFE函数，为什么说这个，几个原因，一个是想总结一下，第二个是面试的时候确实会问到，考验功底的时候到了，所以这里还是作为一种记录的方式给大家说一下！

#### 解释

- IIFE 是Immediately Invoked function expression的缩写，意思就是立即执行函数表达式
- 隐藏实现：系统看不到我们的函数，但是我们却可以用它实现逻辑功能

### 举例子

> js中有一个很有意思的点，在于如果你想声明一个函数，比如我们经常的做法如下：

```js
function _test() {
   console.log("我是一个js函数")
}
```

```js
let _test = function() {
   console.log("我是一个js函数")
}
```

> 以上是我们写代码的时候经常用到的创建函数的方式，但是如果我们想执行他的时候，就需要进行函数的调用，比如

```js
_test()
```

> 回到主题，IIFE函数其实就是一个自执行函数，代码如下：

```js
(function () {
    console.log("我是一个IIFE函数")
})()
```

> 解释一下这里为什么要使用一个小括号将函数包裹起来，原因很简单，被执行的函数需要是一个整体，就这么简单

### 优点1

> 看到这个经常写js的人会抬杠，我直接写console.log() 不行吗？费那劲，是的，但是假设我想页面上只用一个变量进行完成业务逻辑该怎么做呢？可能这里不是很明白，说人话就是我不想定义全局变量，但是我又想自执行一个函数怎么办？

#### 代码块1

```js
let a = 1
console.log(a++)
```

#### 代码块2

```js
(function () {
    let a = 1
	console.log(a++)
})()
```

> 问题在于上面两块代码有什么区别？根本的区别在于代码块1会造成变量的全局污染，而代码块2不会，这是第一个优势

### 优点2

#### 代码块3

```js
 (function () {
        let a = 1
        function add() {
            console.log(a++)
        }
        function count() {
            console.log("我是一个不被暴露出去的函数")
        }
        //向外暴露一个全局函数
        window.$ = function () {
            return {
                add: add
            }
        }
    })()
    $().add()
```

> 代码块3 他的优点在哪？假设我不想让页面或者是用这个js的人使用我的count函数，那么我完全可以将count函数进行隐藏，这种写法在哪里出现的比较多，jQuery的源码里面，我们可以选择性的将我们需要提供出去的全局函数暴露出去，不希望暴露的可以自己隐藏起来，这是第二个优点！所以说理论上来说，直接写func add 和func count都是可以的，全局的完全没问题，问题就在于我们就不好控制隐藏的一些函数！功能还可以实现掉，这个术语叫做**隐藏实现**
> 注：$ 是一个函数， 执行后返回的是一个对象
>