/*
 * @use: 
 * @description: 
 * @SpecialInstructions: 无
 * @Author: clearlove
 * @Date: 2024-01-17 15:00:10
 * @FilePath: /websiteContent/src/view/articleRecords/common/artcleLists.js
 */
/**
 * @Description: 文章列表
 * @author:clearlove
 * @param 
 * @return 
 * @createTime: 2024-01-17 15:00:13
 */
import vueImplatePlugin from '../MD/vueImplatePlugin.md'
import transparentAttrattributes from '../MD/transparentAttrattributes.md'
import expandOnProVideAndInject from '../MD/expandOnProVideAndInject.md'
import oneArticleWillCoverAllofTSInOnePlace from '../MD/oneArticleWillCoverAllofTSInOnePlace.md'
import collectionJs from '../MD/collectionJs.md'
import IIFEFunc from '../MD/IIFEFunc.md'
import setAndMap from '../MD/setAndMap.md'
import piainProd from '../MD/piainProd.md'
import proxyProd from '../MD/proxyProd.md'
import webThree from '../MD/webThree.md'
import jsTypeCheck from '../MD/jsTypeCheck.md'








export const artcleLists = [
  {
    title: '兼容vue2和vue3版本的插件实现过程',
    subTitle: 'Implementation process of plugins compatible with Vue2 and Vue3 versions',
    author: 'clearlove',
    date: '2023-04-24',
    tags: [
      {
        tagName: 'vue',
        tagColor: '#f50'
      },
      {
        tagName: 'javaScript',
        tagColor: '#2db7f5'
      }
    ],
    path: vueImplatePlugin
  },
  {
    title: '了解一下透传Attrsbutes',
    subTitle: 'Learn about transparent Attrattributes',
    author: 'clearlove',
    date: '2023-05-24',
    tags: [
      {
        tagName: 'vue',
        tagColor: '#f50'
      },
      {
        tagName: 'Attrsbutes',
        tagColor: '#22e3f9'
      },
      {
        tagName: 'javaScript',
        tagColor: '#2db7f5'
      }
    ],
    path: transparentAttrattributes
  },
  {
    title: '展开说provide和inject',
    subTitle: 'Expand on provide and inject',
    author: 'clearlove',
    date: '2024-01-21',
    tags: [
      {
        tagName: 'vue',
        tagColor: '#f50'
      },
      {
        tagName: 'provide、inject',
        tagColor: '#22e3f9'
      },
      {
        tagName: '组件传值',
        tagColor: '#2db7f5'
      }
    ],
    path: expandOnProVideAndInject
  },
  {
    title: '一篇文章将TS一网打尽',
    subTitle: 'One article will cover all of TS in one place',
    author: 'clearlove',
    date: '2024-01-31',
    tags: [
      {
        tagName: 'TS',
        tagColor: '#f50'
      },
      {
        tagName: 'JS',
        tagColor: '#22e3f9'
      },
      {
        tagName: '类型限制',
        tagColor: '#2db7f5'
      }
    ],
    path: oneArticleWillCoverAllofTSInOnePlace
  },
  {
    title: '谈谈JavaScript的垃圾回收',
    subTitle: 'Talking about Garbage Collection in JavaScript',
    author: 'clearlove',
    date: '2024-02-11',
    tags: [
      {
        tagName: 'JS',
        tagColor: '#f50'
      },
      {
        tagName: 'collection',
        tagColor: '#22e3f9'
      },
      {
        tagName: 'js运行机制',
        tagColor: '#2db7f5'
      }
    ],
    path: collectionJs
  },
  {
    title: '来说一下JS中IIFE函数是什么，什么是隐藏实现',
    subTitle: 'What is the IIFE function in JS and what is the hidden implementation',
    author: 'clearlove',
    date: '2024-02-18',
    tags: [
      {
        tagName: 'IIFE',
        tagColor: '#f50'
      },
      {
        tagName: 'JS',
        tagColor: '#22e3f9'
      },
      {
        tagName: '隐藏实现',
        tagColor: '#2db7f5'
      }
    ],
    path: IIFEFunc
  },
  {
    title: 'ES6新特性之Map和Set',
    subTitle: 'ES6 New Features: Map and Set',
    author: 'clearlove',
    date: '2024-02-24',
    tags: [
      {
        tagName: 'SET',
        tagColor: '#f50'
      },
      {
        tagName: 'MAP',
        tagColor: '#22e3f9'
      },
      {
        tagName: 'ES6新特性',
        tagColor: '#2db7f5'
      }
    ],
    path: setAndMap
  },
  {
    title: 'pinia基本使用介绍',
    subTitle: 'Introduction to basic usage of pinia',
    author: 'clearlove',
    date: '2024-02-26',
    tags: [
      {
        tagName: 'pinia',
        tagColor: '#f50'
      },
      {
        tagName: 'VUE',
        tagColor: '#22e3f9'
      },
      {
        tagName: 'JS',
        tagColor: '#2db7f5'
      }
    ],
    path: piainProd
  },
  {
    title: 'Proxy 基本方法使用介绍',
    subTitle: 'Introduction to the Basic Methods of Using Proxy',
    author: 'clearlove',
    date: '2024-02-28',
    tags: [
      {
        tagName: 'Proxy',
        tagColor: '#f50'
      },
      {
        tagName: 'VUE',
        tagColor: '#22e3f9'
      },
      {
        tagName: 'JS',
        tagColor: '#2db7f5'
      }
    ],
    path: proxyProd
  },
  {
    title: '将我理解的web3.0讲给你听',
    subTitle: 'I will tell you what I understand about web3.0',
    author: 'clearlove',
    date: '2024-03-02',
    tags: [
      {
        tagName: 'web3.0',
        tagColor: '#f50'
      },
      {
        tagName: 'web',
        tagColor: '#22e3f9'
      },
      {
        tagName: 'JS',
        tagColor: '#2db7f5'
      }
    ],
    path: webThree
  },
  {
    title: 'JS数据类型判断方式总结',
    subTitle: 'Summary of JS data type judgment methods',
    author: 'clearlove',
    date: '2024-03-06',
    tags: [
      {
        tagName: '类型判断',
        tagColor: '#f50'
      },
      {
        tagName: 'type',
        tagColor: '#22e3f9'
      },
      {
        tagName: 'JS',
        tagColor: '#2db7f5'
      }
    ],
    path: jsTypeCheck
  },
]