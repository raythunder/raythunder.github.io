<template>
  <div class="component-item-list">
    <el-card
      v-for="(item,index) in currentItems"
      shadow="hover"
      @click.native="handlerClick(item.path)"
      :key="index">
      <div class="title">{{ item.title }}</div>
      <div class="card-content">
        <div
          class="image"
          :style="{backgroundImage:`url(${item.frontmatter.cover})`}"></div>
        <!-- <img
          v-if=""
          :src="item.frontmatter.cover"
          class="image"> -->
        <div class="description">
          {{ item.frontmatter.description }}
        </div>
      </div>
      <div class="date">
        <i class="el-icon-date"></i>
        {{ formarter(item.frontmatter.date) }}
      </div>
    </el-card>
    <el-pagination
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      :page-size="pageSize"
      :page-sizes="pageSizes"
      :current-page="currNum"
      @size-change="pageSize = arguments[0]"
      @current-change="currNum = arguments[0]">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data () {
    return {
      currNum: 1,
      pageSize: 5,
      pageSizes: [5, 10, 20, 50]
    }
  },

  computed: {
    items () {
      return this.$site.pages.filter(item => item.frontmatter.title !== 'Home' && item.frontmatter.title !== 'Articles')
    },
    total () {
      return this.items.length || 0
    },

    currentItems () {
      const { items, currNum, pageSize } = this
      const start = (currNum - 1) * pageSize
      return items.slice(start, start + pageSize)
    }
  },

  methods: {
    formarter (data) {
      return data.substring(0, 10)
    },

    handlerClick (link) {
      this.$router.push(link)
    }
  }
}
</script>

<style lang="scss">
.component-item-list {
  width: 880px; padding-top: 80px;margin: 0 auto;
  .el-card {
    margin: 10px;
    cursor: pointer;

    &:hover {
      .title {
        color: #409eff;
      }
    }

    .title {
      padding-bottom: 8px;
      font-size: 20px;
      font-weight: bold;
    }

    .date {
      text-align: right;
    }

    .card-content {
      display: flex;

      .image {
        width: 35%;
        height: 140px;
        margin: 10px 20px 0 10px;
        border-radius: 6px;
        background: no-repeat center center;
        background-size: contain
      }

      .description {
        margin-top: 10px;

        flex: 1;
      }
    }
  }

  .el-pagination {
    margin: 30px 0;
    text-align: right;

    .btn-next, .btn-prev {
      background-color: #f6f6f6;
    }

    .el-pager {
      .number, .el-icon {
        background-color: #f6f6f6;
      }
    }
  }
}

</style>
