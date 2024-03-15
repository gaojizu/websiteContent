<!--
 * @use: 
 * @description: 
 * @SpecialInstructions: 无
 * @Author: clearlove
 * @Date: 2024-03-15 09:40:48
 * @FilePath: /websiteContent/src/view/articleRecords/MD/setAndMap.md
-->
#### 写在前面
> 今天写一下关于面试中反反复复被问到的一个知识点，map和set的数据结构，文章内容会很短，方便大家快速查看，废话不说，直接讲

#### Map
> Map其实严格意义上应该叫做字典型数据结构，他的数据是键值对的形式存在，每一个key都是唯一的,后面新添加的key会将前面相同的key覆盖掉，下面看代码

##### map 的基本语法
> set()、get()、size、has()、delete()、clear()
```js
// 声明一个map结构的变量
let m = new Map()
console.log(m) //Map(0) {}
//Map的set方法
m.set('name', 'jim')
m.set('name', 'mary')
console.log(m) //Map(1) { 'name' => 'mary' }
//map 的get方法
console.log(m.get('name')) //mary
//map的size属性
console.log(m.size) //1
m.set('age', 20)
console.log(m) //Map(2) { 'name' => 'mary', 'age' => 20 }
console.log(m.size) //2
//map的has方法
console.log(m.has('age')) //true 
console.log(m.has(20)) //false 
// map的delete方法
m.delete('name')
console.log(m.size) //1 
console.log(m.has('name')) // false
// map的clear方法
m.clear()
console.log(m)  //Map(0) {}
```
##### map遍历方式
> keys()、values、entries、forEach()
```js
// 遍历map数据，map本身提供了三种遍历器生成函数和以一个遍历方法
let map = new Map()
map.set('name', "jim")
map.set('age', 20)
map.set('sex', "男")
map.set('addr', "beijing")
// keys
for (let i of map.keys()) {
    console.log(i) // name age sex addr
}
// values
for (let i of map.values()) {
    console.log(i) //jim  20 男 beijing
}
//entries
for (let i of map.entries()) {
    console.log(i)
    /**
        [ 'name', 'jim' ]
        [ 'age', 20 ]
        [ 'sex', '男' ]
        [ 'addr', 'beijing' ]
     */
}

for (let [k, v] of map) {
    console.log(k, v)
    /**
        name jim
        age 20
        sex 男
        addr beijing
    */
}
// forEach
map.forEach((v, k, arr) => {
    console.log(v) //jim 20 男 beijing
    console.log(k) // name age sex addr 
    console.log(arr)
    /**
     Map(4) {
            'name' => 'jim',
            'age' => 20,
            'sex' => '男',
            'addr' => 'beijing'
            }
     */
})
```

#### set
> Set 也是一种不可以存放重复值的类数组，严格意义上应该叫做集合，因为他是一个无序不重复的对象，可以使用展开运算符进行操作，也可以直接对数组进行去重等操作
##### set的基本语法
> add()、delete、has()、clear()
```js
// 和map一样，set本身也是一种构造函数，用来生成set的数据结构
let set = new Set()
// // add()
set.add('jim').add(1).add(false)
console.log(set) //Set(3) { 'jim', 1, false 
console.log(set.size) //3
// delete()
set.delete('jim')
console.log(set)  //Set(2) { 1, false }
// has()
console.log(set.has(1)) //true 
// clear()
set.clear()
console.log(set) //Set(0) {}
```
##### set遍历
> keys、 values、entries、forEach()
```js
for (let i of set.keys()) {
    console.log(i) // jim 1 false
}
//values
for (let i of set.values()) {
    console.log(i) // jim 1 false
}
//entries
for (let i of set.entries()) {
    console.log(i) 
    /**
    [ 'jim', 'jim' ]
    [ 1, 1 ]
    [ false, false ]
     */
}
//forEach
set.forEach((k, v) => {
    console.log(k, v)
    /**
    jim jim
    1 1
    false false
     */
})
```
##### set对数组进行去重
```js
// 方法一
let arr = [2, 3, 4, 5, 6, 5, 4, 3, 2, 2, 5, 6, 7, 8, 8]
let resSet = new Set(arr)
let finArr = Array.from(resSet)
console.log(finArr) //[ 2, 3, 4, 5,6, 7, 8]
// 方法二 
let kzSet = [...new Set(arr)]
console.log(kzSet) //[ 2, 3, 4, 5,6, 7, 8]

```
#### weakset 和 weakmap
> 这两个东西其实是set和map的阉割版，也就是它具备一些特性但是同时删除了set和map本身的可以操作的一些api和方法，同时他也有自己的一些限制，比如参数只能是引用数据类型
##### weakset
```js
let a = [[12],[23]]
let ws = new WeakSet(a)
// console.log(ws)
let obj = {name : 'jim'}
let obj2 = {age : 20}
let wso = new WeakSet([obj,obj2])
// console.log(wso)
// 外部的引用消失的话，内部的引用也会自动消失
```
##### weakmap
```js
//weakMap 只接受对象作为键名 不接受别的数据类型 当然null也不接受，虽然null也是对象
let wm = new WeakMap()
let info = {name : 'jim'}
wm.set(info,'mary')
console.log(wm.get(info)) //mary
```
#### 总结
> 以上就是关于set和map的使用总结，总体来说不难，只是需要我们熟练的使用即可，因为是新特性所以开发的过程中使用的时候需要注意一些写法的兼容性
