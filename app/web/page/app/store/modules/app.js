import axios from "axios";

const app = {
  namespaced: true,
  state: {
    articleList: [],
    article: {a:1},
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
  actions: {
    getArticleList({ commit, state }) {
      console.log('statee', state);
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
  },
};
export default app;
