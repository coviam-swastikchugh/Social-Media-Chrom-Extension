class CustomTab extends HTMLElement {
  constructor () {
    super ()
    this.innerHTML+=`
    <style>
      .tablinks {
        background-color: #696969;
        float: left;
        border: none;
        outline: none;
        cursor: pointer;
        padding: 8px;
        transition: 0.3s;
        font-size: 12px;
        width: 50%;
        border: 1px solid #5b606a;
        border-bottom: 3px solid #696969;
      }
      
      .tablinks:hover {
        background-color: #bbb;
      }

      .tab-image {
        width: 22px;
        height: 22px;
      }

      .tab-selected {
        border-bottom: 3px solid white;
      }
    </style>
    `
  }
  set init (tab) {
    this.innerHTML+= `
    <button class="tablinks" id="${tab.tabId}">
    <i class="${tab.icon} fa-2x" aria-hidden="true"></i>
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