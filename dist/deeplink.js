(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Deeplink = factory());
}(this, (function () { 'use strict';

  var ua = window.navigator.userAgent;

  var browser = {
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

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var DeepLink = function () {
    /**
     *
     * @param {string} schemeLink
     * @param {string} universalLink
     * @param {string|object} downloadLink
     * @param {string} packageName
     * @param {boolean} autoOpen
     * @param {funciton} success success callback
     * @param {function} fail fail callback
     * @param {number} timeout Invoking timeout default: 1500ms
     * @param {string} way default: auto; iframe|location|link|intent
     */
    function DeepLink(options) {
      classCallCheck(this, DeepLink);

      this.options = Object.assign({
        timeout: 2500, // Invoking the existence confirmation box lengthens the jump time
        way: 'auto',
        autoOpen: true
      }, options);

      if (!(this.options.schemeLink || this.options.universalLink)) {
        throw new Error('schemeLink or universalLink cannot be empty at the same time.');
      }

      if (this.options.universalLink && !/^https:\/\//.test(this.options.universalLink)) {
        throw new Error('universalLink must start with HTTPS.');
      }

      if (this.isDebug()) {
        console.log(browser);
      }

      if (this.options.autoOpen) {
        this.open();
      }
    }

    createClass(DeepLink, [{
      key: 'isDebug',
      value: function isDebug() {
        return true;
      }
    }, {
      key: 'getDwonloadLink',
      value: function getDwonloadLink() {
        var downloadLink = void 0;
        if (this.options.downloadLink) {
          if (typeof this.options.downloadLink === 'string') {
            downloadLink = this.options.downloadLink;
          } else if (_typeof(this.options.downloadLink) === 'object') {
            if (browser.isIOS && this.options.downloadLink['ios']) {
              downloadLink = this.options.downloadLink['ios'];
            } else if (browser.isAndroid && this.options.downloadLink['android']) {
              downloadLink = this.options.downloadLink['android'];
            }
          }
        }
        return downloadLink;
      }
      /**
       * Detection of status is for reference only
       */

    }, {
      key: 'onAppLaunched',
      value: function onAppLaunched() {
        var _this = this;

        var isOpen = false;
        var checkPageStatus = function checkPageStatus(e) {
          if (!isOpen) {
            isOpen = true;
            if (document.hidden) {
              _this.options.success && _this.options.success();
            }
          }
        };

        window.addEventListener('pagehide', checkPageStatus);
        window.addEventListener('unload', checkPageStatus);
        document.addEventListener('webkitvisibilitychange', checkPageStatus);
        document.addEventListener('visibilitychange', checkPageStatus);

        setTimeout(function () {
          if (!isOpen) {
            _this.openDownloadUrl();
          }
          window.removeEventListener('pagehide', checkPageStatus);
          window.removeEventListener('unload', checkPageStatus);
          document.removeEventListener('webkitvisibilitychange', checkPageStatus);
          document.removeEventListener('visibilitychange', checkPageStatus);
        }, this.options.timeout);
      }
    }, {
      key: 'openDownloadUrl',
      value: function openDownloadUrl() {
        this.options.fail && this.options.fail();

        var downloadLink = this.getDwonloadLink();

        if (downloadLink) {
          location.href = downloadLink;
        }
      }
    }, {
      key: 'open',
      value: function open() {
        if (browser.isIOS) {
          if (this.options.schemeLink) {
            this.openByLocation(this.options.schemeLink);
          }
        } else if (browser.isAndroid) {
          this.openByIframe(this.options.schemeLink);
          this.openByMockClick(this.options.schemeLink);
        }
      }
      /**
       *
       * @param {string} selector
       * @param {string} eventType default: click
       */

    }, {
      key: 'bind',
      value: function bind(selector) {
        var _this2 = this;

        var element = document.querySelector(selector);
        if (element) {
          element.addEventListener('click', function () {
            _this2.open();
          }, false);
        }
      }
    }, {
      key: 'openByIframe',
      value: function openByIframe(url) {
        if (this.isDebug()) {
          console.log('openByIframe ===>', url);
        }
        var ifr = document.createElement('iframe');
        ifr.src = url;
        ifr.style.display = 'none';
        document.body.appendChild(ifr);
        setTimeout(function () {
          document.body.removeChild(ifr);
        }, 1000);

        this.onAppLaunched();
      }
    }, {
      key: 'openByLocation',
      value: function openByLocation(url) {
        if (this.isDebug()) {
          console.log('openByLocation ===>', url);
        }

        this.onAppLaunched();

        location.href = url;
      }
    }, {
      key: 'openByMockClick',
      value: function openByMockClick(url) {
        if (this.isDebug()) {
          console.log('openByMockClick ===>', url);
        }
        var aLink = document.createElement('a');
        aLink.setAttribute('href', url);
        aLink.style.display = 'none';
        document.body.appendChild(aLink);
        var event = document.createEvent('HTMLEvents');
        event.initEvent('click', !1, !1);
        aLink.dispatchEvent(event);

        this.onAppLaunched();
      }
    }, {
      key: 'openByWindowOpen',
      value: function openByWindowOpen(url) {
        var win = void 0;
        try {
          win = window.open(url);
        } catch (e) {}
        win && window.close();
      }
    }]);
    return DeepLink;
  }();

  DeepLink.browser = browser;

  return DeepLink;

})));
