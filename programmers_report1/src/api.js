const API_ADDRESS = "https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev"

export const request = async (api_id) => {
    try{
        const response = await fetch(`${API_ADDRESS}/${api_id? api_id : ''}`); //id가 있으면 주소 뒤에 아디가 나올 수 있게 설정
        if(response.status < 300) return response.json();
        else if(response.status < 400) throw new Error(`Code ${response.status} : Redirection Error`);
        else if(response.status < 500) throw new Error(`Code ${response.status} : Client Error`);
        else if(response.status < 600) throw new Error(`Code ${response.status} : Server Error`);
    }catch (e){
        throw new Error(e);
    }
};