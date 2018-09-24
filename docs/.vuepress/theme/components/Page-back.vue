<template>
  <div class="component-page">
    <div class="page-content">
      <component :is="layout"></component>
    </div>
  </div>
</template>

<script>
import Home from './Home.vue'
import List from './List.vue'
import Article from './Article.vue'

import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/prism.js'

export default {
  components: {
    Home,
    List,
    Article
  },
  computed: {
    layout () {
      return this.$page.frontmatter.layout || 'Article'
    }
  }
}
</script>

<style lang="scss" scoped>
.component-page {
  width: 100%;
  height: 100%;
  overflow: auto;
  font-family: -apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif;

  .page-content {
    max-width: 1000px;
    margin: 15px auto;

    .custom {
      img {
        max-width: 800px;
        max-height: 500px;
      }
    }
  }

  .download-btn {
    position: fixed;
    top: 100px;
    right: 100px;
  }
}

</style>
