
export const storage = localStorage;

export const getItem = (key, defaultValue) => {
    try{
        const value = storage.getItem(key);
        // key에 해당하는 값이 있다면 parsing하고, 없으면 defaultValue 리턴
        return value ? JSON.parse(value) : defaultValue;
    }catch {
        return defaultValue;
    }
}

export const setItem = (key, value) => {
    try{
        storage.setItem(key, JSON.stringify(value));
    }catch (e) {
        throw new Error(e);
    }
}

export const removeItem = (key) => {
    try{
        storage.removeItem(key);
    }catch (e) {
        throw new Error(e);
    }
}

