class Loading {
    $Loading = null;
    data = null;
    constructor({ $target, data }) {
      const $Loading = document.createElement("div");
      $Loading.className = "ImageInfo Loading";
      this.$Loading = $Loading;
      $target.appendChild($Loading);
  
      this.data = data;
  
      this.render();
    }
  
    setState(nextData) {
      this.data = nextData;
      this.render();
    }

    render() {
        this.$Loading.innerHTML = `
            <div class="Loading_wrap">
                <div class='title'>Loading...</div>
            </div>
          `;
      if (this.data.visible) {
          this.$Loading.style.display = "block";
      } else {
        this.$Loading.style.display = "none";
      }
    }

  }