class SaveButton extends HTMLElement {
  constructor () {
    super ()
    this.innerHTML = `
      <style>
        .save-button-container {
          text-align: center;
          width: 100%;
        }
        #save-preferences {
          color: green;
        }
      </style>
      <div class="save-button-container">
        <i id="save-preferences" class="fa fa-check-circle fa-2x"></i>
      </div>
      <p style="padding: 2px 0px; margin: 0px;">You can only select 3 apps.</p>
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