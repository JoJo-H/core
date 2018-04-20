

class RequestCacheData {

    constructor(){
        
    }

    private static _instance: RequestCacheData;
    static getInstance(): RequestCacheData {
        if (!RequestCacheData._instance) {
            RequestCacheData._instance = new RequestCacheData();
        }
        return RequestCacheData._instance;
    }

    getCacheByKey(key):any{
        return "";
    }
}