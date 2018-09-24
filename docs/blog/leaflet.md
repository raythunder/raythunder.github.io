---
title: Leaflet 笔记
date: '2017-09-01'
cover: '/images/leaflet.png'
description: An open-source JavaScript library for mobile-friendly interactive maps。所有示例，使用版本为Leaflet 1.2.0
---
# Leaflet 笔记

> an open-source JavaScript library for mobile-friendly interactive maps。所有示例，使用版本为Leaflet 1.2.0

## 初始化


### 资源引入

```html
<link rel="stylesheet" href="src/css/leaflet.css">
<script src="src/js/leaflet.js"></script>
<!-- 加载国产瓦片服务 https://github.com/htoooth/Leaflet.ChineseTmsProviders -->
<script src="src/js/leaflet.ChineseTmsProviders.js"></script>
```

### 图层加载   [demo](https://raythunder.github.io/leafletDemo/index.html)

```javascript
// 高德地图
var normalm = L.tileLayer.chinaProvider('GaoDe.Normal.Map', {
    maxZoom: 18,
    minZoom: 15
});
var normal = L.layerGroup([normalm])

var layer = {
    imageUrl: 'src/images/map2.png',
    imageBounds: [
        [28.710463073923, 120.621643066406],
        [28.668901074144, 120.590744018555]
    ]
}
// 叠加单张图片
var imageLayer = L.imageOverlay(layer.imageUrl, layer.imageBounds, {
    zIndex: 0,
    className: ' base-map'
})

// var map = L.map('map').setView([35.10418, -106.62987],10);
var map = L.map('map', {
    center: [28.6896820740335, 120.6061935424805],
    zoom: 12,
    layers: [normal,imageLayer],  // 图层
    zoomControl: false
});
```

## 添加自定义元素

### 添加点、线、面、矩形、圆形   [demo](https://raythunder.github.io/leafletDemo/addSome.html)

```javascript
var points = [
	[28.688366492227118, 120.61868190765382],
	[28.6949545472659, 120.61331748962404],
	[28.69024883597087, 120.59941291809083]
]
var markOption = {
  title: "MyPoint",
  alt: "The Big I",
  draggable: true
}

// 标注
L.marker(points[0], markOption).addTo(map)
L.marker(points[1], markOption).addTo(map)
L.marker(points[2], markOption).addTo(map)

// 线
L.polyline(points, { color: 'red', weight: 3 }).addTo(map);

// 多条线组合  同一个polyline方法，使用嵌套数组
var line1=[
  [28.696686195776927,120.59344768524171],
  [28.692545249508495,120.59675216674806]
]
var line2=[
  [28.696347397235485,120.59838294982912],
  [28.69299699706187,120.59370517730714]
]
L.polyline([line1,line2],{color:'blue',weight:5}).addTo(map)

// 面
var points2 = [
  [28.683509889086483, 120.60370445251465],
  [28.685392320137506, 120.61087131500246],
  [28.68226746605653, 120.61258792877199],
  [28.678314203814065, 120.60370445251465]
]

L.polygon(points2, { color: 'red', weight: 3, fillColor: 'blue', fillOpacity: 0.5 }).addTo(map);

// 多图形组合
var shap1=[
  [28.700601121587397,120.60447692871095],
  [28.702746739951483,120.60971260070802],
  [28.698794250948982,120.6092405319214]
]
var shap2=[
  [28.69913304156993,120.60640811920167],
  [28.70289730800929,120.60851097106935],
  [28.699735333299223,120.61142921447755]
]
L.polygon([shap1,shap2], { color: 'red', weight: 3, fillColor: 'blue', fillOpacity: 0.5 }).addTo(map);


// 矩形
var pos1 = [
  [28.703160801589114, 120.6017303466797],  // 右上角
  [28.699885905689943, 120.59361934661867]  // 左下角
]
L.rectangle(pos1,{ color: "black", weight: 5, fillColor: "blue" }).addTo(map);

// 圆形
L.circle([28.703085517776877, 120.61507701873781], 346.72,
         {color: "yellow",weight:2,fillColor:"blue"}).addTo(map);
```

### 图层组合（Groups of layers ）   [demo](https://raythunder.github.io/leafletDemo/layer.html)

将不同类型的元素组合放在一个图层

```javascript
// 标注
var marker = L.marker([28.691189995151863, 120.60589313507081]).bindPopup("I am Marker1");
var marker2 = L.marker([28.68716177447119, 120.60769557952882]).bindPopup("I am Marker2");

var shapPoint = [
  [28.693524033410263, 120.61151504516603],
  [28.688855904856077, 120.60121536254884]
]
// 矩形
var shap = L.rectangle(shapPoint).bindPopup("I am a rectangle");

// 组合图层
var myLayerGroup = L.layerGroup([marker, shap])
myLayerGroup.addTo(map);
// map.addLayer(myLayerGroup)

// 向图层组合上继续添加元素
myLayerGroup.addLayer(marker2)

document.getElementById('btn1').onclick = function () {
  myLayerGroup.removeLayer(marker2)  // 从图层组合中移除元素
}
document.getElementById('btn2').onclick = function () {
  marker2.bindPopup("我已经不在图层组合里了。删不掉我").addTo(map) 
  marker2.openPopup();
}
document.getElementById('btn3').onclick = function () {
  map.removeLayer(myLayerGroup)   // 删除图层组合
}
document.getElementById('btn4').onclick = function () {
  map.addLayer(myLayerGroup)  // 添加图层组合
}
```

### 功能组合（Feature groups ）

是LayerGroup的扩展，但多了鼠标事件和共享的弹出框方法。

```javascript
var marker3 = L.marker([28.70436533521879, 120.60267448425293]).bindPopup("I am Marker3");
var shapPoint2 = [
  [28.704741749134378, 120.61469078063966],
  [28.700977549043778, 120.60619354248048]
]
// 矩形
var shap2 = L.rectangle(shapPoint2).bindPopup("I am a rectangle");
var myfeatureGroup = L.featureGroup([marker3, shap2])
.addTo(map).setStyle({ color: 'purple', opacity: .5 })
.bindPopup("我们共用同一个弹出 because we are a group")
.openPopup();
```

### 弹出（Pop ups）

```javascript
// 自定义弹出
var mark4 = L.marker([28.697552009289318, 120.60031414031984]).addTo(map)
mark4.bindPopup("<h1>My Marker</h1><p>This is information about the marker</p><ul><li>Info 1</li><li>Info 2</li><li>Info 3</li></ul>").openPopup()
```

```javascript
// 创建popup实例，再分配给对象
var mypopup = L.popup({keepInView:true,closeButton:false})
.setContent("<h1>My Marker2</h1><p>This is information about the marker</p><ul><li>Info 1</li><li>Info 2</li><li>Info 3</li></ul>");
var mark5 = L.marker([28.69435222802519, 120.61666488647462]).bindPopup(mypopup).addTo(map)
```

## 移动端适配

### css

```css
body {
    padding: 0;
    margin: 0;
}
html, body, #map {
    height: 100%;
    width: 100vw;
}
```

### meta

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
```

### 定位 [demo](https://raythunder.github.io/leafletDemo/locate.html)

获取定位必须要https协议。PC chrome浏览器位置服务调用  https://www.googleapis.com/  需要翻墙才可获取到位置

```javascript
map.locate({
  watch: true,  // 开始使用W3C watchPosition方法连续观察位置变化（而不是检测一次）, 停止观察使用map.stopLocate()
  setView: false, // 定位后地图是否设置到当前位置
  enableHighAccuracy: true,  // 是否启用高精度
  timeout: 30 * 1000  // 触发locationerror事件之前等待地理定位响应的毫秒数 
});

map.on('locationfound', foundLocation);
map.on('locationerror', notFoundLocation);

function foundLocation(e){}
function notFoundLocation(e){}
```

leaflet获得的位置是WGS-84原始*坐标系*  。对应到高德地图(GCJ－02坐标系)的位置需要进行转换。下面是一些常用的位置转换函数

```javascript
var PointTransformation = {
  PI: 3.14159265358979324,
  x_pi: 3.14159265358979324 * 3000.0 / 180.0,
  delta: function(lat, lon) {
    // Krasovsky 1940
    //
    // a = 6378245.0, 1/f = 298.3
    // b = a * (1 - f)
    // ee = (a^2 - b^2) / a^2;
    var a = 6378245.0; //  a: 卫星椭球坐标投影到平面地图坐标系的投影因子。
    var ee = 0.00669342162296594323; //  ee: 椭球的偏心率。
    var dLat = this.transformLat(lon - 105.0, lat - 35.0);
    var dLon = this.transformLon(lon - 105.0, lat - 35.0);
    var radLat = lat / 180.0 * this.PI;
    var magic = Math.sin(radLat),
      magic = 1 - ee * magic * magic;
    var sqrtMagic = Math.sqrt(magic),
      dLat = dLat * 180.0 / (a * (1 - ee) / (magic * sqrtMagic) * this.PI),
      dLon = dLon * 180.0 / (a / sqrtMagic * Math.cos(radLat) * this.PI);
    var pt = { lat: dLat, lon: dLon };
    return pt;
  },

  //WGS-84 to GCJ-02
  gcj_encrypt: function(wgsLat, wgsLon) {
    if (this.outOfChina(wgsLat, wgsLon)) return { lat: wgsLat, lon: wgsLon };

    var d = this.delta(wgsLat, wgsLon);
    var pt = { lat: wgsLat + d.lat, lon: wgsLon + d.lon };
    return pt;
  },
  //GCJ-02 to WGS-84
  gcj_decrypt: function(gcjLat, gcjLon) {
    if (this.outOfChina(gcjLat, gcjLon)) return { lat: gcjLat, lon: gcjLon };

    var d = this.delta(gcjLat, gcjLon);
    var pt = { lat: gcjLat - d.lat, lon: gcjLon - d.lon };
    return pt;
  },
  //GCJ-02 to WGS-84 exactly
  gcj_decrypt_exact: function(gcjLat, gcjLon) {
    var initDelta = 0.01;
    var threshold = 0.000000001;
    var dLat = initDelta,
      dLon = initDelta;
    var mLat = gcjLat - dLat,
      mLon = gcjLon - dLon;
    var pLat = gcjLat + dLat,
      pLon = gcjLon + dLon;
    var wgsLat,
      wgsLon,
      i = 0;
    while (1) {
      wgsLat = (mLat + pLat) / 2;
      wgsLon = (mLon + pLon) / 2;
      var tmp = this.gcj_encrypt(wgsLat, wgsLon),
        dLat = tmp.lat - gcjLat,
        dLon = tmp.lon - gcjLon;
      if (Math.abs(dLat) < threshold && Math.abs(dLon) < threshold) break;

      if (dLat > 0) pLat = wgsLat;
      else mLat = wgsLat;
      if (dLon > 0) pLon = wgsLon;
      else mLon = wgsLon;

      if (++i > 10000) break;
    }
    var pt = { lat: wgsLat, lon: wgsLon };
    return pt;
  },
  //GCJ-02 to BD-09
  bd_encrypt: function(gcjLat, gcjLon) {
    var x = gcjLon,
      y = gcjLat;
    var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * this.x_pi);
    var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * this.x_pi);
    bdLon = z * Math.cos(theta) + 0.0065;
    bdLat = z * Math.sin(theta) + 0.006;
    var pt = { lat: bdLat, lon: bdLon };
    return pt;
  },
  //BD-09 to GCJ-02
  bd_decrypt: function(bdLat, bdLon) {
    var x = bdLon - 0.0065,
      y = bdLat - 0.006;
    var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * this.x_pi);
    var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * this.x_pi);
    var gcjLon = z * Math.cos(theta);
    var gcjLat = z * Math.sin(theta);
    var pt = { lat: gcjLat, lon: gcjLon };
    return pt;
  },
  //WGS-84 to Web mercator
  //mercatorLat -> y mercatorLon -> x
  mercator_encrypt: function(wgsLat, wgsLon) {
    var x = wgsLon * 20037508.34 / 180;
    var y = Math.log(Math.tan((90 + wgsLat) * this.PI / 360)) / (this.PI / 180);
    y = y * 20037508.34 / 180;
    var pt = { lat: y, lon: x };
    return pt;
    /*
         if ((Math.abs(wgsLon) > 180 || Math.abs(wgsLat) > 90))
         return null;
         var x = 6378137.0 * wgsLon * 0.017453292519943295;
         var a = wgsLat * 0.017453292519943295;
         var y = 3189068.5 * Math.log((1.0 + Math.sin(a)) / (1.0 - Math.sin(a)));
         return {'lat' : y, 'lon' : x};
         //*/
  },
  // Web mercator to WGS-84
  // mercatorLat -> y mercatorLon -> x
  mercator_decrypt: function(mercatorLat, mercatorLon) {
    var x = mercatorLon / 20037508.34 * 180;
    var y = mercatorLat / 20037508.34 * 180;
    y =
      180 /
      this.PI *
      (2 * Math.atan(Math.exp(y * this.PI / 180)) - this.PI / 2);
    var pt = { lat: y, lon: x };
    return pt;
    /*
         if (Math.abs(mercatorLon) < 180 && Math.abs(mercatorLat) < 90)
         return null;
         if ((Math.abs(mercatorLon) > 20037508.3427892) || (Math.abs(mercatorLat) > 20037508.3427892))
         return null;
         var a = mercatorLon / 6378137.0 * 57.295779513082323;
         var x = a - (Math.floor(((a + 180.0) / 360.0)) * 360.0);
         var y = (1.5707963267948966 - (2.0 * Math.atan(Math.exp((-1.0 * mercatorLat) / 6378137.0)))) * 57.295779513082323;
         return {'lat' : y, 'lon' : x};
         //*/
  },
  // two point's distance
  distance: function(latA, lonA, latB, lonB) {
    var earthR = 6371000;
    var x =
      Math.cos(latA * this.PI / 180) *
      Math.cos(latB * this.PI / 180) *
      Math.cos((lonA - lonB) * this.PI / 180);
    var y = Math.sin(latA * this.PI / 180) * Math.sin(latB * this.PI / 180);
    var s = x + y;
    if (s > 1) s = 1;
    if (s < -1) s = -1;
    var alpha = Math.acos(s),
      distance = alpha * earthR;
    return distance;
  },
  outOfChina: function(lat, lon) {
    if (lon < 72.004 || lon > 137.8347) return true;
    if (lat < 0.8293 || lat > 55.8271) return true;
    return false;
  },
  transformLat: function(x, y) {
    var ret =
      -100.0 +
      2.0 * x +
      3.0 * y +
      0.2 * y * y +
      0.1 * x * y +
      0.2 * Math.sqrt(Math.abs(x));
    ret +=
      (20.0 * Math.sin(6.0 * x * this.PI) +
        20.0 * Math.sin(2.0 * x * this.PI)) *
      2.0 /
      3.0;
    ret +=
      (20.0 * Math.sin(y * this.PI) + 40.0 * Math.sin(y / 3.0 * this.PI)) *
      2.0 /
      3.0;
    ret +=
      (160.0 * Math.sin(y / 12.0 * this.PI) +
        320 * Math.sin(y * this.PI / 30.0)) *
      2.0 /
      3.0;
    return ret;
  },
  transformLon: function(x, y) {
    var ret =
      300.0 +
      x +
      2.0 * y +
      0.1 * x * x +
      0.1 * x * y +
      0.1 * Math.sqrt(Math.abs(x));
    ret +=
      (20.0 * Math.sin(6.0 * x * this.PI) +
        20.0 * Math.sin(2.0 * x * this.PI)) *
      2.0 /
      3.0;
    ret +=
      (20.0 * Math.sin(x * this.PI) + 40.0 * Math.sin(x / 3.0 * this.PI)) *
      2.0 /
      3.0;
    ret +=
      (150.0 * Math.sin(x / 12.0 * this.PI) +
        300.0 * Math.sin(x / 30.0 * this.PI)) *
      2.0 /
      3.0;
    return ret;
  }
};
```

使用https协议时，marker需要使用自定义的icon。否则无法显示（？）。

```javascript
var myicon = L.icon({
  iconUrl: 'src/css/images/marker-icon.png',
  iconSize: [25, 41],  // 图片大小
  iconAnchor: [12.5, 41],  // 图片尖角的位置偏移，设置大小后，图标默认居中显示
  popupAnchor: [1.5, -24]   // 弹出相对于图标的偏移位置
})
L.marker(latlng, { icon: myicon }).addTo(map)
.bindPopup("You are within " + radius + " meters from this point").openPopup();
```

### 事件

```javascript
map.on('click', function (e) {
  var myMarker = L
    .marker(e.latlng, {
      draggable: true
    })
    .addTo(map);

  myMarker.on('dragend', whereAmI);

  function whereAmI() {
    myMarker.bindPopup("I have been moved to:" + String(myMarker.getLatLng()));
  }
});

var marker1 = L
  .marker([28.69209, 120.61388])
  .addTo(map)
  .bindPopup(createPopup("Text as aparameter"));

function createPopup(x) {
  return L
    .popup({ keepInView: true, closeButton: false })
    .setContent(x)
}
```


