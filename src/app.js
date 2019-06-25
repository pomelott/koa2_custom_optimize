import Vue from 'vue'
import App from './App.vue'

// 导出一个工厂函数，用于创建新的
// 应用程序、router 和 store 实例
export function createApp () {
  const app = new Vue({
    // 根实例简单的渲染应用程序组件。
    // render: h => h('h1', 'test title'),
    data: {
        url: 'xxxxxxxxxxxxxxxx'
    },
    template: `<div>url is {{url}}</div>`
  })
  return { app }
}