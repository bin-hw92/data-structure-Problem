class DarkMode {
    $DarkMode = null;
    constructor({ $target }) {
      const $DarkMode = document.createElement("input");
      $DarkMode.className = "dark-mode-wrap";
      $DarkMode.id = "dark-mode";
      $DarkMode.type = "checkbox";
      this.$DarkMode = $DarkMode;
      this.currentMode = window.matchMedia("(prefers-color-scheme: dark)").matches? "dark" : "light";
      $target.appendChild(this.$DarkMode);

      const $DarkModeLabel = document.createElement("label");
      $DarkModeLabel.setAttribute("for", "dark-mode");
      $DarkModeLabel.innerText = "DrakMode";
      this.$DarkModeLabel = $DarkModeLabel;
      $target.appendChild(this.$DarkModeLabel);
  
      this.render();
    }

    toggleMode() {
        const body = document.querySelector("body");
        const span = document.querySelector("label");
        if (this.currentMode == "dark") {
            this.currentMode = "light";
            body.className = "light";
            span.innerText = 'DarkMode';
        } else {
            this.currentMode = "dark";
            body.className = "dark";
            span.innerText = 'LightMode';
        }
    }

  render() {
      this.$DarkMode.addEventListener("click", (e) => {
          this.toggleMode();
      });
  }
}