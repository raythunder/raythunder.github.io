/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "fef756942a601a88de77321215689c1a"
  },
  {
    "url": "about/index.html",
    "revision": "c04577519cbfba93c9e88c89714aba96"
  },
  {
    "url": "assets/css/0.styles.42b78fe1.css",
    "revision": "9b28ea127695cf26a580af8843d9b826"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.e46eed41.js",
    "revision": "11793c057884306967107a12c061dd84"
  },
  {
    "url": "assets/js/11.4e365b57.js",
    "revision": "06d1244bc972a0391e797c62b1a33d29"
  },
  {
    "url": "assets/js/12.a5a83016.js",
    "revision": "3fe80dceaba5aa16d7eb712952ea3f98"
  },
  {
    "url": "assets/js/2.6fc8154e.js",
    "revision": "fb629434e9762af234f94e9b4bfe7fdb"
  },
  {
    "url": "assets/js/3.0f98737a.js",
    "revision": "d862ff8cc0f1b9a43c20d0f11446c137"
  },
  {
    "url": "assets/js/4.5bf56974.js",
    "revision": "c67bf99bed9df2093ef5c0aa242f76a5"
  },
  {
    "url": "assets/js/5.14e8ac65.js",
    "revision": "4dd69e03b6823c51f1a6bf42460a0d0f"
  },
  {
    "url": "assets/js/6.8d074b97.js",
    "revision": "15e5a7286eca647c9b83a73710ed19e5"
  },
  {
    "url": "assets/js/7.a7ce49d7.js",
    "revision": "8bb4d6cc6062d106900113309bc00b84"
  },
  {
    "url": "assets/js/8.c20934a2.js",
    "revision": "18ee1a40d9c41f6c1aa5cc6fceb8b779"
  },
  {
    "url": "assets/js/9.4206d11a.js",
    "revision": "637fc8f6edf43f36606f40fb9f6d4d2a"
  },
  {
    "url": "assets/js/app.63237d4d.js",
    "revision": "7d90eb43665d0042aa6647e2d023b5e7"
  },
  {
    "url": "blog/gulp.html",
    "revision": "c860676d4820cf01e3f906e22f475a38"
  },
  {
    "url": "blog/hello.html",
    "revision": "1e4e19778123a3691509db391a1d0e92"
  },
  {
    "url": "blog/leaflet1.html",
    "revision": "af584eedeb65e09d52571d97b75b4fbe"
  },
  {
    "url": "blog/leaflet2.html",
    "revision": "43ac07ac6b7e055e68bef19d5e909ed6"
  },
  {
    "url": "blog/leaflet3.html",
    "revision": "95eeb5f6900e8c974e4dedf6893991bc"
  },
  {
    "url": "blog/vueUse.html",
    "revision": "c267aeb194265f6ba4b2e14b59a906b9"
  },
  {
    "url": "img/logo.png",
    "revision": "cf23526f451784ff137f161b8fe18d5a"
  },
  {
    "url": "index.html",
    "revision": "22533027342d19ccb43f78e265c7b6be"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
