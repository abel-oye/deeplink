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
  if (/Android ([\d\.]+);/.test(ua)) {
    browser.version = RegExp.$1 || 'unknow';
  }
} else if (browser.isIOS) {
  if (/iPhone OS (\d+_\d+(_\d)?)/.test(ua)) {
    browser.version = RegExp.$1 || 'unknow';
  }
}

if (browser.isIOS) {
  browser.brand = 'apple';
} else if (browser.isAndroid) {
  /**
   * nomarl: Mozilla/5.0 (Linux; Android 8.0; Pixel 2 Build/OPD3.170816.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Mobile Safari/537.36
   * moto : Mozilla/5.0 (Linux; Android 6.0.1; Moto G (4)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Mobile Safari/537.36
   */
  if (/Android .*; (.*) Build/.test(ua) || /Android .*; (.*) AppleWebKit/.test(ua)) {
    browser.brand = RegExp.$1 || 'unknow';
  }
}

browser.vendor;

export default browser;
