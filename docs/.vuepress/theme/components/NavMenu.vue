<template>
  <div class="component-nav-menu">
    <div class="placeholder"></div>
    <div class="search-wrapper">
      <el-autocomplete
        v-model="searchValue"
        value-key="title"
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        background-color="#eee"
        :fetch-suggestions="querySearchTips"
        @select="handleSearchValue">
      </el-autocomplete>
    </div>

    <el-menu
      mode="horizontal"
      :default-active="defaultPath"
      @select="handleSelect">
      <template v-for="menu in menuList">
        <!-- <el-submenu
          v-if="menu.items"
          :index="menu.text"
          :key="menu.text">
          <template
            slot="title">
            {{ menu.text }}
          </template>
          <el-menu-item
            v-for="item in menu.items"
            :key="item.link"
            :index="item.link">
            {{ item.text }}
          </el-menu-item>
        </el-submenu> -->
        <el-menu-item
          :index="menu.link">
          {{ menu.text }}
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {
      pageName: '/',
      searchValue: ''
    }
  },
  computed: {
    menuList () {
      return this.$site.themeConfig.nav || []
    },
    pages () {
      return this.$site.pages || []
    },
    defaultPath () {
      return this.$route.path.replace(/\/(\w+-*\w+)\.html$/, '/')
    }
  },
  methods: {
    handleSelect (path) {
      if (/^http/.test(path)) {
        window.open(path)
      } else {
        this.$router.push(path)
      }
    },

    querySearchTips (qs, callback) {
      let blank = []
      if (!qs) {
        return callback(blank)
      }

      const pages = this.$site.pages.filter(item => item.frontmatter.title !== 'Home' && item.frontmatter.title !== 'Articles')

      const result = pages.filter(page => page.title.toUpperCase().indexOf(qs.toUpperCase()) > -1)
      setTimeout(() => {
        callback(result)
      }, 300)
    },

    handleSearchValue (data) {
      this.$router.push(data.path)
    }
  }
}
</script>

<style lang="scss">
.component-nav-menu {
  position: fixed;
  top: 0;
  display: flex;
  width: 100%;
  height: 60px;
  padding: 0 50px;
  border-bottom: 1px solid #e0e6ed;
  box-sizing: border-box;
  background: #fff;
  z-index: 999;
   > .el-menu {
    border: none !important; margin-top: -1px;
  }

   > .placeholder {
    flex: 1;
  }

  .search-wrapper {
    width: 200px;
    padding: 10px 20px;
  }
}

</style>
