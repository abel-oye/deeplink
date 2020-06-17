const ua = window.navigator.userAgent;

const get = (target = {}, key, defaultValue) => {
  if (target && target[key]) {
    return target[key];
  } else {
    return defaultValue;
  }
};

const browser = {
  isIOS: /\(i[^;]+;( U;)? CPU.+Mac OS X/.test(ua),
  isAndroid: /Android|Adr/.test(ua),
  isMobile: /Mobile/i.test(ua),
  isWechat: /MicroMessenger/i.test(ua)
};

if (browser.isAndroid) {
  /Android ([\d\.]+);/.test(ua);
  browser.version = RegExp.$1 || 'unknow';
} else if (browser.isIOS) {
  /iPhone OS (\d+_\d+(_\d)?)/.test(ua);
  browser.version = RegExp.$1 || 'unknow';
}

if (browser.isIOS) {
  browser.brand = 'apple';
} else if (browser.isAndroid) {
  /Android .*; (.*) (Build)/.test(ua);
  browser.brand = RegExp.$1 || 'unknow';
}

browser.vendor;

export default browser;
