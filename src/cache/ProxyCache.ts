
module core {
    class ProxyCache {

        private _cacheData:object = null;
        constructor(){
            if( ProxyCache.instance ){
                throw Error( "ProxyCache singleton already constructed!" );
            }
            ProxyCache._instance = this;
            this._cacheData = {};
        }

        
        static _instance:ProxyCache = null;
        static get instance():ProxyCache {
            if (!this._instance) {
                this._instance = new ProxyCache();
            }
            return this._instance;
        }

        // private setCache(proxy:Proxy):void {
        //     var params:any = proxy.params;
        //     if (params.hasOwnProperty("cache") && params["cache"] === true) {
        //         var data = proxy.responseData;
        //         var smod = proxy.getParamByName("mod");
        //         var sdo = proxy.getParamByName("do");
        //         if (!this._cacheData.hasOwnProperty(smod)) {
        //             this._cacheData[smod] = {};
        //         }
        //         this._cacheData[smod][sdo] = data;
        //         sendNotification(k.Cache(smod + "." + sdo), data);
        //     }
        // }

        private getCache(smod:string = null, sdo:string = null):any {
            if (smod == null) {
                return this._cacheData;
            }
            if (this.isCache(smod, sdo)) {
                var params:Array<string> = this.formatParmas(smod, sdo);
                return this._cacheData[params[0]][params[1]];
            }
            return null;
        }

        private formatParmas(smod:string, sdo:string = null):Array<string> {
            if (sdo == null) {
                var arr:Array<string> = smod.split(".");
                smod = arr[0];
                sdo = arr[1];
            }
            return [smod, sdo];
        }

        private isCache(smod:string, sdo:string = null):boolean {
            var params:Array<string> = this.formatParmas(smod, sdo);

            return this._cacheData.hasOwnProperty(params[0]) &&
                this._cacheData[params[0]].hasOwnProperty(params[1]);
        }
    }
    
    /**
     * 接口信息
     */
    export interface ProxyInfo {
        /**
         * 接口名称
         */
        moddo:string;
        /**
         * 请求时是否显示简单载入条(默认:是)
         */
        mask?:boolean;
        /**
         * 请求数据是否进行缓存(默认:否)
         */
        cache?:boolean;
        /**
         * 请求参数
         */
        params?:any;
    }
}