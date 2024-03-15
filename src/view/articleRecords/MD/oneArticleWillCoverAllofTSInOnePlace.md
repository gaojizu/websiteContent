#### 写在前面

> 网上很多写ts的教程的，但是我觉得写的太繁琐了，这里我直接将基础用法写上，包括编译后的js代码，以便于你们进行对比， 我尽量不废话的将ts一篇文章写完！包括一些常见的报错信息，你们可以对比一下报错信息，我尽量不废话的将ts一篇文章写完！

#### 解释一下：

> ts全称typeScript，（别名 anyScript）是js的一个超集，你可以理解为js有的他都有，js没有的，他也有，后面会具体说到，js是一种非强类型语言，ts就相当于将js强制类型，这样做的好处就是编译期间就可以发现类型错误，他可以通过类型进行静态类型检查，最大程度的避免代码中出现的一系列类型错误，当然还是一样，你学我建议，不用也可以，开讲

##### 基本（原始）类型定义

```ts
const str: string = "tom"
const bol: boolean = true
const num: number = 123
const und: undefined = undefined
const nul: null = null

编译为js结果：

"use strict";
const str = "tom";
const bol = true;
const num = 123;
const und = undefined;
const nul = null;
```

- 一旦做了类型限制，后面是不可以进行非该类型赋值的，比如(其他同理)：

###### 下面是一个错误示例 ⚠️

```ts
let stre: string = "stre"
stre = "123  // Error:Unterminated string literal.
```

##### 数组类型定义

```ts
let numArr: number[] = [1,2,3]
let strArr: string[] = ['1','1','2']
let bolArr: boolean[] = [true,false]

编译为js结果：

"use strict";
let numArr = [1, 2, 3];
let strArr = ['1', '1', '2'];
let bolArr = [true, false];

```

- 一旦类型做了限制，数组里面不可以进行非该类型的赋值，比如（其他同理）：

###### 下面是一个错误示例 ⚠️

```ts
let numArr: number[] = [1,2,3,"jim"] // Error  Type 'string' is not assignable to type 'number'.
numArr.push("tom") // Error Argument of type 'string' is not assignable to parameter of type 'number'.
```



##### 元组定义

> 如果想在数组里面进行定义不同的类型，可以使用元组，元组在js中本身是不存在的，ts中存在的一种数据类型

```ts
let tuple: [number,string,boolean,null] = [1,"tom",true,null]

编译为js结果：

"use strict";
let tuple = [1, "tom", true, null];
```

- 元组虽然可以定义不同类型的数据放到数组里面，但是也是受到限制的，初始化必须按照数组的下标进行赋值，同时受到个数的限制，后续push等操作是不受到下标（位置）限制的，但是push受到类型本身的限制，不受到个数的限制，比如：

###### 下面是一个错误示例 ⚠️

```ts
tuple.push(undefined) // Error Argument of type 'undefined' is not assignable to parameter of type 'string | number | boolean | null'.
```

##### 接口

> ts中的接口是用于限制对象的，他规定了对象的key和类型的最初的样子（属性【属性的类型】和方法【参数的类型和返回值的类型】的样子），接口本身是不参与运行的，他在编译期间起限制和静态类型检查的作用，你也可以理解为编译结束，接口本身就已经没有用了(因为接口是Interface[Java中的定义],所以一般定义的时候都是大写I开头)

```ts
interface Iobj  {
   brand : string,
   num : number
}

let obj: Iobj = {
    brand: "吉利",
    num: 18
}

编译为js结果：

"use strict";
let obj = {
    brand: "吉利",
    num: 18
};
```

> 这里如果一个对象很多人用，但是数量不确定的话，可以将不确定的属性定义为一个可选属性

```ts
interface Iobj  {
   brand : string,
   num? : number // 此时的num就是一个可选属性
}

let obj: Iobj = {
    brand: "吉利",
}

编译为js结果：

"use strict";
let obj = {
    brand: "吉利",
};
```

> 如果对象中有一些你不希望被人改动的属性，你可以将该属性设置为只读属性，后续改动就会报错

```ts
interface Iobj  {
   readonly id: 0, // 此时的Id是一个只读属性
   brand : string,
   num? : number
}

let obj: Iobj = {
    id : 0,
    brand: "吉利",
}

编译为js结果：

"use strict";
let obj = {
    id: 0,
    brand: "吉利",
};
```

- 接口限制之后对象是不可以添加或者赋值非该类型的数据,包括数量也会被限制，如下：

###### 下面是一个错误示例 ⚠️

```ts
let obj: Iobj = {
    brand: "吉利",
    num: 18,
    age : 18,
} 
// Error Object literal may only specify known properties, and 'age' does not exist in type 'Iobj'.

let obj: Iobj = {
    brand: "吉利",
    num: "18",
} 
// Error Type 'string' is not assignable to type 'number'.

let obj: Iobj = {
    brand: "吉利",
}
// Error Property 'num' is missing in type '{ brand: string; }' but required in type 'Iobj'.

obj.id = 1 // Error Cannot assign to 'id' because it is a read-only property.

let obj: Iobj = {
    id : 1,
    brand: "吉利",
}
// Error Type '1' is not assignable to type '0'.
```

##### 函数类型限制

```ts
/**
 * (x:string,y: number) 两个入参  第一个是string类型， 第二个是number类型 z?: boolean 是一个可选参数 
 * string 返回值是string类型
 */
function func(x:string,y: number , z?: boolean) : string {
    return (x + y)
}
func("3",4)

编译为js结果

"use strict";
function func(x, y, z) {
    return (x + y);
}
func("3", 4);
```

- 这样参数和返回值都受到对应的类型限制，比如下面的例子：

###### 下面是错误的示例 ⚠️

```ts
func(2,4) // Error Argument of type 'number' is not assignable to parameter of type 'string'.

func(4) // Error Expected 2 arguments, but got 1.

function func(x:string,y: number) : string {
    return Boolean(x + y) // Error Type 'boolean' is not assignable to type 'string'.
}
```

##### 使用接口对函数进行类型限制

```ts
interface Ifunc {
    (x: string,y: number,z?: boolean):string
}

let toFcun: Ifunc;
toFcun = function(x,y){
    return x + y
}
toFcun("5",8)

编译为js结果

"use strict";
let toFcun;
toFcun = function (x, y) {
    return x + y;
};
toFcun("5", 8);

```

- 错误示例如上

##### 联合类型 （这不是一种类型，而是一个变量需要多种类型的时候，可以使用｜进行分割）

```ts
let cls : number | string = "tom"
cls = 5

编译为js结果

"use strict";
let cls = "tom";
cls = 5;
```

- 不在联合类型中的不可以定义

###### 下面的是错误示例 ⚠️

```ts
cls = true // Error : Type 'boolean' is not assignable to type 'string | number'.
```

##### 类型断言 (当我不知道这个变量是什么类型，但是我希望他作为一个我预期的类型进行处理的时候，可以使用断言)

```ts
function func(params: string | number){
    params.toString;
    params.valueOf;
    const str = params as string // 当我直接使用params.length 的时候  不存在这个属性，但是我可以将他作为一个string进行处理 从而获得我希望的到的属性
    str.length
}

编译为js 结果

"use strict";
function func(params) {
    params.toString;
    params.valueOf;
    const str = params;
    str.length;
}

```

###### 下面是一个错误的示例 ⚠️

```ts
function func(params: string | number){
    params.toString;
    params.valueOf;
    params.length
}
// Error Property 'length' does not exist on type 'string | number'. Property 'length' does not exist on type 'number'.

// 注意⚠️ 虽然可以使用断言进行类型的强制使用，但是也需要符合联合类型的限制
function func(params: string | number){
    params.toString;
    params.valueOf;
    const str = params as Boolean
}
// Error Conversion of type 'string | number' to type 'Boolean' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.Type 'number' is not comparable to type 'Boolean'.
```

##### 泛型 <T> 

> 又叫做动态类型，当我不确定我的函数入参类型的时候，可以使用一个广泛的类型，简称泛型，在使用函数的时候决定该入参的类型

```ts
function genericity<T>(params: T): T{
    return params
}
genericity("8") // 此时的T 就是string
genericity(8)   // 此时的T 就是number 
genericity(true) //此时的T 就是boolean

// 这里的T可以理解为Type的简写，不强制，约定的写法，你可以写任意值

编译为js结果

"use strict";
function genericity(params) {
    return params;
}
genericity("8");
genericity(8);
genericity(true);
```

##### 泛型示例2

```ts
/**
 * <S,N> 两个参数，我都不确定类型 使用s和n 是为了我为了演示效果使用的string 和number
 * (params:[S,N]) 入参 是一个数组，数组有两个值，和我前面的泛型保持一致
 * [N,S] 函数返回的值 是类型转换之后一个结果 数组第一位是string 返回的第二位就是string 第二个同理
 */
function changePlaces<S,N>(params:[S,N]): [N,S]{
    return [params[1],params[0]] // 此时的0 和1 的位置就是固定的，因为N无法赋值给S，S也无法赋值给N
}

changePlaces(["tom",0])

编译为js结果

function changePlaces(params) {
    return [params[1], params[0]];
}
changePlaces(["tom", 0]);
```

###### 下面是一个错误的示例 ⚠️

```ts
function changePlaces<S,N>(params:[S,N]): [N,S]{
    return [params[0],params[1]]
}
// Error Type 'S' is not assignable to type 'N'.'N' could be instantiated with an arbitrary type which could be unrelated to 'S'.
// Error Type 'N' is not assignable to type 'S'.'S' could be instantiated with an arbitrary type which could be unrelated to 'N'.
```

##### 使用接口做泛型约束

> 动态类型虽然是根据实际调用的时候进行类型判断的，但是也是可以对泛型做一定约束的

```ts
function constc<T>(params: T): boolean{
    return Boolean(params) 
}

编译为js结果

function constc(params) {
    return Boolean(params);
}
```

- 此时的返回值是boolean类型，那么想要访问一个params.valueOf 属性显然是不现实的，这个时候可以使用继承接口属性的方式实现

```ts
interface IConstraint {
    length: number,
    name : string
}
/**
 * <T extends IConstraint> T泛型 继承了接口IConstraint 的类型限制，拥有了length 的属性
 */
function constraint<T extends IConstraint>(params: T): boolean{
    return Boolean(params.length)  
}

// 用法
const validObject: IConstraint = { length: 1,name:"jim" };
constraint(validObject);

编译为js结果

"use strict";
/**
 * <T extends IConstraint> T泛型 继承了接口IConstraint 的类型限制，拥有了length 的属性
 */
function constraint(params) {
    return Boolean(params.length);
}
const validObject = { length: 1, name: "jim" };
constraint(validObject);
```

###### 下面是一个错误示例 ⚠️

```ts
function constc<T>(params: T): boolean{
    return params
}
// Error Type 'T' is not assignable to type 'boolean'.
```



#### 个人建议

> ts是一种可用可不用的技术，他的弊端是开发成本升高，入门比较难受，难度不大，但是写起来较为恶心，因为所有的类型都需要进行限制，当然也有很多人是喜欢使用any的，经常使用any的话，直接使用js比较好，优势是后期的运行的稳定，报错的可能性大大的降低，因为在编译阶段就已经将类型校验过了，js中很多的错误都是来源类型不对导致的，我的建议是学习还是要学习的，但是自己的项目可以不用，使用自己熟悉的技术栈即可，但是如果不学习的话，难免会接手别人的ts项目，到时候会比较麻烦，毕竟很多开源的框架都是ts实现的，最新的vue3也是针对ts做了很多的优化，这个看个人，和我前面说的tailwindcss的建议是一样的，你学可以，不学也不会对你的开发造成实质性的影响！