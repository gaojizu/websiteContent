<!--
 * @use: 
 * @description: 
 * @SpecialInstructions: 无
 * @Author: clearlove
 * @Date: 2024-03-15 09:50:33
 * @FilePath: /websiteContent/src/view/articleRecords/MD/jsTypeCheck.md
-->
@[toc]
### 写在前面

> 今天写一篇关于js数据类型校验的方法总结，js的数据类型校验一直是一个很基础的问题，但是很多人都搞的稀里糊涂的，面试的时候基本上也是多会问的，所以今天将js中数据类型的判断方法总结一下，具体项目开发过程中使用哪种可以根据实际情况进行处理！废话不多说，开始水文章，呸，开始总结....

```js
/*
 * @use: 实现检测数据类型不同的检测方法
 * @description: 
 *      + typeof
 *      + instanceof
 *      + construactor
 *      + Object.prototype.toString.call([value])
 * @SpecialInstructions: 无
 * @Author: clearlove
 * @Date: 2022-07-04 17:26:57
 * @LastEditTime: 2022-07-04 23:19:44
 * @FilePath: /vue/Users/leimingwei/Desktop/LeiMingWei/源码集/js相关/js数据类型判断.js
 */
```

#### 方式汇总

- **typeof**
- **instanceof**
- **constructor**
- **Object.prototype.toString.call()**

#####  typeof-简单介绍

>- typeof 可以用来检测基本数据类型 
>
>- typeof 也可以用来检测引用数据类型，但是不准确
>
>- typeof 检测基本数据类型的时候 null 被检测出来的是object（原因如下）
>
>- typeof 检测出来的数据类型都是小写的字符串  
>
>​            **原因是typeof检测机制是通过计算机二进制进行检测**
>
>​            **js 在底层存储变量的时候，会在变量的机器码的低位1-3位存储其类型信息：**
>
>​            **000：对象 010：浮点数 100：字符串 110：布尔 1：整数**
>
>​            **null的所有机器码均为0，所以typeof检测的时候也认为是对象了**

##### typeof-代码示例

```js
console.log(typeof NaN) //number
console.log(typeof null) //object
console.log(typeof undefined) //undefined
console.log(typeof 1) //number
console.log(typeof '') //string
console.log(typeof false) //boolean
console.log(typeof []) //object
console.log(typeof {}) //object
console.log(typeof function () { }) //function
console.log(typeof /^$/) //object
console.log(typeof Symbol()) //Symbol
```

##### instanceof-简单介绍

> - 可以用来检测引用（复杂）的数据类型
>
> - 不可以进行检测基本数据类型
>
> - 因为数据的原型链是可以被改变的，所以检测也是不准确的
>
> **检测机制是通过查找当前实例对象上的原型是不是存在在原型对象的，所以原型链一旦被改变，检测出来的是不准确的**

##### instanceof代码示例

```js
console.log(NaN instanceof Number) //false
console.log('' instanceof String) //false
console.log([] instanceof Array) //true
console.log({} instanceof Object) //true
console.log(/^$/ instanceof RegExp) //true
console.log(function () { } instanceof Function) //true
```

###### 弊端实现-改变实例原型的指向

```js
let arr = []
console.log(arr.__proto__) //[]
arr.__proto__ = Object.prototype
console.log(arr.__proto__) // {}
console.log(arr instanceof Array) //false
```

##### 自己实现一个instanceof-while的方式

```js
let customInstanceOf = (V, ANTETYPE) => {
    let newPrototype = ANTETYPE.prototype
    let protoV = Object.getPrototypeOf(V)  //V.__proto__ 这里为了兼容IE的浏览器
    while (true) {
        if (protoV === null) {
            return false
        }
        if (protoV === newPrototype) {
            return true
        }
        protoV = Object.getPrototypeOf(protoV)
    }
}
console.log(customInstanceOf({}, Array)) //false
```

##### 自己实现一个instanceof-递归的方式

```js
let dgInstanceOf = (V, P) => {
    let res = false
    let instanceP = P.prototype
    let protoV = Object.getPrototypeOf(V)
    if (protoV === null) {
        res = false
    } else {
        instanceP === protoV ?  res = true : dgInstanceOf(protoV, P)
    }
    return res
}
console.log(dgInstanceOf([], Array)) //true
```

##### constructor-简单介绍

> - 可以进行检测基本数据类型
> - 可以进行检测引用（复杂）的数据类型
> - 因为使用的是构造函数，那么检测不准确的可能性就比较大，因为函数的构造函数是可以改变的

##### contructor-代码示例

```js
let num = 1;
console.log(''.constructor === String) // true
console.log(NaN.constructor === Number) // true
console.log({}.constructor === Object) // true
console.log([].constructor === Array) // true
console.log(/^$/.constructor === RegExp) // true
console.log(num.constructor === Number) //true
console.log(false.constructor === Boolean) // true
```

###### 弊端实现-改变contructor的值

```js
let a = []
console.log(a.constructor === Array) //true
a.__proto__.constructor = {}
console.log(a.constructor === Array) //false
```

##### Object.prototype.toString.call()-简单介绍

> - 可以进行检测所有的数据
> - 缺点是写法比较复杂 检测出来的结果需要进行处理

##### Object.prototype.toString.call()-代码示例

```js
console.log(Object.prototype.toString.call('')) //[object String]
console.log(Object.prototype.toString.call({})) //[object Object]
console.log(Object.prototype.toString.call([])) //[object Array]
console.log(Object.prototype.toString.call(true)) //[object Boolean]
console.log(Object.prototype.toString.call(null)) //[object Null]
console.log(Object.prototype.toString.call(undefined)) //[object Undefined]
console.log(Object.prototype.toString.call(/^$/)) //[object RegExp]
console.log(Object.prototype.toString.call(function(){})) //[object Function]
console.log(Object.prototype.toString.call(1)) //[object Number]
console.log(Object.prototype.toString.call(NaN)) //[object Number]
console.log(Object.prototype.toString.call(new Date())) //[object Date]
```

#### 总结

> 以上就是我们经常使用的一些判断数据类型的方法，其实在日常的开发过程中我们使用的比较多的一个就是typeof的方法，虽然它不可以对复杂数据类型进行检测，但是基本数据类型还是可以的，所以一般是根据实际情况进行使用和组合使用的，而不是一味的使用最后一种看起来比较全面的方式，又水了一篇文章，拜了个白！