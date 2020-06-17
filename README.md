# deeplink
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
    fial:function(){

    },
    timeout:500,
    way:'auto',// default: auto; iframe|location|lin
 })

 dplink.bind('#openapp');

 dplink.open()
```

## Reference
- Android [App Links](https://developer.android.com/training/app-links/index.html)
- iOS [Universal Links](https://developer.apple.com/library/ios/documentation/General/Conceptual/AppSearch/UniversalLinks.html)