#### 需求说明

> vue2升级vue3中很多插件是单独进行使用的，但是项目进行升级的时候如果直接进行项目的全部重构工作量是很大的，当然这篇文章解决不了这个终极问题，这里只是分享创建一个可以支持vue2和vue3插件的实现过程。

#### 引入vue-demi

```shell
yarn add vue-demi
or
npm install vue-demi
```

#### vue-demi 官网

[vue-demi](https://www.npmjs.com/package/vue-demi)

#### 目录结构如下

src/plugin/commonfs
src/plugin/directive
src/plugin/index

#### directive/index.js实现

```js
/*
 * @use: 
 * @description: 全局使用的指令，不用区分版本进行使用
 * @SpecialInstructions: 无
 * @Author: clearlove
 * @Date: 2022-09-06 16:09:42
 * @LastEditTime: 2022-09-06 16:19:17
 * @FilePath: /csdn_common_plugin/src/plugin/directive/index.js
 */
import { isVue3 } from "vue-demi";
const dire2 = {
    bind(el, binding) {
        el.addEventListener('click', () => {
            console.log("====>dire2", binding)
        })
    }
}
const dire3 = {
    beforeMount(el, binding) {
        el.addEventListener('click', () => {
            console.log("====>dire3", binding)
        })
    }
}
export default isVue3 ? dire3 : dire2
```

#### commonfs/index.js

```js
/*
 * @use: 
 * @description: 测试全局函数 不同版本也可以直接进行使用
 * @SpecialInstructions: 无
 * @Author: clearlove
 * @Date: 2022-09-06 16:13:12
 * @LastEditTime: 2022-09-06 16:17:17
 * @FilePath: /csdn_common_plugin/src/plugin/commonfs/index.js
 */
/**
 * 
 * @param {*} v  
 */
let checkPlugin = (v) => {
    console.log('执行成功', v)
}
export default checkPlugin
```

#### plugin/index.js

```js
/*
 * @use: 
 * @description: 统一出口文件
 * @SpecialInstructions: 无
 * @Author: clearlove
 * @Date: 2022-09-06 16:08:02
 * @LastEditTime: 2022-09-06 16:18:47
 * @FilePath: /csdn_common_plugin/src/plugin/index.js
 */
import { isVue3 } from "vue-demi";
import dire from './directive/index.js'
import checkPlugin from './commonfs/index.js'
const ins2 = {
    install(Vue) {
        // HACK: 指令和全局函数根据实际业务需求进行更改
        Vue.directive('csdn', dire)
        Vue.prototype.$csdn = (params = {}) => {
            checkPlugin(params)
        }
    }
}
const ins3 = {
    install(app) {
        app.directive('csdn', dire);
        app.config.globalProperties.$csdn = (params = {}) => {
            checkPlugin(params)
        }
    }
}
export default isVue3 ? ins3 : ins2
```

#### 请求封装

```js
import { isVue3 } from "vue-demi";
// FIXME: 这里VITE和VUE名字都是自己的，需要自己根据实际.env文件进行配置  当前插件没有进行axios进行封装
axios.defaults.baseURL = isVue3 ? import.meta.env.VITE_APP_BASE_URL : process.env.VUE_APP_BASE_URL
```

#### package.json

```json
{
  "name": "csdn_common_plugin",
  "version": "0.1.0",
  "private": false,
  "main":"./src/plugin/index.js",
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint"
  },
  "dependencies": {
    "core-js": "^3.8.3",
    "vue": "^2.6.14",
    "vue-demi": "^0.13.11"
  },
  "devDependencies": {
    "@babel/core": "^7.12.16",
    "@babel/eslint-parser": "^7.12.16",
    "@vue/cli-plugin-babel": "~5.0.0",
    "@vue/cli-plugin-eslint": "~5.0.0",
    "@vue/cli-service": "~5.0.0",
    "eslint": "^7.32.0",
    "eslint-plugin-vue": "^8.0.3",
    "vue-template-compiler": "^2.6.14"
  },
  "eslintConfig": {
    "root": true,
    "env": {
      "node": true
    },
    "extends": [
      "plugin:vue/essential",
      "eslint:recommended"
    ],
    "parserOptions": {
      "parser": "@babel/eslint-parser"
    },
    "rules": {}
  },
  "browserslist": [
    "> 1%",
    "last 2 versions",
    "not dead"
  ]
}
```

#### 发布插件

##### 注册npm

[注册npm](https://www.npmjs.com/)

##### 登录npm

- 打开终端

```shell
npm login
```

- 这里不要忘记进行邮箱校验，否则后面可能会发布失败

#### 查看登录状态

```js
npm whoami
```

##### 发布插件

- 切到当前的插件项目的目录，执行命令

```shell
npm publish
```

##### 常见错误

- 每次更新发布需要进行更新版本号
- 发布的包名字不可以和已有的包库重复
- private 需要设置为false 否则是不允许发布的
- main 地址要指向出口文件

#### vue3引用

##### main.js

```js
import csdn from 'csdn_common_plugin'
app.use(csdn)
```

##### 展示效果

```js
  <p v-csdn @click="ceshi">vite中进行测试,请点击</p>
  let ceshi = () => {
        globalProxy.$csdn();
    };
```

#### vue2引用

##### main.js

```js
import csdn from 'csdn_common_plugin'
Vue.use(csdn)
```

##### 展示效果

```js
    <p v-csdn @click="ceshi">vue2测试,请点击</p>
    ceshi(){
      this.$csdn();
    }
```

#### 写到后面

> 插件到这里就基本上实现了，这里主要是插件的实现过程，组件的兼容我这里没有进行实现，不过通过vue-demi也是可以实现的，后面有需要的话我会更新的，感谢大家的阅读。