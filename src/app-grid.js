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
          padding: 3px 5px;
        }
        .active {
          -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
            0 0 8px rgba(100, 100, 100, 0.9);
          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
            0 0 8px rgba(100, 100, 100, 0.9);
        }
      </style>
      <img class="grid-app-image" src="${app.image}">
    `
  }

  removeActiveApps (apps) {
    apps.forEach(app => {
      if (app.classList.contains('active')) {
        app.classList.remove('active')
      }
    })
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