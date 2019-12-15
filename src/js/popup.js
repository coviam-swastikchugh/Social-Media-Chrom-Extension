var date1 = 0, date2 = 0
chrome.storage.local.get("appInfo", function(result){
  if(result.appInfo == null) {
    chrome.storage.local.set({'appInfo': appInfo});
  }
  else {
    appInfo = result.appInfo
  }
})
window.addEventListener('DOMContentLoaded', (event) => {
  setTimeout(() => {
    var bkg = chrome.extension.getBackgroundPage();
    let body = document.getElementsByClassName('body')[0]
    let panelContainer = document.getElementsByClassName('tabcontent')[0]
    let appGridContainer = document.getElementsByClassName('tabcontent')[1]
    panelContainer.setAttribute('id', tabs[0].containerId)
    appGridContainer.setAttribute('id',tabs[1].containerId)
    appInfo.forEach((app, index) => {
      let panel = document.createElement('app-panel')
      panel.index = index
      panel.info = app
      panelContainer.appendChild(panel)
    })
    this.setActiveAppsInAllApps()
    apps.forEach((appData, index) => {
      let app = new AppGrid ()
      app.init = appData
      appGridContainer.appendChild(app)
      if (appData.active) {
        appData.active = false
        apps = app.setActiveApp(apps, index)
      }
      document.getElementsByClassName('grid-app-image')[index].addEventListener('click', (event) => {
        apps = app.setActiveApp(apps, index)
      })
    })
    let saveButton = new SaveButton ()
    appGridContainer.appendChild(saveButton)
    document.getElementById('save-preferences').addEventListener('click', () => {
      saveButton.saveChanges()
      panelContainer.innerHTML = ''
      appInfo.forEach((app, index) => {
        let panel = document.createElement('app-panel')
        panel.index = index
        panel.info = app
        panelContainer.appendChild(panel)
      })
      this.setActiveTab(tabs[0].containerId)
      let tab = new CustomTab ()
      tab.setActiveTab(tabs[0].tabId)
      chrome.storage.local.set({'appInfo': appInfo});
    })
    let footer = document.getElementsByClassName('footer')[0]
    tabs.forEach((tabInfo, index) => {
      let tab = new CustomTab ()
      tab.init = tabInfo
      footer.appendChild(tab)
      document.getElementsByClassName('tablinks')[index].addEventListener('click', (event) => {
        this.setActiveTab(tabInfo.containerId)
        tab.setActiveTab(tabInfo.tabId)
        let app = new AppGrid ()
        this.setActiveAppsInAllApps()
        apps.forEach(existingApp => {
          if (existingApp.active) {
            app.setActiveApp (apps, index)
          }
        })
      })
    })
    this.setActiveTab(tabs[0].containerId)
    let tab = new CustomTab ()
    tab.setActiveTab(tabs[0].tabId)
  }, 50)
});

function setActiveTab (containerId) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  document.getElementById(containerId).style.display = "block";
}

function setActiveAppsInAllApps () {
  var bkg = chrome.extension.getBackgroundPage();
  apps.forEach(app => {
    app.active = false
  })
  appInfo.forEach((selectedApp, selectedAppIndex) => {
    apps.forEach((existingApp, index) => {
      if (selectedApp.appName === existingApp.appName) {
        existingApp.active = true
      }
    })
  })
}
