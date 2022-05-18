class ImageInfo {
    $imageInfo = null;
    data = null;
    constructor({ $target, data }) {
      const $imageInfo = document.createElement("div");
      $imageInfo.className = "ImageInfo";
      this.$imageInfo = $imageInfo;
      $target.appendChild($imageInfo);
  
      this.data = data;
  
      this.render();
    }
  
    setState(nextData) {
      this.data = nextData;
      this.render();
      this.ModalClose();
    }
  
    ModalClose(){
      this.$imageInfo.addEventListener('click', (e) => {
          const $target = e.target.className;
          if($target === 'ImageInfo' || $target === 'close'){
            this.fadeOut(this.$imageInfo);
          }
      });
      window.addEventListener('keyup', (e) => {
        if(e.keyCode === 27){
          this.fadeOut(this.$imageInfo);
        }
      });
    }

    render() {
      if (this.data.visible) {
        const { name, url, temperament, origin } = this.data.image;
  
        this.$imageInfo.innerHTML = `
          <div class="content-wrapper">
            <div class="title">
              <span>${name}</span>
              <div class="close">x</div>
            </div>
            <img src="${url}" alt="${name}"/>        
            <div class="description">
              <div>성격: ${temperament}</div>
              <div>태생: ${origin}</div>
            </div>
          </div>`;
          this.fadeIn(this.$imageInfo);
      } else {
        this.$imageInfo.style.display = "none";
      }
    }


    //추가 작업 부분 fade In, Out 추가
    fadeIn(target) {
      let level = 0;
      let inTimer = setInterval( function(){
        level = level + 0.1
        target.style.opacity = level;
        target.style.filter = "alpha(opacity=" + (level * 100) + ");";
        if(level >= 1) clearInterval(inTimer);
      },10);
      
      target.style.display = "block";
    }

    fadeOut(target) {
      let level = 1;
      let inTimer = setInterval( function(){
        level = level - 0.1
        target.style.opacity = level;
        target.style.filter = "alpha(opacity=" + (level * 100) + ");";
        if(level <= 0){
          clearInterval(inTimer);
          target.style.display = "none";
        }
      },50);
    }

  }
  