import browser from './browser';

class DeepLink {
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
  constructor(options) {
    this.options = Object.assign(
      {
        timeout: 2500, // Invoking the existence confirmation box lengthens the jump time
        way: 'auto',
        autoOpen: true
      },
      options
    );

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
  isDebug() {
    return true;
  }
  getDwonloadLink() {
    let downloadLink;
    if (this.options.downloadLink) {
      if (typeof this.options.downloadLink === 'string') {
        downloadLink = this.options.downloadLink;
      } else if (typeof this.options.downloadLink === 'object') {
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
  onAppLaunched() {
    let isOpen = false;
    const checkPageStatus = e => {
      if (!isOpen) {
        isOpen = true;
        if (document.hidden) {
          this.options.success && this.options.success();
        }
      }
    };

    window.addEventListener('pagehide', checkPageStatus);
    window.addEventListener('unload', checkPageStatus);
    document.addEventListener('webkitvisibilitychange', checkPageStatus);
    document.addEventListener('visibilitychange', checkPageStatus);

    setTimeout(() => {
      if (!isOpen) {
        this.openDownloadUrl();
      }
      window.removeEventListener('pagehide', checkPageStatus);
      window.removeEventListener('unload', checkPageStatus);
      document.removeEventListener('webkitvisibilitychange', checkPageStatus);
      document.removeEventListener('visibilitychange', checkPageStatus);
    }, this.options.timeout);
  }
  openDownloadUrl() {
    this.options.fail && this.options.fail();

    const downloadLink = this.getDwonloadLink();

    if (downloadLink) {
      location.href = downloadLink;
    }
  }
  open() {
    if (browser.isIOS) {
      if (this.options.schemeLink) {
        this.openByLocation(this.options.schemeLink);
      } else {
        if (parseInt(browser.version, 10) >= 9) {
        }
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
  bind(selector, eventType = 'click') {
    const element = document.querySelector(selector);
    if (element) {
      element.addEventListener(
        'click',
        () => {
          this.open();
        },
        false
      );
    }
  }

  openByIframe(url) {
    if (this.isDebug()) {
      console.log(`openByIframe ===>`, url);
    }
    let ifr = document.createElement('iframe');
    ifr.src = url;
    ifr.style.display = 'none';
    document.body.appendChild(ifr);
    setTimeout(function () {
      document.body.removeChild(ifr);
    }, 1000);

    this.onAppLaunched();
  }

  openByLocation(url) {
    if (this.isDebug()) {
      console.log(`openByLocation ===>`, url);
    }

    this.onAppLaunched();

    location.href = url;
  }

  openByMockClick(url) {
    if (this.isDebug()) {
      console.log(`openByMockClick ===>`, url);
    }
    const aLink = document.createElement('a');
    aLink.setAttribute('href', url);
    aLink.style.display = 'none';
    document.body.appendChild(aLink);
    const event = document.createEvent('HTMLEvents');
    event.initEvent('click', !1, !1);
    aLink.dispatchEvent(event);

    this.onAppLaunched();
  }
  openByWindowOpen(url) {
    let win;
    try {
      win = window.open(url);
    } catch (e) {}
    win && window.close();
  }
}

DeepLink.browser = browser;

export default DeepLink;
