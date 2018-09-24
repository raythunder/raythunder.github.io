<template>
  <div class="component-home">
    <div class="bg">
      <canvas id="canvas">Canvas is not supported in your browser</canvas>
    </div>

    <div class="center">
      <img
        class="hero"
        src="../images/hero.png"></img>
      <!-- <div class="title">{{ front.title }}</div> -->

      <div class="button-wrapper">
        <span @click="handlerClick('/blog/')">< ------ Enter ------ ></span>
      </div>

    </div>
    <div class="description">
      {{ front.description }}
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    front () {
      return this.$page.frontmatter
    },

    nav () {
      return this.front.nav || []
    }
  },

  methods: {
    handlerClick (link) {
      if (/^http/.test(link)) {
        window.open(link)
      } else {
        this.$router.push(link)
      }
    }
  },
  mounted () {
    demo.init()
    window.addEventListener('resize', demo.resize)
  },
  beforeDestroy () {
    demo.started = false
    // window.cancelAnimationFrame(demo.frameId)
  }
}
</script>

<style lang="scss">
.component-home {
  position: absolute; top: 0;right: 0;bottom: 0;left: 0;
  color: #909399;

  .bg {
    position: absolute; top: 0;right: 0;bottom: 0;left: 0;overflow: hidden;background: linear-gradient(to bottom, #080d28 0%, #261300 100%);
    canvas {
      width: 100%; height: 100%;
    }
  }

  .center {
    position: absolute;
    top: 50%;
    left: 50%;
    text-align: center;
    transform: translate(-50%,-200px);

    .title {
      padding: 6px 0;
      font-size: 32px;
      color: #606266;
    }

    .button-wrapper {
      margin-top: 20px;
      text-align: center;
      span{
          color: rgba(240, 240, 240, 0.502); cursor: pointer;
      }
    }
  }
  .description {
    position: absolute; bottom: 20px; width: 100%;text-align: center;
  }
}

</style>
