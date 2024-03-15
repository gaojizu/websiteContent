<!--
 * @use: 
 * @description: Proxy 基本方法使用介绍
 * @SpecialInstructions: 无
 * @Author: clearlove
 * @Date: 2024-03-15 09:45:53
 * @FilePath: /websiteContent/src/view/articleRecords/MD/proxyProd.md
-->
#### 写在前面

> 原本是准备写关于vue3的内容，但是发现vue3一个很大的改变就是关于数据响应式的原理实现上的区别，最新版本的实现原理是通过proxy进行代码的重新编写，那么如果proxy不进行一个基础知识总结的话，那么大概率看vue3的时候会很迷茫，所以这篇文章还是很有必要写的。

### 基础语法

```js
const p = new Proxy(target, handler)
```

> 总结：大概率是学习handler的方法使用

#### 开始学习

##### 常见方法

- handler.apply 

- > 方法用于拦截函数的调用

```js
//进行除法操作 aim:使用proxy进行拦截，处理不管谁大还是谁小，都用大的取余小的即可
let division = (x, y) => {
	return x / y
}
const filterDivision = {
	/**
	 * @function apply 拦截函数使用
	 * @param {Object} target 目标函数 必须是一个函数 
	 * @param {Object} arg 上下文
	 * @param {Object} paramsList 参数数组 
	 * @description 可以返回任意值
	 */
	apply: function(target, arg, paramsList) {
		let newX, newY
		newX = paramsList[0]
		newY = paramsList[1]
		return newX > newY ? newX % newY : newY % newX
	}
}

const fp = new Proxy(division, filterDivision)
console.log(division(4, 2)) // 2
console.log(fp(5, 3)) //2
```

- hanlder.construct

- > 用于拦截 [`new`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new) 操作符。为了使 new 操作符在生成的 Proxy 对象上生效，用于初始化代理的目标对象自身必须具有 [[Construct]] 内部方法（即 `new target` 必须是有效的）

```js
//对new进行拦截，因为new的时候，默认是执行contructor的，那么就可以直接进行拦截处理得到的参数
class Animal {
	constructor(name) {
		this.name = name
	}
}
const handlerClass = {
	/**
	 * @param {Object} target 目标函数或者是具有construct内部方法的
	 * @param {Object} args 参数值 传递进来的是数组，返回的一定是一个对象
	 */
	construct(target, args) {
		return new target(...args)
	}
}
let d = new Animal('mary')
console.log(d.name) // mary

const cp = new Proxy(Animal, handlerClass)
let arrParams = ['jim', 'kim', 'tom']
console.log(new cp(arrParams).name) //['jim', 'kim', 'tom']
```

- handler.deleteProperty

- > 用于拦截对对象属性的 [`delete`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/delete) 操作

```js
let targetObj = {
	name: 'jim',
	age: 20,
	height: '180cm'
}

const dp = new Proxy(targetObj, {
	/**
	 * @function deleteProperty 拦截对象的删除属性
	 * @param {Object} target //当前需要被拦截的对象
	 * @param {Object} prop 当前操作的属性
	 */
	deleteProperty: function(target, prop) {
		if (prop === 'height') {
			//设置该属性才可以真正意义的删除，否则仅仅是进行一个拦截处理，不进行真正的删除操作
			delete target[prop]
			return true
		} else {
			throw new TypeError('必要信息不可以被删除哦')
		}
	}
})
delete dp['height']
console.log(dp) //{ name: 'jim', age: 20 }
console.log(targetObj) //{ name: 'jim', age: 20 }
```

> 如果该对象被设置了不可以被删除的话，那么是不可以进行删除该属性的，比如：
>
> ```js
> Object.defineProperty(targetObj, 'height', {
> 	configurable: false
> });
> //TypeError: Cannot delete property 'height' of #<Object>
> ```
>
> 

- handler.get

- > 用于拦截对象的读取属性操作

```js
let TO = {
	name: 'jim',
	IdCard: '41272519940000000X',
	age: 18
}
const tp = new Proxy(TO, {
	/**
	 * @param {Object} target 目标对象
	 * @param {Object} prop 目标属性值
	 * @param {Object} receiver Proxy 或者继承 Proxy 的对象 目前暂且不知应用场景
	 */
	get: function(target, prop, receiver) {
		if (prop === 'IdCard') {
			throw new RangeError('敏感信息不可以被查看')
		} else {
			if (prop === 'name') {
				return target[prop] = 'mary'
			} else {
				return target[prop]
			}
		}
	}
})
console.log(tp.name) // mary
console.log(tp.IdCard) //RangeError: 敏感信息不可以被查看
console.log(tp.age) //18
```

- handler.getPrototypeofOf

- > 是一个代理（Proxy）方法，当读取代理对象的原型时，该方法就会被调用。

```js
const OneOb = {
	name: 'jim'
}
const TwoOb = {
	name: 'mary'
}
const gp = new Proxy(OneOb, {
	/**
	 * @param {Object} target 目标值
	 */
	getPrototypeOf: function(target) {
		return TwoOb
	}
})
console.log(Object.getPrototypeOf(gp) === TwoOb) //true
console.log(Object.getPrototypeOf(gp).name) // mary

//触发的方法 汇总
var obj = {};
var p = new Proxy(obj, {
	getPrototypeOf(target) {
		return Array.prototype;
	}
});
console.log(
	Object.getPrototypeOf(p) === Array.prototype, // true
	Reflect.getPrototypeOf(p) === Array.prototype, // true
	p.__proto__ === Array.prototype, // true
	Array.prototype.isPrototypeOf(p), // true
	p instanceof Array // true
);
```

- handler.has

- > 方法是针对 [`in`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/in) 操作符的代理方法

```js
const hasHandler = {
	/**
	 * @function has 针对in的操作
	 * @param {Object} target 目标值
	 * @param {Object} key //属性值
	 */
	has: function(target, key) {
		if (key === 'id') {
			throw new Error('敏感信息不可以进行操作')
		}
		return key in target
	}
}
const HO = {
	name: 'jim',
	age: 'tom',
	id: 412725
}
const HP = new Proxy(HO, hasHandler)
console.log('name' in HP) //true
console.log('age' in HP) //true
console.log('height' in HP) //false
console.log('id' in HP) //Error: 敏感信息不可以进行操作
```

> 替代方案：
>
> ```js
> let checkInUseObt = (key, target) => {
> 	if (key === 'id') {
> 		throw new Error('敏感信息不可以进行操作')
> 	}
> 	return Object.keys(target).includes(key)
> }
> 
> const HO = {
> 	name: 'jim',
> 	age: 'tom',
> 	id: 412725
> }
> 
> console.log(checkInUseObt('name', HO)) //true
> console.log(checkInUseObt('id', HO)) //Error: 敏感信息不可以进行操作
> ```

- handler.ownKeys

- > 方法用于拦截 [`Reflect.ownKeys()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/ownKeys)

```js
const monster1 = {
	_age: 111,
	[Symbol('secret')]: 'I am scared!',
	eyeCount: 4
};

//写法一
const handler1 = {
	ownKeys(target) {
		return Reflect.ownKeys(target);
	}
};
//等价于 写法二 写法不同，功能是一样的
const superHandler = {
	/**
	 * @function ownKeys 获取自身属性，包括Symbol属性的值
	 * @param {Object} target 目标对象
	 */
	ownKeys(target) {
		return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target))
	}
}
const proxy1 = new Proxy(monster1, superHandler);
let keyLists = Object.getOwnPropertyNames(proxy1).concat(Object.getOwnPropertySymbols(proxy1))
for (const key of keyLists) {
	console.log(proxy1[key])
	//111
	// 4
	// I am scared!
}
//Object.keys(proxy1) 这里直接使用的话，会自动将Symbol修饰的字段过滤掉
for (const key of Object.keys(proxy1)) {
	console.log(key);
	// expected output: "_age"
	// expected output: "eyeCount"
}
```

- handler.set

- > 方法是设置属性值操作的捕获器

```js
const MO = {
	age: 20
};

const handler1 = {
	/**
	 * @param {Object} obj 目标对象
	 * @param {Object} prop 属性名
	 * @param {Object} value  值
	 * @receiver 这个参数暂且没有搞明白
	 */
	set(obj, prop, value) {
		if ((prop === 'age') && (value < 0 && value > 140)) {
			throw new Error('数据格式必须是合法的')
		} else {
			return Reflect.set(...arguments);
		}
	}
};

const MP = new Proxy(MO, handler1);

MP.age = -2; //Error: 数据格式必须是合法的
console.log(MP.age); 
MP.age = 18
console.log(MP.age);  // 18
```

#### 写到后面

> 其实这里还有几个方法没有进行描述，原因是我自己想了一下也没有办法很好演示给你们看，我自己也是一知半解的，所以就不误人子弟了，后续我搞明白了之后会继续更新的！