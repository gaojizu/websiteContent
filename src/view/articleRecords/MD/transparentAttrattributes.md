Vue3-透传Attrsbutes

透传是vue中一种特性，官方的解释是：“透传 attribute”指的是传递给一个组件，却没有被该组件声明为 [props](https://cn.vuejs.org/guide/components/props.html) 或 [emits](https://cn.vuejs.org/guide/components/events.html#defining-custom-events) 的 attribute 或者 `v-on` 事件监听器。最常见的例子就是 `class`、`style` 和 `id`。这句话解释过来就是一些不被prop定义的属性直接添加到子组件上的时候，子组件是可以获取到的，只不过获取的方式是通过方法获取的，下面我们展开说一下

几个特性：

- 透传的属性只会直接传给单根节点的组件，如果子组件不是一个根节点，那么透传属性会直接失效，并且警告
- 子节点如果不是单根节点的时候，可以通过添加*v-bind="$attrs"* 的属性进行某一个dom元素的透传
- 透传过去的属性如果和子组件上的命名重复了，会以子组件本身的属性为主
- 透传过去的属性如果和子组件上的属性重复了，会直接添加到属性值的后面
- 透传的子组件里面如果只有一个根节点，这个根节点是另一个组件的时候，透传的属性会直接传递给他本身的子组件
- 透传过去的属性ID获取需要在dom节点加载结束进行，否则是获取不到的

以上特性我们挨个说一下

##### 透传的属性只会直接传给单根节点的组件

###### 子组件attrs

```vue
<!-- attrs -->
<template>
<!-- 只有button这一个节点 -->
  <button class="self-font">Attr</button>
</template>
<style scoped>
button {
  padding: 10px 20px;
}
.self-btn {
  background: green;
  color: #fff;
}
.self-font {
  font-size: 30px;
  background: rebeccapurple;
}
</style>
```

###### 父组件

```vue
<script setup>
import attrs from "./components/attrs.vue";
</script>

<template>
  <div>
    <attrs class="self-btn" id=""></attrs>
  </div>
</template>
```

![image-20230131095524417](/src/view/articleRecords/MD/images/trasnparentAttrattributes/image-20230131093633798.png)
这个时候效果是没问题的，但是如果我们给子组件添加一个节点

```vue
<template>
  <button class="self-font">Attr</button>
  <button class="self-font">Attr</button>
</template>
```

![image-20230131093748212](/src/view/articleRecords/MD/images/trasnparentAttrattributes/image-20230131093748212.png)

这个时候self-btn的样式并没有传递出去，因为和这个时候他并不知道要传递给哪一个dom元素，同时会曝这样一条警告

![image-20230131093916805](/src/view/articleRecords/MD/images/trasnparentAttrattributes/image-20230131093916805.png)

##### 子节点如果不是单根节点的时候，可以通过添加*v-bind="$attrs"* 的属性进行某一个dom元素的透传

这个时候我们给其中一个添加上v-bind="$attrs"属性

```vue
<template>
  <button class="self-font">Attr</button>
  <button v-bind="$attrs" class="self-font">Attr</button>
</template>
```

![image-20230131094054198](/src/view/articleRecords/MD/images/trasnparentAttrattributes/image-20230131094054198.png)

此时的警告也没有了，通过这样的方式我们可以进行自己决定透传给哪一个dom元素

##### 透传过去的属性如果和子组件上的命名重复了，会以子组件本身的属性为主

##### 透传过去的属性如果和子组件上的属性重复了，会直接添加到属性值的后面

这两个通过上面的例子相信你们已经看出来了，这里就不做演示了

##### 透传的子组件里面如果只有一个根节点，这个根节点是另一个组件的时候，透传的属性会直接传递给他本身的子组件

我们在子组件中再引入另一个组件进行尝试 : deepAttrs

```vue
<!-- deepAttrs组件 -->
<template>
  <button>deepBtn</button>
</template>
<script setup>
import {useAttrs} from "vue"
const attrs = useAttrs()
console.log("deepAttrs",attrs)
</script>
<style>
</style>
```

```vue
  <!-- 子组件attrs -->
<template>
  <deepAttrs></deepAttrs>
</template>
<script setup>
import deepAttrs from  "./deepAttrs.vue"
</script>
```

![image-20230131094616613](/src/view/articleRecords/MD/images/trasnparentAttrattributes/image-20230131094616613.png)

##### 透传过去的属性ID获取需要在dom节点加载结束进行，否则是获取不到的

既然可以透传属性，那么我们传递过去的ref和id理论上也是可以直接被获取到的，代码尝试一下

```vue
 <!-- attrs 子组件 -->
<template>
  <button class="self-font" ref="eleId">Attr</button>
</template>
<script setup>
import deepAttrs from  "./deepAttrs.vue"
import {onMounted, ref, useAttrs} from "vue"
const eleId = ref(null)
onMounted(()=>{
  console.log(eleId.value) 
  console.log(document.getElementById("btn"))
})
</script>
```

```vue
<!-- 父组件 -->
<template>
  <div>
    <attrs class="self-btn" id="btn"></attrs>
  </div>
</template>
```

![image-20230131095002289](/src/view/articleRecords/MD/images/trasnparentAttrattributes/image-20230131095002289.png)

可以看到上面打印的结果是可以获取到的，但是如果是直接获取的话，dom元素是null，也就是直接获取的话，会因为dom加载顺序的问题导致获取不到最后的dom，这里需要注意一点

#### 可能存在的疑问

- 如果我子组件只有一个根节点，但是我不想被透传怎么办呢？

```vue
<script>
export default{
  inheritAttrs:false
}
</script>
<script setup>
  // ...
</script>
```

如上所示，我们给js模块部分添加 inheritAttrs:false即可，默认的值是true，设置为false的时候透传的属性久不存在了

- 我怎么在js中获取到透传的属性呢？

```vue
<script setup>
import {useAttrs} from "vue"
const attrs = useAttrs()
console.log("attrs",attrs)
</script>
```

![image-20230131095524417](/src/view/articleRecords/MD/images/trasnparentAttrattributes/image-20230131093633798.png)

使用useAttrs即可获取到对应的透传过来的属性

- 如果我不适用setup的语法糖进行呢？

```js
export default {
  setup(props, ctx) {
    // 透传 attribute 被暴露为 ctx.attrs
    console.log(ctx.attrs)
  }
}
```

这里直接使用官网的例子给解答