<template>
  <html v-if="isNode">
    <head>
      <title>{{title || 'Egg + Vue'}}</title>
      <meta name="keywords" :content="keywords" />
      <meta name="description" :content="description" />
      <meta http-equiv="content-type" content="text/html;charset=utf-8" />
      <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui" />
      <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      <link href="/public/asset/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    </head>

    <body>
      <div id="app">
        <MainLayout>
          <slot></slot>
          <div slot="main">
            <slot></slot>
          </div>
        </MainLayout>
      </div>
    </body>
  </html>

  <div v-else-if="!isNode" id="app">
    <MainLayout>
      <slot></slot>
      <div slot="main">
        <slot></slot>
      </div>
    </MainLayout>
  </div>
</template>
<style>
  @import "./app.css";
</style>
<script type="text/babel">
import MainLayout from "./main";
export default {
  props: ["title", "description", "keywords"],
  components: {
    MainLayout
  },
  computed: {
    isNode() {
      // https://hubcarl.github.io/easywebpack/webpack/env/
      // EASY_ENV_IS_NODE在哪里配置？
      return EASY_ENV_IS_NODE; // 是否是Node运行构建模式, 也就是 server side render
    }
  }
};
</script>
