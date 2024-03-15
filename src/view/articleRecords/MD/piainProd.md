<!--
 * @use: 
 * @description: pinia基本使用介绍
 * @SpecialInstructions: 无
 * @Author: clearlove
 * @Date: 2024-03-15 09:42:44
 * @FilePath: /websiteContent/src/view/articleRecords/MD/piainProd.md
-->
#### 写在前面
> 之前我们一直使用的状态管理都是vuex或者是基本的provide和inject，因为技术在更新，所以，一些人就闲不住，就开始倒腾新技术了，不然卷不动了啊，怎么拉开与别人的差距呢？那么今天的技术知识点就是我们今天要说的pinia，新一代全局状态管理,

#### pinia是什么

> pinia直接理解为vuex的新版本也不能说是错的，但是他又是一个全新的知识点，所以如果非要说他是什么，他就是一个新版的全局状态管理方案，所谓的全局状态的管理就是一个项目中在不同的组件中可以同时同步某一个数据的过程。我说他是一个vuex5的版本其实不算错，毕竟官网有结合了 Vuex 5 核心团队讨论中的许多想法这样一句话。

#### 相比之前的解决方案优势是什么

> 之前的解决方案还是比较多的，
>
> - 缓存处理方案
>
> 比如开始的时候我们可以使用缓存进行同步数据，虽然很low但是它确实属于一种方案，但是这种方案的实时性很差，也就是很难做到信息的及时同步，虽然你可以写很多监听来达到一个同步的效果，但是代码维护起来就会很笨重
>
> - provide/inject 
>
> > 这种方案是可以解决缓存解决不了的问题，但是他只适应于小项目，因为他不太容易模块化进行处理数据，如果所有的数据都挂载到根结点上，那么后期的代码会很臃肿，无法模块化处理就意味着他很难适用大项目，不过项目我还是推荐使用的。
>
> - vuex
>
> > 这个就是神一样的存在的解决方案，上面的痛点都没有，但是有一个比较大的缺点就是他的解决方案很完美，不过小项目中使用会显的很笨重，同时它提供的mutation和action其实都可以处理数据，但是偏偏将同步和异步分开了，我个人一直觉得mutation完全没有必要存在，所以他在大型项目中可以进行模块化的管理，小项目中使用略显笨重，这个一般都是根据实际情况进行使用
>
> - pinia
>
> > 所有的新技术出来都是为了解决之前的痛点，pinia的优势就是我上面说的三种的劣势他都完美的解决了，所以我们还是很有必要学习一下的，具体罗列一下有点吧：
> >
> > - 小巧 压缩之后才1KB
> > - 完美支持Ts （虽然我不太喜欢）
> > - 支持插件扩展自身功能
> > - 抛弃了mutation的使用，直接一个action搞定（早就该这样了）
> > - 支持服务端渲染 (虽然我不咋用)
> > - 无需创建各个模块嵌套，它本身的store就是独立的
> > - 还支持vue2的版本
> > - 在不重新加载页面的情况下修改您的 Store 在开发时保持任何现有状态（这个就很牛逼了，之前这个不实现的时候开发过程很痛苦）
> > - ......

> 我这个人其实不怎么喜欢接触新的东西，我觉得旧的可以用的话，将旧的用到极致也很不错，一只使用新的，不见得是一件好事，不过这样显的我很不好学一样，不说了，我们开始学习。

#### 使用pinia

> [官网](https://pinia.web3doc.top/)
>
> - 安装
>
> ```js
> yarn add pinia
> ```
>
> - 挂载全局到main.js
>
> ```js
> import { createApp } from 'vue'
> import './style.css'
> import App from './App.vue'
> import { createPinia } from 'pinia'
> const pinia = createPinia()
> const app = createApp(App)
> app.use(pinia)
> app.mount('#app')
> ```
>
> - 创建store
>
> > pinia提供了defineStore()方法进行创建sotre，这个store就和vuex中的一样，用来存储我们需要全局管理的一些数据
>
> ```js
> import { defineStore } from 'pinia'
> export const useUserStore = defineStore('main', {})
> ```
>
> - 引入使用
>
> ```js
> import { useUserStore } from "./store/user";
> const useStore = useUserStore();
> console.log(useStore); //Proxy {$id: 'main', $onAction: ƒ, $patch: ƒ, $reset: ƒ, $subscribe: ƒ, …}
> ```
>
> - 数据存储state
>
> ```js
> // state是一个函数，返回是一个对象
> import { defineStore } from 'pinia'
> export const useUserStore = defineStore('main', {
>     state: () => {
>         return {
>             loginName: 'Kim',
>             loginTime: new Date(),
>             age : 18
>         }
>     }
> })
> ```
>
> - 获取数据
>
> ```js
> <script setup>
>   import { ref } from "vue";
>   import { useUserStore } from "./store/user";
>   const useStore = useUserStore();
>   console.log(useStore); //Proxy {$id: 'main', $onAction: ƒ, $patch: ƒ, $reset: ƒ, $subscribe: ƒ, …}
>   const loginName = useStore.loginName;
>   const age = useStore.age;
>   const age = ref(useStore.age);
> </script>
> ```
>
> ```html
>  <h4>{{ loginName }}</h4>
>  <h4>{{ loginTime }}</h4>
>  <h4>{{ age }}</h4>
> <!-- 当然你可以直接将store里面的数据获取出来，不用解构也是可以的,默认的就是带有响应式的 -->
>  <h4>{{ useStore.loginName }}</h4>
>  <h4>{{ useStore.loginTime }}</h4>
>  <h4>{{ useStore.age }}</h4>
> ```
>
> - 修改数据
>
> ```js
> <button @click="changeStoreValue">更新store的value</button>
> const changeStoreValue = () => {
>   console.log("passing");
>   useStore.loginName = "Jim";
>   useStore.loginTime = "890";
> };
> ```
>
> > 这个时候会发现数据并没有变化，这是因为我们没有使用pinia提供的支持数据响应式的方法，所以我们需要这样进行取值
> >
> > ```js
> > import { storeToRefs } from "pinia";
> > const { loginName, age } = storeToRefs(useStore);
> > ```
> >
> > 这个时候会发现，数据就发生了变化，这里会发现，如果我们使用vue3自己提供的ref将变量改为响应式的话，是不是可以呢？自己可以试试，是不行的。
>
> - 批量更改store的值
>
> ```js
> <button @click="patchStoreValue">批量更改store的value</button>
> //批量更改store的值
> const patchStoreValue = () => {
>   useStore.$patch({
>     loginName: "mary",
>     age: 20,
>   });
> };
> ```
>
> - 重置store
>
> ```js
> <button @click="resetStoreVla">重置store</button>
> //重置store
> const resetStoreVla = () => {
>   useStore.$reset();
> };
> ```
>
> - getter
>
> > 如果你之前使用vuex比较多的话，就对这个getter应该不会陌生， 其实他就是vue组件中的computed，我在别的文章里面不止一次的说过这个计算属性，这里就不做赘述了，这里简单的说一下他的用法
>
> ```js
> import { defineStore } from 'pinia'
> export const useUserStore = defineStore('main', {
>     state: () => {
>         return {
>             loginName: 'Kim',
>             loginTime: new Date(),
>             age: 18
>         }
>     },
>   // 相当于计算属性 自带的有响应式，所以这里获取值的时候 不需要担心解构或者ref等问题
>     getters: {
>         completeName: (state) => {
>             return `name is ${state.loginName}`
>         },
>     }
> })
> ```
>
> 写法二：
>
> ```js
>        //不使用箭头函数的时候 使用this也是可以的，因为this指向的就是当前的store
>         completeName(state) {
>             return `name is ${this.loginName}`
>         },
> ```
>
> - 获取getter的数据
>
> ```html
>     <h4>{{ useStore.completeName }}</h4>
> ```
>
> - Getter 中使用其他getter
>
> > 直接使用即可，将getter当做一个变量就可以了
> >
> > ```js
> > getters: {
> >         completeName(state) {
> >             return `name is ${this.loginName}`
> >         },
> >         otherGetter() {
> >             return this.completeName + 'ShowOther'
> >         }
> >     }
> > ```
>
> - actions
>
> ```js
> import { defineStore } from 'pinia'
> export const useUserStore = defineStore('main', {
>     actions: {
>         setName(name:String) {
>             this.loginName = name
>         }
>     }
> })
> ```
>
> - 使用actions
>
> ```js
> <input type="text" v-model="data.name" id="" />
> <button @click="setNameV">设置名字</button>
> const setNameV = () => {
>   useStore.setName(data.name);
> };
> ```

#### 总结

> 总体下来基本的使用还是非常简单的，和vuex相比是简单的很多了，在加上新版本的vue的组合式api的写法，之前可能比较复杂的功能代码量也会很少，所以个人还是比较推荐使用pinia的。

#### 写到后面

> 关于pinia的这里就写这么多了，后续项目中使用的时候遇到的一些比较棘手的问题的以后我会持续记录的，有兴趣的或者觉得我写的哪里不对的，可以直接私信我或者是下方留言，我看到了都会回复的，另外就是我只是看的官网和别人的一些帖子，所以写的都是一些比较基础的用法，加上只是演示的demo，所以也不会写的那么复杂，不要纠结！

