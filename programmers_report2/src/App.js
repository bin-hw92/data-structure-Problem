console.log("app is running!");

class App {
  $target = null;
  data = [];
  sessionData = [];

  constructor($target) {
    this.$target = $target;

    this.darkMode = new DarkMode({$target});

    this.searchInput = new SearchInput({
      $target,
      onSearch: async keyword => {
        this.loading.setState({
          visible: true,
        });
        try {
          await api.fetchCats(keyword).then(({ data }) => {
            this.setState(data); //결과 값 출력을 위해 상태 변경
            this.storage("resultData", data); //해당 결과 값 로컬 스토리지에 저장
          });
          this.storage("keywords", keyword);
        } catch (e) {
          console.log(e);
        }finally {
          this.loading.setState({
            visible: false,
          });
        }
      },
      onClick: async () => {
        this.loading.setState({
          visible: true,
        });
        try {
          const reponst = await api.randomCats();
            this.randomResult.setState(data, true);// 랜덤 결과 값 출력을 위해 상태 변경
            this.storage("randomData", data); //해당 결과 값 로컬 스토리지에 저장
        } catch (e) {
          console.log(e);
        }finally {
          this.loading.setState({
            visible: false,
          });
        }
      }
    });

    this.keywords = new KeyWords({$target,
      onClick: async keyword => {
        this.loading.setState({
          visible: true,
        });
        try {
          await api.fetchCats(keyword).then(({ data }) => {
            this.setState(data); //결과 값 출력을 위해 상태 변경
            this.storage("resultData", data); //해당 결과 값 로컬 스토리지에 저장
          });
          this.storage("keywords", keyword);
        } catch (e) {
          console.log(e);
        }finally {
          this.loading.setState({
            visible: false,
          });
        }
      }
    });

    this.randomResult = new RandomResult({
      $target,
      initialData: this.data,
      visible : false,
      onClick: async image => {
        const $imageInfo = this.imageInfo;
        this.loading.setState({
          visible: true,
        });
        try {
          await api.fetchCatsId(image.id).then(({ data }) => 
            $imageInfo.setState({
              visible: true,
              image : data
            })
          );
        } catch (e) {
          console.log(e);
        }finally{
          this.loading.setState({
            visible: false,
          });
        }
      },
    });
    
    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: async image => {
        this.loading.setState({
          visible: true,
        });
        const $imageInfo = this.imageInfo;
        try {
          await api.fetchCatsId(image.id).then(({ data }) => 
            $imageInfo.setState({
              visible: true,
              image : data
            })
          );
        } catch (e) {
          console.log(e);
        }finally{
          this.loading.setState({
            visible: false,
          });
        }
      },
      onScroll: async keyword => {
        this.loading.setState({
          visible: true,
        });
        try {
          await api.fetchCats(keyword).then(({ data }) => this.searchResult.AppendPage(data));
        } catch (e) {
          console.log(e);
        }finally {
          this.loading.setState({
            visible: false,
          });
        }
      }
    });

    this.loading = new Loading({
      $target,
      data: {
        visible: false
      }
    })

    this.imageInfo = new ImageInfo({
      $target,
      data: {
        visible: false,
        image: null
      }
    });
  }

  setState(nextData) {
    this.data = nextData;
    this.searchResult.setState(nextData);
  }

  storage(key, value){
    if(key === "keywords"){
      const list = [];
      if(localStorage.getItem(key) === null){
        localStorage.setItem(key, value);
      }else{
        const key_list = localStorage.getItem(key);
        const list2 = key_list.split(',');
        if(!list2.includes(value)){
          if(list2.length > 4) list2.shift();
          else list2.push(value);
          localStorage.setItem(key, list2.join(","));
        }
      }
      this.keywords.keyWordList();
    }else if(key === "resultData"){
      localStorage.setItem(key, JSON.stringify(value)); //로컬 스토리지에 해당 결과값 저장
    }else if(key === "randomData"){
      localStorage.setItem(key, JSON.stringify(value)); //로컬 스토리지에 해당 결과값 저장
    }
  }
}
