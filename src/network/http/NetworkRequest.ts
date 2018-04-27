
module core {

    export class NetworkRequest extends egret.EventDispatcher  {

        public _params : any;
        private _requestUrl : string;
        private _method : string = egret.HttpMethod.GET;
        public _customParams:any;

        private _timeoutId:number = null;
        private _responseData:any;
        constructor(params) {
            super();
            this._customParams = {};    // 自定义参数,比如当前时间
            this._params = params;      //请求参数
            this._requestUrl = App.httpRequestUrl;
        }

        private _request : egret.HttpRequest;
        load():void {
            let url : string = this._requestUrl.indexOf('?') == -1 ? this._requestUrl+'?' : this._requestUrl;
            if( url[url.length - 1] != '?' && url[url.length - 1] != "&" ) {
                url += '&';
            }

            this._request = new egret.HttpRequest();
            this._request.responseType = egret.HttpResponseType.TEXT;
            this._request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
            this._request.addEventListener(egret.Event.COMPLETE,this.onComplete,this);
            this._request.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onError,this);
            this._request.addEventListener(egret.ProgressEvent.PROGRESS,this.onProgress,this);

            this._timeoutId = egret.setTimeout(()=>{
                this._request.removeEventListener(egret.Event.COMPLETE,this.onComplete,this);
                this._request.removeEventListener(egret.IOErrorEvent.IO_ERROR,this.onError,this);
                this._request.removeEventListener(egret.ProgressEvent.PROGRESS,this.onProgress,this);
                egret.clearTimeout(this._timeoutId);

                this.dispatchEvent(new RequestEvent(RequestEvent.TIME_OUT, this));
            },this,App.httpTimeout);

            let queryString = network.paramsToQueryString(this._params,this._customParams,network._globalParams);
            if(this._method == egret.HttpMethod.GET){
                url += queryString;
                this._request.open(this._requestUrl,egret.HttpMethod.GET);
                this._request.send();
            }else{
                this._request.open(url,egret.HttpMethod.POST);
                this._request.send(queryString);
            }
        }

        private onComplete(event:egret.Event):void {
            let data : any = null;
            data = JSON.parse(event.target.response);
            this.onResponse(data);
            egret.clearTimeout(this._timeoutId);
            this.clearEventListener();
        }

        private onResponse(data:any):void {
            this._responseData = data;
            let isResponseSucceed = false;
            //标识,0表示成功,其他表示错误码,可以进行解析弹tips提醒
            if (this._responseData && this._responseData.hasOwnProperty("s")) {
                isResponseSucceed = this._responseData["s"] == 0;
            }
            if (isResponseSucceed) {
                this.dispatchEvent(new RequestEvent(RequestEvent.RESPONSE_SUCCEED, this));
            } else {
                this.dispatchEvent(new RequestEvent(RequestEvent.RESPONSE_ERROR, this));
            }
        }

        private onError(event:egret.IOErrorEvent):void {
            console.log("request error : " + event);
            this.dispatchEvent(new RequestEvent(RequestEvent.REQUEST_FAIL, this));
            egret.clearTimeout(this._timeoutId);
            this.clearEventListener();
        }

        private onProgress(event:egret.ProgressEvent):void {
            console.log("get progress : " + Math.floor(100*event.bytesLoaded/event.bytesTotal) + "%");
            egret.clearTimeout(this._timeoutId);
        }

        public clearEventListener():void {
            this._request.removeEventListener(egret.Event.COMPLETE,this.onComplete,this);
            this._request.removeEventListener(egret.IOErrorEvent.IO_ERROR,this.onError,this);
            this._request.removeEventListener(egret.ProgressEvent.PROGRESS,this.onProgress,this);
        }

        public dispose():void{
            this.clearEventListener();
            egret.clearTimeout(this._timeoutId);
        }
    }
}