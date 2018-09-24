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
        <div class="description">
          <span id="typed"></span>
        </div>
      </div>

    </div>
    <!-- <div class="description">
      <span id="typed"></span>
    </div> -->
  </div>
</template>

<script>
import Typed from 'typed.js'
let rainArray = [
  '我带了伞，能否借你头顶的雨',
  '一场大雨这城市就陌生了',
  '有时，我听风过耳，我觉得为了听风过耳也值得出世为人',
  '你不在场，我是无人收割的麦田，徒具锋芒',
  "Life was like a box of chocolates, you never know what you're going to get.",
  '我还有许多弯路要走，还会失望于许许多多的满足。——一切都要等日后才能显示它的意义',
  '从结尾开始讲一个故事，似乎颇为奇怪。但是所有结局亦是开端。我们只是当时不知道而已',
  '在某种意义上，一个人想要的就是他能得到的。他的灵魂就是他命运的先知',
  '我们坐在窗前看雨夜，闪电慌乱，眼神迷离，说到曾经爱过的人，最好的结局是一场瓢泼大雨'
]
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
    rainArray.sort(() => {
      return Math.random() - 0.5
    })
    var options = {
      strings: rainArray,
      typeSpeed: 40,
      loop: true,
      backDelay: 6000
    }

    var typed = new Typed('#typed', options)
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
    padding-top: 30px;
  }
}

</style>
