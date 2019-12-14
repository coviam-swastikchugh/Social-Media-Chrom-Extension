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
        img {
          display: inline-block;
        }
      </style>
      <div class="app-panel__container">
        <a><img src="${information.image}" data-href="${information.feedUrl}"></a>
        <div class="app-panel__information">
          Logged In As ${information.userName}
          <br>
        </div>
      </div>
    `;
  }

  connectedCallback () {
    let sh = this.attachShadow({mode: 'open'})
    let shareButton = document.createElement('share-button')
    document.appendChild(shareButton)
  }

  socialMediaClick (url) {
    window.open(url)
  }
}

customElements.define('app-panel', AppPanel)