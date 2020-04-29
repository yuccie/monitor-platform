<template>
  <div style="font-size: 24px; text-align: center">
    <h1>{{article.title}}</h1>
    <iframe :src="article.url" frameborder="0" width="100%" height="600"></iframe>
  </div>
</template>
<style>

</style>
<script type="text/babel">
import {mapState, mapActions} from 'vuex';
  export default{
    computed: {
      ...mapState(['article']),
      // article() {
      //   return this.$store.state.article;
      // }
    },
    methods: {
      ...mapActions(['getArticleDetail'])
    },
    created() {
      const {id} = this.$route.params;
      this.getArticleDetail({id});
    },
    // asyncData({ state, dispatch, commit }) {
    //   console.log('state');
    //   const { id } = state.route.params;
    //   dispatch('app/getArticleDetail' ,{ id });
    //   // return dispatch('FETCH_ARTICLE_DETAIL', { id })
    // }
  }
</script>
