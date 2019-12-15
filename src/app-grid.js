class AppGrid extends HTMLElement {
  constructor () {
    super ()
  }

  set init (app) {
    this.innerHTML+=`
      <style>
        .grid-app-image {
          width: 33px;
          height: 33px;
          display: inline-block;
          margin: 0px 5px;
        }
        .active {
          mask-image: linear-gradient(black 0%, transparent 100%);
          -webkit-mask-image: linear-gradient(black 0%, transparent 100%);
        }
      </style>
      <img class="grid-app-image" src="${app.image}">
    `
  }

  setActiveApp (apps, index) {
    // let bkg = chrome.extension.getBackgroundPage()
    let requiredApp = document.getElementsByClassName('grid-app-image')[index]
    let count = 0
    if (requiredApp.classList.contains('active')) {
      requiredApp.classList.remove('active')
      apps[index].active = false
    } else {
      apps.forEach(app => {
        if(app.active) {
          count++
        }
      });
      if (count < 3) {
        requiredApp.classList.add('active')
        apps[index].active = true
      } else {
        // bkg.console.log('cannot add more than 3')
      }
    }
    return apps
  }
}

customElements.define('app-grid', AppGrid)