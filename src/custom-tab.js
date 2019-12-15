class CustomTab extends HTMLElement {
  constructor () {
    super ()
    this.innerHTML+=`
    <style>
      .tablinks {
        background-color: inherit;
        float: left;
        border: none;
        outline: none;
        cursor: pointer;
        padding: 8px;
        transition: 0.3s;
        font-size: 12px;
        width: 50%;
        border: 1px solid #ccc;
      }
      
      .tablinks:hover {
        background-color: #ddd;
      }
      
      .tablinks.active {
        background-color: #ccc;
      }

      .tab-image {
        width: 22px;
        height: 22px;
      }

      .tab-selected {
        background-color: #cdcdcd;
      }
    </style>
    `
  }
  set init (tab) {
    this.innerHTML+= `
    <button class="tablinks" id="${tab.tabId}">
      <img class="tab-image" src="${tab.icon}">
    </button>
    `
  }

  setActiveTab (tabId) {
    let tablinks = document.getElementsByClassName("tablinks");
    for (let i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" tab-selected", "");
    }
    document.getElementById(tabId).className += " tab-selected";
  }
}

customElements.define('custom-tab', CustomTab)