# egg-vue-webpack-boilerplate

基于 Egg + Vue + Webpack 单页面服务端渲染(SSR)同构工程骨架项目

## 文档

- https://github.com/easy-team
- https://www.yuque.com/easy-team
- https://zhuanlan.zhihu.com/easywebpack


## 1.特性


- 基于 vue + vuex + vue-router + axios 单页面服务器客户端同构实现

- 支持 server 和 client 端代码修改, webpack 时时编译和热更新, `npm start` 一键启动应用

- 支持开发环境, 测试环境，正式环境 webpack 编译
 

## 2.依赖

- [easywebpack](https://github.com/easy-team/easywebpack) ^4.x.x
- [easywebpack-vue](https://github.com/easy-team/easywebpack) ^4.x.x
- [egg-view-vue-ssr](https://github.com/easy-team/egg-view-vue-ssr) ^3.0.2
- [egg-webpack](https://github.com/easy-team/egg-webpack) ^4.x.x
- [egg-webpack-vue](https://github.com/easy-team/egg-webpack-vue) ^2.0.0


## 3. 使用

#### 3.1 安装cli(非必需)

```bash
npm install @easy-team/easywebpack-cli -g
```


#### 3.2 安装依赖

```bash
npm install
```


#### 3.3 启动应用

##### 本地开发启动应用

```bash
npm run dev
```

应用访问: http://127.0.0.1:7001

![npm start启动](https://github.com/easy-team/egg-vue-webpack-boilerplate/blob/feature/green/spa/docs/images/webpack-build.png)


##### 发布模式启动应用

- 首先在本地或者ci构建好jsbundle文件

```bash
npm run build 
```

- 然后,启动应用

```bash
npm start 
```

## 4. 功能实现

#### 4.1 单页面前端实现

在app/web/page 目录下面创建app目录, app.vue, app.js 文件.

- app.vue 编写界面逻辑, 根元素为layout(自定义组件, 全局注册, 统一的html, meta, header, body)

```html
<template>
  <app-layout>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </app-layout>
</template>
<style lang="scss">

</style>
<script type="text/babel">
  export default {
    computed: {

    },
    mounted(){

    }
  }
</script>
```

- app.js 页面调用入口

```javascript
import { sync } from 'vuex-router-sync';
import store from 'store/app';
import router from 'component/app/router';
import app from './app.vue';
import App from 'app';
import Layout from 'component/layout/app';

App.component(Layout.name, Layout);

sync(store, router);

export default App.init({
  base: '/app',
  ...app,
  router,
  store
});

```

#### 4.2 单页面后端实现

- 创建controller文件app.js

```javascript
exports.index = function* (ctx) {
  yield ctx.render('app/app.js', { url: this.url.replace(/\/app/, '') });
};
```

- 添加路由配置

```javascript
  app.get('/app(/.+)?', app.controller.app.app.index);
```


## 5. 打包部署

http://hubcarl.github.io/easywebpack/vue/build/


## 6. 实现原理

### 6.1 本地`npm start`启动流程

![本地启动流程](http://hubcarl.github.io/img/webpack/npm-start.png)

### 6.2 服务端渲染页面访问流程

![服务端渲染页面访问流程](http://hubcarl.github.io/img/webpack/egg-webpack-vue-ssr.png)


### 6.3 详细资料

- [Egg+Vue解决方案开发流程](http://hubcarl.github.io/easywebpack/vue/dev/)

- [基于webpack的前端工程解决方案和egg+vue服务端渲染项目实践](http://hubcarl.github.io/blog/2017/04/15/webpack-project/)

- [koa和egg项目webpack内存编译和热更新实现](http://hubcarl.github.io/blog/2017/04/15/egg-webpack/)


## License

[MIT](LICENSE)
