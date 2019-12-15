class SaveButton extends HTMLElement {
  constructor () {
    super ()
    this.innerHTML = `
      <style>
        .save-button-container {
          text-align: right;
          width: 100%;
        }
        #save-preferences {
          color: green;
        }
      </style>
      <div class="save-button-container">
        <i id="save-preferences" class="fa fa-check-circle fa-2x"></i>
      </div>
    `
  }

  saveChanges () {
    appInfo = []
    apps.forEach(app => {
      if (app.active) {
        appInfo.push(app)
      }
    })
  }
}

customElements.define('save-button', SaveButton)