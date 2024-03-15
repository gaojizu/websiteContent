
#### 写在前面

> 今天讲一下关于vue组件传值里面的其中一个跨组件传值，之前文章写过一篇关于组件传值，里面也有提过关于这块跨组件传值的方式，其中就提到了provide 和 inject的方式，但是并没有展开说，今天就简单的展开说一下，他的取值问题

#### 讲解思路

> 今天的思路是，我会写一个demo，里面包含了三个组件，组件之间的关系是层级嵌套，比如一级引入二级，二级引入三级，类似这样的，我们今天是为了说明白一个问题，就是当一个最底层组件使用inject的时候，他的数据源是来自哪一个上级

#### demo

###### app.vue

```vue
<template>
	<LevelOne></LevelOne>
</template>

<script setup>
  import LevelOne from './components/children/LevelOne.vue'	
  import { provide } from 'vue'
  provide('content','我是app里面的数据')
</script>
```

###### 一级组件

```vue
<template>
	<LevelTwo></LevelTwo>
</template>

<script setup>
	import { provide } from 'vue'
	import LevelTwo from './LevelTwo.vue'
	provide('content','我是一级组件的值')
</script>
```

##### 二级组件

```vue
<template>
	<LevelThree></LevelThree>
</template>

<script setup>
	import { provide } from 'vue'
	import LevelThree from './LevelThree.vue'
	provide('content', '我是二级组件的值')
</script>

```

##### 三级组件

```vue
<template>
	<div>我是三级组件,我获取的内容是：{{content}}</div>
</template>

<script setup>
	import { ref,inject } from 'vue'
	const content = ref()
	content.value = inject('content')
</script>
```

##### 输出结果

```js
我是三级组件,我获取的内容是：我是二级组件的值
```

如果我直接将二级组件里面的提供者去掉：

```vue
<template>
	<LevelThree></LevelThree>
</template>

<script setup>
	import LevelThree from './LevelThree.vue'
</script>
```

##### 输出结果

```js
我是三级组件,我获取的内容是：我是一级组件的值
```

#### 结论

> 由上面的例子我们可以看出了，当底层组件的上级有很多同样的提供者的时候，他的原则是就近获取，今天的目的也是为了说明这个问题，因为之前那篇文章只是说了一下vue 提供了这个方法，但是并没有展开说他的使用规则。

