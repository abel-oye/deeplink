(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.deeplink = factory());
}(this, (function () { 'use strict';

var ua = window.navigator.userAgent;

var browser = {
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

var index = {
  /**
   *
   * @param {string} schemeLink
   * @param {string} universalLink
   * @param {string|object} downloadLink 下载地址
   * @praam {function} success 唤起成功回调
   * @param {function} fial 唤起失败回调
   * @param {number} timeout 唤起超时，默认500ms
   * @param {string} type default: auto; iframe|location|link|intent
   */
  open: function open(options) {
    if (typeof options === 'string') {
      options = {
        url: options
      };
    }
  },
  browser: browser
};

return index;

})));
