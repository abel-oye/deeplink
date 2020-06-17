import browser from './browser';

function openByIframe(url) {
  let ifr = document.createElement('iframe');
  ifr.src = url;
  ifr.style.display = 'none';
  document.body.appendChild(ifr);
  setTimeout(function () {
    document.body.removeChild(ifr);
  }, 1000);
}

function openByLocation(url) {
  location.href = url;
}

function openByMockClick(url) {
  let aLink = document.createElement('a');
  aLink.setAttribute('href', url);
  aLink.style.display = 'none';
  document.body.appendChild(aLink);
  let event = document.createEvent('HTMLEvents');
  event.initEvent('click', !1, !1);
  aLink.dispatchEvent(event);
}

export default {
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
  open: function (options) {
    if (typeof options === 'string') {
      options = {
        url: options
      };
    }
  },
  browser
};
