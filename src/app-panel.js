class AppPanel extends HTMLElement {
  index = '';
  shareUrl = ''
  constructor () {   
    super()
  }

  connectedCallback () {
    var bkg = chrome.extension.getBackgroundPage();
    document.getElementsByClassName('app-panel__container')[this.index].addEventListener('mouseenter', (event) => {
      document.documentElement.style.setProperty('--background-color', appInfo[this.index].color);
      document.getElementsByClassName('app-panel__container')[this.index].innerHTML = this.displayIconFormat()
      this.addClickEvent()
    })
    document.getElementsByClassName('app-panel__container')[this.index].addEventListener('mouseleave', (event) => {
      document.getElementsByClassName('app-panel__container')[this.index].innerHTML = this.displayNameFormat()
    })
  }

  set info (information) {
    this.innerHTML = `
      <style>
        .app-panel__container {
          display: inline-block;
          width: 170px;
          height: 30px;
          background-color: #fda172;
          border-bottom: 1px solid #5b606a;
          padding: 8px;
          text-align: center;
        }
        .app-panel__container-text {
          color: white;
          font-size: 18px;
          font-family: 'Source Sans Pro';
        }
        .app-panel__container:hover {
          background-color: var(--background-color)
        }
        .app-panel__share-icon{
          width: 50%;
          float: right;
        }
        .fa {
          color: white;
          content: "\f09a"
          font-size: 14px;
          text-align: center;
          cursor: pointer;
        }
        .left-align {
          width: 50%;
          float: left;
        }
      </style> <div class="app-panel__container">` + this.displayNameFormat() +`</div>`
  }

  socialMediaClick (url) {
    window.open(url).focus()
  }

  displayNameFormat () {
    return `<span class = "app-panel__container-text">${appInfo[this.index].appName}</span>`
  }

  displayIconFormat () {
    if (appInfo[this.index].shareUrl) {
      return this.feedAndShare()
    } else {
      return this.onlyFeed()
    }
  }

  addClickEvent () {
    var bkg = chrome.extension.getBackgroundPage();
    if (document.getElementsByClassName('app-panel__share-icon')[0]) {
      document.getElementsByClassName('app-panel__share-icon')[0].addEventListener('click', () => {
        var shareUrl = appInfo[this.index].shareUrl
          chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
            var appPanelInstance = new AppPanel()
            appPanelInstance.socialMediaClick(shareUrl + tabs[0].url)
          });
      })
    }
    document.getElementsByClassName('app-panel__feed-icon')[0].addEventListener('click', () => {
      this.socialMediaClick(appInfo[this.index].feedUrl)
    })
  }

  feedAndShare () {
    return `<div class="app-panel__feed-icon left-align">
              <i class="${appInfo[this.index].faIconContent} fa-2x" aria-hidden="true"></i>
            </div>
            <div class="app-panel__share-icon">
              <i class="fa fa-share-alt fa-2x" aria-hidden="true"></i>
            </div>`
  }

  onlyFeed () {
    return `<div class="app-panel__feed-icon">
              <i class="${appInfo[this.index].faIconContent} fa-2x" aria-hidden="true"></i>
            </div>`
  }
}

customElements.define('app-panel', AppPanel)