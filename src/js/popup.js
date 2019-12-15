var date1 = 0, date2 = 0
window.addEventListener('DOMContentLoaded', (event) => {
  var bkg = chrome.extension.getBackgroundPage();
  let body = document.getElementsByClassName('body')[0]
  appInfo.forEach((app, index) => {
    let panel = document.createElement('app-panel')
    panel.index = index
    panel.info = app
    body.appendChild(panel)
  })
});