English | [简体中文](./README_zh-CN.md)  

# deeplink
[![NPM version](https://img.shields.io/npm/v/dplink.svg?style=flat)](https://npmjs.org/package/dplink)

> Mobile deep links for the web
deeplink is designed to add deep links to the web in an easy and stable way.

Mobile deep links are links that refer to apps instead of another web page. Opening things in apps can vastly improve a user’s experience.


## Install
```js
 npm install dplink 
 // or
 yarn add dplink
```


## Usage
```js
 import Dplink from 'dplink'

 const dplink = new Dplink({
    schemeLink:'myapp://',
    universalLink:'https://u.myhost.com/',
    downloadLink:{
        ios:'https://apps.apple.com/us/app/appname/idxxxxxxx?ign-mpt=uo%3D4',
        android:'https://download.myhost.com/app.apk'
    },
    autoOpen:true,
    success:function(){

    },
    fail:function(){

    },
    timeout:500,
    way:'auto',// default: auto; iframe|location|lin
 })

 dplink.bind('#openapp');

 dplink.open()
```

## Supported Info
### Android
 | os version | brand   | series            | browser                 | auto open | click |
 | ---------- | ------- | ----------------- | ----------------------- | --------- | ----- |
 | 8.1.0、10  | HUAWEI  | Honor 8c、p20     | Any                     | ✔️         | ✔️     |
 | 10、9      | Xiaomi  | MI 9、Redmi 6 pro | MiuiBrowser、MQQBrowser | ✖️         | ✔️     |
 | 9          | Xiaomi  | Redmi 6 pro       | BaiduBoxapp             | ✔️         | ✔️     |
 | 7.1.2      | vivo    | vivox9            | Default、MQQBrowser     | ✖️         | ✔️     |
 | 7.1.2      | vivo    | vivox9            | SougouMobileBrowser     | ✔️         | ✔️     |
 | 10         | samsung |                   | Any                     | ✖️         | ✔️     |
 | 10         | samsung |                   | Quark                   | ✔️         | ✔️     |

## Reference
- Android [App Links](https://developer.android.com/training/app-links/index.html)
- iOS [Universal Links](https://developer.apple.com/library/ios/documentation/General/Conceptual/AppSearch/UniversalLinks.html)