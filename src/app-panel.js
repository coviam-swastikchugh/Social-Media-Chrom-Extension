class AppPanel extends HTMLElement {
  constructor () {
    super()
  }

  set info (information) {
    this.innerHTML = `
      <style>
        .app-panel__container {
          border-bottom: 1px solid #cdcdcd;
        }
        .app-panel__information {
          display: inline-block;
          font-size: 11px;
          color: #aaa;
          line-height: 1.6;
        }
        .panel-image {
          display: inline-block;
          width: 25px;
          height: 25px;
        }
      </style>`
    if (information.appName !== 'instagram') {
      this.innerHTML += `<div class="app-panel__container">
        <a><img class="panel-image" src="${information.image}" data-href="${information.feedUrl}"></a>
        <div class="app-panel__information">
          Logged In As ${information.userName}
          <br>
          <share-button></share-button>
        </div>
      </div>`
    } else {
      this.innerHTML += `<div class="app-panel__container">
        <a><img class="panel-image" src="${information.image}" data-href="${information.feedUrl}"></a>
        <div class="app-panel__information">
          Logged In As ${information.userName}
          <br>
        </div>
      </div>`
    }
  }

  socialMediaClick (url) {
    window.open(url)
  }

  shareClick (url, tabUrl) {
    document.querySelector('share-button').shareUrl(url, tabUrl)
  }
}

customElements.define('app-panel', AppPanel)