class ShareButton extends HTMLElement {
  url
  constructor () {
    super ()
    this.innerHTML = `
    <style>
    .share-button {
      font-size: 12px;
      border: 1px solid transparent;
      border-radius: 4px;
      margin: 2px 0px 5px;
      color: #adadad;
      padding: 2px;
      width: 70px;
      height: 25px;
      cursor: pointer;
      border: 1px solid #eee;
    }
    </style>
    <button class="share-button">
      Share
    </button>
  `
  }
  shareUrl (url, tabUrl) {
    window.open(url + tabUrl)
  }
}

window.customElements.define('share-button', ShareButton)