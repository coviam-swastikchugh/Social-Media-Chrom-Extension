var date1 = 0, date2 = 0
window.addEventListener('DOMContentLoaded', (event) => {
  // var bkg = chrome.extension.getBackgroundPage();
  // bkg.console.log('food');
  let body = document.getElementsByClassName('body')[0]
  appInfo.forEach((app, index) => {
    let panel = document.createElement('app-panel')
    panel.info = app
    body.appendChild(panel)
    document.getElementsByTagName('a')[index].addEventListener('click', () => {
      panel.socialMediaClick(appInfo[index].feedUrl)
    })
    document.getElementsByTagName('button')[index].addEventListener('click', () => {
      // chrome.tabs.getSelected(null, function(tab) {
        
      // });
      chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
        var url = tabs[0].url;
        panel.shareClick(appInfo[index].shareUrl, tabs[0].url)
      });
    })
  })
});
function fbShare () {
  chrome.tabs.getSelected(null, function(tab) {
    window.open( 'https://www.facebook.com/sharer.php?u=' + tab.url, 'sharer', 'toolbar=0, status=0, width=626, height=436');return false;
  });
}

function getSelectedTab () {
  var bkg = chrome.extension.getBackgroundPage();
  let a = ''
  let sTab = chrome.tabs.getSelected(null, function(tab) {
    bkg.console.log(tab.url, '========');
    a = tab.url
    // return tab.url
  });
  bkg.console.log(sTab, a)
  return sTab
}