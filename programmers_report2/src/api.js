const API_ENDPOINT =
  "https://oivhcpn8r9.execute-api.ap-northeast-2.amazonaws.com/dev";

const request = async (url) => {
  try {
    const result = await fetch(url);
    if(result.status === 200) return result.json();
    else if(result.status < 400) return new Error(`Redirection Error Code ${result.status}`)//300때 에러
    else if(result.status < 500) return new Error(`Client Error Code ${result.status}`)//400때 에러
    else if(result.status < 600) return new Error(`Server Error Code ${result.status}`)//500때 에러
  } catch (e) {
    console.warn(e);
  }
};
const api = {
  fetchCats: async (keyword) => {
    const response = await request(`${API_ENDPOINT}/api/cats/search?q=${keyword}`);
    /* 
    검색 결과 시 한 페이지랑 20개라는 가정을 했을 때 만든 내용
    문제에는 따로 페이지 개수가 없음
    response.data = response.data.reduce((item, acc, idx) => {
      if (idx >= num && idx < (num * 20)) item.push(acc);
      return item;
    }, []); */
    return response;
  },
  /* 
  페이징 개수가 있을 경우 해당 내용으로 검색하는게 맞음
  fetchCatsPage: async (num) => {
    const response = await request(`${API_ENDPOINT}/api/cats/search?q=${keyword}` );
    response.data = response.data.reduce((item, acc, idx) => {
      if (idx >= num && idx < (num * 20)) item.push(acc);
      return item;
    }, []);
    return response;
  }, */
  fetchCatsId: async (id) => {
    return await request(`${API_ENDPOINT}/api/cats/${id}`);
  },
  randomCats: async () => {
    return await request(`${API_ENDPOINT}/api/cats/random50`);
  },
};
