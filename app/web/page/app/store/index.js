"use strict";
import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';

// import app from "./modules/app";
// import actions from "./actions";
// import getters from "./getters";
// import mutations from "./mutations";

Vue.use(Vuex);

export default function createStore(initState = {}) {
  const state = {
    articleList: [],
    article: {},
    ...initState,
  };

  return new Vuex.Store({
    state,
    actions: {
      getArticleList({ commit, state }) {
        if (!state.articleList.length) {
          // state.origin这里涉及服务端渲染，不能用location.orgin
          // 因为这就是服务端，这里就没有了axios拦截器了，不过也可以
          return axios
            .get(`${state.origin}/api/article/list`)
            .then((response) => {
              commit("SET_ARTICLE_LIST", response.data.list);
            });
        }
      },
      getArticleDetail({ commit, state }, { id }) {
        if (state.article.id !== Number(id)) {
          return axios
            .get(`${state.origin}/api/article/${id}`)
            .then((response) => {
              commit("SET_ARTICLE_DETAIL", response.data);
            });
        }
      },
    },
    getters: {},
    mutations: {
      SET_ARTICLE_LIST: (state, data) => {
        state.articleList = data;
      },
      SET_ARTICLE_DETAIL: (state, data) => {
        state.article = data;
      },
    },
    // 因为涉及到服务端渲染，数据的同步有点问题，暂时都放在一块
    // modules: {
    //   app
    // }
  });
}
