class ShareButton extends HTMLElement {
  url
  constructor () {
    super ()
    this.innerHTML = 'hello'
  }
  set url (url) {
    this.url = url
    this.innerHTML = `
      <button class="share-button">
        Share
      </button>
    `
  }
}

window.customElements.define('share-button', ShareButton)