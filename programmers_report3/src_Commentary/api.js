const API_PATH = "https://uikt6pohhh.execute-api.ap-northeast-2.amazonaws.com/dev";

export const request = async (url, options = {}) => {
    try{
        const fulUrl = `${API_PATH}${url}`;
        const response = await fetch(fulUrl, options);
        console.log(response);
        if(response.ok){
            const json = await response.json();
            return json;
        }
        throw new Error('API 통신 실패');
    }catch(e){
        throw new Error(e);
    }
}