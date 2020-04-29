<template>
  <div style="font-size: 24px; text-align: center">
    <div class="container smart-container">
      <div class="row row-offcanvas row-offcanvas-right">
        <div class="btns">
           <el-button>默认按钮</el-button>
  <el-button type="primary">主要按钮</el-button>
  <el-button type="success">成功按钮</el-button>
  <el-button type="info">信息按钮</el-button>
  <el-button type="warning">警告按钮</el-button>
  <el-button type="danger">危险按钮</el-button>
        </div>
        <div class="col-xs-12 col-sm-9">
          <ul class="smart-artiles" id="articleList">
            <li v-for="item in articleList" :key="item.id">
              <div class="point">+{{item.hits}}</div>
              <div class="card">
                <h2>
                  <router-link :to="'/detail/'+item.id" class="nav-item-a">{{item.title}}</router-link>
                </h2>
                <div>
                  <ul class="actions">
                    <li>
                      <time class="timeago">{{item.moduleName}}</time>
                    </li>
                    <li class="tauthor">
                      <a href="#" target="_blank" class="get">Sky</a>
                    </li>
                    <li>
                      <a :href="item.url" target="_blank">原文</a>
                    </li>
                    <li>
                      <span class="timeago">{{item.summary}}</span>
                    </li>
                    <li>
                      <span class="timeago"></span>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
          <div id="pagerBottom" class="smart-pager" v-if="isLoading">
            <img src="../../../asset/images/loading.gif" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
import { getArticleListPro } from 'framework/vue/apis'
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      articleList: []
    }
  },
  computed: {
    isLoading() {
      return false;
    },
    // ...mapState(['articleList']),
  },
  methods: {
    // ...mapActions(['getArticleList']),

    async getUser() {
      try {
       let res = await getArticleListPro();
       this.articleList = res.list;
      } catch(err) {

      } finally {

      }
    }
  },
  created() {
    this.getUser();
    console.log(1)
    // this.getArticleList();
  },
  // 留着
  // asyncData({ state, dispatch, commit }) {
  //   return dispatch('app/getArticleList');
  // },

};
</script>

<style lang="scss" scoped>
.container {
  .point {
    color: red;
  }
}
</style>
