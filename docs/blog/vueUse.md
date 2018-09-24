---
title: Vuejs项目--问题总结
date: '2017-07-31'
cover: '/images/vue.png'
description: 项目中常见的问题总结
---
# Vuejs项目--问题总结

## mock本地数据及跨域处理

/build/dev-server.js

```javascript
app.use('/mock', express.static('./mock'))   // 根目录建立mock文件夹，存放json文件模拟数据
```

/config/index.js  设置代理

```javascript
dev: {
    env: require('./dev.env'),
    port: 8080,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      // proxy all requests starting with /api to jsonplaceholder
      '/api': {
        target: 'http://localhost:8080/mock/', // 此处为需要代理的远程地址
        changeOrigin: true,//true时可用来解决跨域问题
        pathRewrite: {
          '^/api': ''
        }
      }
    }
```

此时可通过http://localhost:8080/api/main.json访问http://localhost:8080/mock/main.json的数据

## keep-alive按需缓存页面

```html
<keep-alive>
	<router-view v-if="$route.meta.keepAlive"></router-view>
</keep-alive>
<router-view v-if="!$route.meta.keepAlive"></router-view>
```

router.js

```javascript
routes: [
    {
      path: '/',
      name: 'welcome',
      component: welcome,
      meta: { keepAlive: true }  // 添加此属性
    },
    {
      path: '/room',
      name: 'room',
      component: room
    }
  ]
```

页面生命周期

```	javascript
    created: function () {
      console.log(1)
    },
    mounted: function () {
      console.log(2)
    },
    activated: function () {
      console.log(3)
    },
    deactivated: function () {
      console.log(4)
    }
```

使用了`keep-alive`后数据需要进入页面在activated中再次获取，才能达到更新的目的

#### 异步队列更新

dom更新后执行方法使用

```
Vue.nextTick(callback)
```

#### 路由登录及用户权限管理

router.js

```javascript

{
    path: '/home',
    name: '订单中心',
    component: home,
    iconCls: 'glyphicon glyphicon-barcode',
    meta: {
      requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
    }
}


router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (getLocal('clearToken')) {
      next()
    } else {
      next({
        path: '/login'
      })
    }
  } else {
    next()
  }

  // 用户管理
  if (to.matched.some(r => r.path.indexOf('user') !== -1)) {
    if (getLocal('account') !== 'admin') {
      alert('您无权访问')
      next({
        path: '/home/orderList'
      })
    } else {
      next()
    }
  }
})
```

## 针对浏览器内核版本太低不支持es6新语法

```
npm install --save-dev babel-polyfill
```

/build/webpack.base.conf.js

```javascript
module.exports = {
  entry: {
    app: ["babel-polyfill", "./src/main.js"]
  }
```

## element-ui 上传控件问题

upload 组件在 :auto-upload="false"的情况下 同一文件选择后删除再重新选择不生效（不能重复选择同一文件）

修复方法，官方的github上应该已经修复，目前处理方法：上传按钮添加点击方法

```javascript
handleClick(){
  this.$refs.children[0].$el.file.value = null   // 大概是这么写，就是找到组件的file输入框，将值置为null
}
```

> 参考文章：
>
> 1. [路由开启keep-alive时的注意点](http://xiangsongtao.com/article/5853b2c0044bf1353af82fbf)