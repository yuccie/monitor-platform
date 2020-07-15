<template>
  <div class="detail">
    <LayoutHeader></LayoutHeader>

    <div class="main" ref="jsmain">
      <div class="left">
        <el-card class="card">
          <div slot="header" class="clearfix">
            <strong>错误信息</strong>
            <el-switch class="switch" v-model="source" active-color="#13ce66" inactive-color="#eee"></el-switch>

            <!-- @focus="abortGetSourcemapContent" -->
            <el-input
              @keyup.enter.native="getSourcemapContent"
              v-model="sourceMapUrl"
              class="sourcemap-url"
              size="small"
              :disabled="!source"
            >
              <template slot="prepend">source-map:</template>
            </el-input>
          </div>

          <div class="item">
            <span>Name:</span>
            <span>{{errorDetail.name}}</span>
          </div>
          <div class="item">
            <span>Message:</span>
            <span style="color: #f56c6c;">{{errorDetail.content}}</span>
          </div>

          <template v-if="source">
            <div class="item">
              <span>File:</span>
              <span>{{originalFileName}}</span>
            </div>
            <div class="item">
              <span>Line:</span>
              <span>{{originalLineNumber}}</span>
            </div>
            <div class="item">
              <span>Column:</span>
              <span>{{originalColumnNumber}}</span>
            </div>
            <div class="item flex">
              <span>Stack:</span>
              <div v-if="originalStack.length" class="stack-container">
                <div v-for="(item, index) in originalStack" :key="index" class="stack-item">
                  <h3>at {{item.source}}:{{item.line}}:{{item.column}}</h3>
                  <pre v-highlightjs><code class="js">{{item.code}}</code></pre>
                  <div class="line-number">
                    <div
                      v-for="number in item.lineNumbers"
                      :key="number"
                      :class="{hight: number == item.line}"
                    >
                      <i class="el-icon-caret-right" v-if="number == item.line"></i>
                      {{number}}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>

          <template v-else>
            <div class="item">
              <span>File:</span>
              <span>
                <a :href="errorDetail.fileName" target="_blank">{{errorDetail.fileName}}</a>
              </span>
            </div>
            <div class="item">
              <span>Line:</span>
              <span>{{errorDetail.lineNumber}}</span>
            </div>
            <div class="item">
              <span>Column:</span>
              <span>{{errorDetail.columnNumber}}</span>
            </div>
            <div class="item flex">
              <span>Stack:</span>
              <div class="stack-container">
                <div v-for="(item, index) in errorDetail.stack" :key="index" class="stack-item">
                  <h3>{{item.source}}</h3>
                  <pre
                    v-if="index == 0 && fileErrorCode"
                    v-html="fileErrorCode"
                    class="online-code"
                  ></pre>
                </div>
              </div>
            </div>
          </template>
        </el-card>

        <el-card class="card" v-if="errorDetail.recentClickEventList">
          <div slot="header">
            <strong>操作轨迹信息</strong>
          </div>
          <el-table :data="recentClickEventList" border style="width: 100%">
            <el-table-column prop="timestamp" label="时间" width="180px"></el-table-column>
            <el-table-column prop="outerHTML" label="目标元素"></el-table-column>
            <el-table-column prop="url" label="页面地址"></el-table-column>
            <el-table-column prop="title" label="title" width="100px"></el-table-column>
            <el-table-column prop="pageX" label="坐标x" width="60px"></el-table-column>
            <el-table-column prop="pageY" label="坐标y" width="60px"></el-table-column>
          </el-table>
        </el-card>

        <el-card class="card" v-if="errorDetail.recentAjaxList">
          <div slot="header">
            <strong>接口请求信息</strong>
          </div>
          <el-table :data="recentAjaxList" border style="width: 100%">
            <el-table-column prop="time" label="时间" width="180px"></el-table-column>
            <el-table-column prop="url" label="页面地址"></el-table-column>
            <el-table-column prop="title" label="title" width="100px"></el-table-column>
            <el-table-column prop="api" label="api接口"></el-table-column>
          </el-table>
        </el-card>

        <el-card class="card" v-if="errorDetail.cookies">
          <div slot="header">
            <strong>cookie信息</strong>
          </div>
          <div class="item" :key="item" v-for="item in (errorDetail.cookies).split(';')">
            <span>{{item.split('=')[0]}}</span>
            <span>{{decodeURIComponent(item.split('=')[1])}}</span>
          </div>
        </el-card>
      </div>

      <div class="right">
        <el-card class="card">
          <div slot="header">
            <strong>基本信息</strong>
          </div>
          <div class="item">
            <span>Title:</span>
            <span>{{errorDetail.title || '&nbsp;'}}</span>
          </div>
          <div class="item">
            <span>URL:</span>
            <span>
              <a target="_blank" :href="errorDetail.url">{{errorDetail.url}}</a>
            </span>
          </div>
          <div class="item">
            <span>Level:</span>
            <span>{{errorDetail.errorLevel}}</span>
          </div>
          <div class="item">
            <span>Type:</span>
            <span>{{errorDetail.errorType}}</span>
          </div>
          <div class="item">
            <span>Time:</span>
            <span>{{errorDetail.errorTime}}</span>
          </div>
        </el-card>

        <el-card class="card" v-if="errorDetail.userAgent">
          <div slot="header">
            <strong>设备信息</strong>
          </div>
          <div class="item">
            <span>Browser:</span>
            <span>{{errorDetail.userAgent.browser.name}}</span>
            <span>{{errorDetail.userAgent.browser.version}}</span>
          </div>
          <div class="item">
            <span>Engine:</span>
            <span>{{errorDetail.userAgent.engine.name}}</span>
            <span>{{errorDetail.userAgent.engine.version}}</span>
          </div>
          <div class="item">
            <span>OS:</span>
            <span>{{errorDetail.userAgent.os.name}}</span>
            <span>{{errorDetail.userAgent.os.version}}</span>
          </div>
        </el-card>

        <el-card class="card">
          <div slot="header">
            <strong>位置信息</strong>
          </div>
          <div class="item">
            <span>City:</span>
            <span>{{errorDetail.ip_city_name}}</span>
          </div>
          <div class="item">
            <span>Country:</span>
            <span>{{errorDetail.ip_country_code}}</span>
          </div>
          <div class="item">
            <span>Geolocation:</span>
            <span>{{errorDetail.ip_geolocation}}</span>
          </div>
          <div class="item">
            <span>IP:</span>
            <span>{{errorDetail.ip}}</span>
          </div>
        </el-card>

        <el-card class="card">
          <div slot="header">
            <strong>其他信息</strong>
          </div>
          <div class="item">
            <span>Project:</span>
            <span>{{errorDetail.projectName}}</span>
          </div>
          <div class="item">
            <span>ID:</span>
            <span>{{errorDetail._id}}</span>
          </div>
          <div class="item flex" v-if="errorDetail.userAgent">
            <span>UA:</span>
            <div>{{errorDetail.userAgent.ua}}</div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import LayoutHeader from '@layoutApp/header/header';
import { getErrDetail, getSourceMap } from '@apis/';
import UAParser from 'ua-parser-js';

// 语法高亮，需要css样式
import hljs from 'highlight.js/lib/core';
import 'highlight.js/styles/github.css';

sourceMap.SourceMapConsumer.initialize({
  'lib/mappings.wasm': `/public/static/sourcemap/0.7.0/mappings.wasm`
});

Vue.directive('highlightjs', {
  deep: true,
  bind: function(el, binding) {
    setTimeout(() => {
      let targets = el.querySelectorAll('pre code');
      targets.forEach(target => {
        if (binding.value) {
          target.textContent = binding.value;
        }
        hljs.highlightBlock(target);
      });
    });
  },
  componentUpdated: function(el, binding) {
    setTimeout(() => {
      let targets = el.querySelectorAll('pre code');
      targets.forEach(target => {
        if (binding.value) {
          target.textContent = binding.value;
        }
        hljs.highlightBlock(target);
      });
    });
  }
});

let consumer;

export default {
  components: { LayoutHeader },
  data() {
    return {
      errorDetail: {},
      title: 'DETAIL',
      source: false,
      sourceMapUrl: '',
      originalFileName: '',
      originalLineNumber: '',
      originalColumnNumber: '',
      originalStack: [],
      fileContent: '',
      fileErrorCode: '',
      prevSourceMapURL: ''
    };
  },

  computed: {
    recentClickEventList() {
      let list = JSON.parse(this.errorDetail.recentClickEventList);
      if (list) {
        return list.reverse();
      } else {
        return [];
      }
      
    },
    recentAjaxList() {
      let list = JSON.parse(this.errorDetail.recentAjaxList);
      if (list) {
        return list.reverse();
      } else {
        return [];
      }
    },
    routeQuery() {
      return this.$route.query;
    }
  },

  watch: {
    source(newValue, oldValue) {
      if (newValue) {
        this.getSourcemapContent();
      }
    }
  },

  methods: {
    async getErrDetail() {
      let reqData = {
        id: this.routeQuery.id
      };
      try {
        let res = await getErrDetail(reqData);
        if (res) {
          let item = res.data;
          item.userAgent = UAParser(item.userAgent);
          item.disBrowser = `${item.userAgent.browser.name} ${item.userAgent.browser.version}`;
          item.disOs = `${item.userAgent.os.name} ${item.userAgent.os.version}`;
          this.sourceMapUrl = item.fileName + '.map';
          this.errorDetail = item;
          // this.getFileContent();
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 截取出错代码片段（当前文件）
    getFileCode(lineNumber, columnNumber) {
      lineNumber = lineNumber || this.errorDetail.lineNumber;
      columnNumber = columnNumber || this.errorDetail.columnNumber;
      let lineList = this.fileContent.split(/\n/);
      let lineCode = lineList[lineNumber - 1];
      let columnIndex = columnNumber - 1;
      return lineCode.substring(columnIndex - 40, columnIndex + 41);
    },

    // 获取 sourcemap 内容
    async getSourcemapContent() {
      if (this.prevSourceMapURL !== this.sourceMapUrl) {
        try {
          let res = await getSourceMap({url: this.sourceMapUrl});
          if (res) {
            let sourceMapContent = res.data;
            consumer = await new sourceMap.SourceMapConsumer(sourceMapContent);
            this.getOriginalStack();
            this.prevSourceMapURL = this.sourceMapUrl;
          }
        } catch (e) {
          console.log(e);
        }
      }
    },

    // 取消获取 sourcemap 的 ajax 请求
    abortGetSourcemapContent() {
      console.log('获取焦点了');
      // axiosCancelTokenSource.cancel('sourcemap url will change!');
    },

    // 解析源文件的堆栈信息
    getOriginalStack() {
      this.originalStack = this.errorDetail.stack
        .map((item, index) => {
          const size = 5;
          const original = consumer.originalPositionFor({
            line: item.lineNumber,
            column: item.columnNumber
          });
          if (index == 0) {
            this.originalFileName = original.source;
            this.originalLineNumber = original.line;
            this.originalColumnNumber = original.column;
          }
          if (!original.source) {
            return false;
          }
          // 留意ArraySet数据类型，下面一行将源码分割成单行，并生成html标签
          const sourceContent = consumer.sourceContentFor(original.source).split('\n');
          const sourceContentLine = sourceContent.length;

          // 为何 - size，size为何为5？
          let minLine = original.line - size;
          let maxLine = original.line + size;
          original.minLine = minLine < 1 ? 1 : minLine;
          original.maxLine = maxLine > sourceContentLine ? sourceContentLine : maxLine;

          original.code = sourceContent
            .splice(original.minLine - 1, original.maxLine - original.minLine + 1)
            .join('\n');
          original.lineNumbers = [];
          let i = original.minLine;
          while (i <= original.maxLine) {
            original.lineNumbers.push(i);
            i++;
          }
          return original;
        })
        .filter((item, index) => {
          return item;
        });
    },

    // 获取异常 js 文件内容？什么格式的数据？
    getFileContent() {
      axios
        .get(`${API_PROXY}?u=${this.errorDetail.fileName}`, {
          hideMessage: true
        })
        .then(data => {
          this.fileContent = data;
          this.fileErrorCode = this.getFileCode();
        });
    }
  },

  created() {
    this.getErrDetail();
    // if (!this.errorDetail || this.errorDetail.id != this.$route.query.id) {
    //   this.getErrDetail();
    // } else {
    //   // this.sourceMapUrl = this.errorDetail.fileName.replace(/\?.*$/, '') + '.map';
    //   // this.getFileContent();
    // }
    // try {
    //   setTimeout(() => {
    //     console.log(aa)
    //   });
    // } catch (e) {
    //   console.log('我感知不到错误');
    //   console.log(e);
    // }
  }
};
</script>

<style lang="scss" scoped>
.detail {
  padding: 25px 50px;
  .main {
    display: flex;
    .left {
      flex: 1;
      margin-right: 15px;
      overflow-x: hidden;
      min-width: 920px;
    }
    .right {
      width: 35%;
      overflow-x: hidden;
    }
    .card {
      margin-bottom: 15px;
      border-radius: 0;
      .switch {
        float: right;
      }
      .sourcemap-url {
        float: right;
        width: 70%;
        margin-right: 10px;
        border-radius: 0px;
        margin-top: -5px;
      }
      .flex {
        display: flex;
        & > div {
          flex: 1;
        }
      }
      .item {
        border-bottom: 1px solid #e6ebf5;
        display: flex;
        justify-content: space-between;
        &:last-child {
          border-bottom: none;
        }
        span {
          line-height: 48px;
          display: inline-block;
          align-items: center;
          color: rgb(74, 74, 74);
          &:first-child {
            color: rgb(157, 157, 161);
            padding-right: 10px;
            min-width: 50px;
            text-align: left;
          }
          &:nth-child(2) {
            word-break: break-word;
            line-height: 1.5;
          }
        }
      }
      .item-opt {
        span {
          display: inline;
          color: rgb(157, 157, 161);
        }
      }
      .item.flex {
        div.stack-container {
          padding-top: 6px;
          padding-right: 20px;
          .stack-item {
            border-bottom: 1px dashed #eee;
            padding: 5px;
            padding-top: 0;
            position: relative;
            // display: flex;
            h3 {
              font-weight: normal;
              font-size: 14px;
              line-height: 260%;
              /*color: #f56c6c;*/
            }
            pre {
              padding: 20px;
            }
            pre.online-code {
              overflow-x: auto;
              padding: 20px;
              background: #fbf1c7;
              border-radius: 7px;
              margin-bottom: 7px;
            }
            .js {
              position: relative;
              left: 80px;
            }
            .line-number {
              box-sizing: border-box;
              width: 80px;
              border-right: 1px #ccc solid;
              position: absolute;
              left: 0;
              top: 56px;
              padding-right: 20px;
              text-align: right;
              div {
                line-height: 150%;
              }
              .hight {
                color: #f56c6c;
              }
            }
          }
        }
      }
    }
  }
}
</style>