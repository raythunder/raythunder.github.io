<template>
  <div class="page-main">
    <NavMenu v-if="!isHome"></NavMenu>
    <Sidebar
      v-if="layout==='Article'"
      :items="sidebarItems"
      @toggle-sidebar="toggleSidebar"
    >
      <slot
        name="sidebar-top"
        slot="top"
      />
      <slot
        name="sidebar-bottom"
        slot="bottom"
      />
    </Sidebar>

    <component
      :is="layout"
      v-if="layout!=='Article'"></component>

    <div
      class="page-container"
      v-else>
      <Page
        :sidebar-items="sidebarItems"
      >
        <slot
          name="page-top"
          slot="top"
        />
        <slot
          name="page-bottom"
          slot="bottom"
        />
      </Page>
    </div>
  </div>
</template>

<script>
import NavMenu from './components/NavMenu.vue'
import Page from './components/Page.vue'
import Home from './components/Home.vue'
import List from './components/List.vue'

import Sidebar from './components/Sidebar.vue'
import { resolveSidebarItems } from './components/util'
export default {
  data () {
    return {
      isSidebarOpen: false
    }
  },
  components: {
    NavMenu,
    Page,
    Sidebar,
    Home,
    List
  },
  computed: {
    layout () {
      return this.$page.frontmatter.layout || 'Article'
    },
    isHome () {
      return this.$page.frontmatter.title === 'Home'
    },
    sidebarItems () {
      return resolveSidebarItems(
        this.$page,
        this.$route,
        this.$site,
        this.$localePath
      )
    }
  },
  methods: {
    toggleSidebar (to) {
      this.isSidebarOpen = typeof to === 'boolean' ? to : !this.isSidebarOpen
    }
  }
}
</script>

<style lang="scss">
@import './styles/base.scss';
@import './styles/theme.scss';

.page-main {
  height: 100%;

  .page-container {
    width: 100%;
  }
}
</style>
