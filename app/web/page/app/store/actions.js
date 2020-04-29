'use strict';

import * as Type from './mutation-type';
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const actions = {
  getArticleList({ commit, state }) {
    if (!state.articleList.length) {
      return axios
        .get(`${state.origin}/api/article/list`)
        .then((response) => {
          commit('SET_ARTICLE_LIST', response.data.list);
          console.log(state.articleList);
        });
    }
  },
  getArticleDetail({ commit, state }, {id}) {

    if (state.article.id !== Number(id)) {
      return axios
        .get(`${state.origin}/api/article/${id}`)
        .then((response) => {
          commit('SET_ARTICLE_DETAIL', response.data);
        });
    }
  },
  FETCH_ARTICLE_LIST: ({ commit, dispatch, state }) => {
    if (!state.articleList.length) {
      return axios.get(`${state.origin}/api/article/list`)
        .then(response => {
          commit(Type.SET_ARTICLE_LIST, response.data.list);
        });
    }
  },

  FETCH_ARTICLE_DETAIL: ({ commit, dispatch, state }, { id }) => {
    if (state.article.id !== Number(id)) {
      
      return axios.get(`${state.origin}/api/article/${id}`)
        .then(response => {
          commit(Type.SET_ARTICLE_DETAIL, response.data);
        });
    }
  }
};

export default actions;
