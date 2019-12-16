class AppPanel extends HTMLElement {
  index = '';
  constructor () {   
    super()
  }

  connectedCallback () {
    document.getElementsByClassName('app-panel__container')[this.index].addEventListener('mouseenter', (event) => {
      document.documentElement.style.setProperty('--background-color', appInfo[this.index].color);
      let bkg = chrome.extension.getBackgroundPage()
      bkg.console.log(appInfo[this.index].color)
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
          width: 180px;
          height: 30px;
          background-color: #696969;
          border-bottom: 1px solid #5b606a;
          padding: 11.5px 0px;
          text-align: center;
        }
        .app-panel__container-text {
          color: white;
          font-size: 18px;
          font-family: 'Source Sans Pro';
        }
        .app-panel__container:hover {
          background-color: var(--background-color);
        }
        .app-panel__share-icon{
          width: 50%;
          float: right;
          display: inline-block;
          margin-top: -24px;
        }
        .app-panel__search-input {
          width: 90px;
          height: 15px;
          border-radius: 4px;
          text-align: center;
        }
        .app-panel__search-button {
          padding: 0px 5px;
          font-size: 20px;
        }
        .fa {
          color: white;
          content: "\f09a"
          text-align: center;
          cursor: pointer;
        }
        .left-align {
          text-align: left;
          padding: 0px 40px;
        }
        img {
          height: 30px;
          width: 30px;
          cursor: pointer;
        }
      </style><div class="app-panel__container">` + this.displayNameFormat() +`</div>`
  }

  socialMediaClick (url) {
    window.open(url).focus()
  }

  displayNameFormat () {
    return `<span class = "app-panel__container-text">${appInfo[this.index].appName}</span>`
  }

  displayIconFormat () {
    if (appInfo[this.index].actionType === 'share') {
      return this.feedAndShare()
    } else if (appInfo[this.index].actionType === 'search') {
      return this.onlySearch()
    } else {
      return this.onlyFeed()
    }
  }

  addClickEvent () {
    if (document.getElementsByClassName('app-panel__share-icon')[0]) {
      document.getElementsByClassName('app-panel__share-icon')[0].addEventListener('click', () => {
        var shareUrl = appInfo[this.index].actionUrl
          chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
            var appPanelInstance = new AppPanel()
            appPanelInstance.socialMediaClick(shareUrl + tabs[0].url)
          });
      })
    }
    if (document.getElementsByClassName('app-panel__feed-icon')[0]) {
      document.getElementsByClassName('app-panel__feed-icon')[0].addEventListener('click', () => {
        this.socialMediaClick(appInfo[this.index].feedUrl)
      }) 
    }
    if (document.getElementsByClassName('app-panel__search-button')[0]) {
      document.getElementsByClassName('app-panel__search-button')[0].addEventListener('click', (e) => {
        this.searchKeyword(document.getElementsByClassName('app-panel__search-input')[0].value)
      })
      document.getElementsByClassName('app-panel__search-input')[0].addEventListener('keypress', (e) => {
        var key = e.which || e.keyCode;
        if (key === 13) {
          this.searchKeyword(e.target.value)
        }
      })
    }
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
    if (appInfo[this.index].faIconContent) {
      return `<div class="app-panel__feed-icon">
              <i class="${appInfo[this.index].faIconContent} fa-2x" aria-hidden="true"></i>
            </div>`
    } else {
      return `<div class="app-panel__feed-icon">
              <img src="${appInfo[this.index].image}">
            </div>`
    }
  }

  onlySearch () {
    return `<div class="app-panel__search">
              <input type="text" class="app-panel__search-input"/>
              <i class="fa fa-search fa-2x app-panel__search-button" aria-hidden="true"></i>
            </div>`
  }

  searchKeywordGen (appName, keyword) {
    if (keyword.split(' ').length > 1) {
      if (appName === 'Amazon') {
        return keyword.split(' ').join('+')
      } else if (appName === 'Flipkart') {
        return keyword
      } else if (appName === 'Myntra') {
        return keyword.split(' ').join('-')
      }
    } else return keyword
  }

  searchKeyword (keyWord) {
    window.open(appInfo[this.index].actionUrl + this.searchKeywordGen(appInfo[this.index].appName, keyWord))
  }
}

customElements.define('app-panel', AppPanel)