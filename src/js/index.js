var date1 = 0, date2 = 0
window.addEventListener('DOMContentLoaded', (event) => {
  // var bkg = chrome.extension.getBackgroundPage();
  // bkg.console.log('food');
  let body = document.getElementsByClassName('body')[0]
  appInfo.forEach((app, index) => {
    let panel = document.createElement('app-panel')
    let shareButton = document.createElement('share-button');
    shareButton.url = appInfo.shareUrl
    panel.info = app
    body.appendChild(panel)
    document.getElementsByTagName('a')[index].addEventListener('click', () => {
      panel.socialMediaClick(appInfo[index].feedUrl)
    })
    panel.appendChild(shareButton)
  })
});
function fbShare () {
  chrome.tabs.getSelected(null, function(tab) {
    window.open( 'https://www.facebook.com/sharer.php?u=' + tab.url, 'sharer', 'toolbar=0, status=0, width=626, height=436');return false;
  });
}