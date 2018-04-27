
module core {

    export class network {
        constructor(){}
        
        //默认的全局请求参数
        public static _globalParams:any = {};
        public static addGlobalParams(key:string, params:any):void {
            this._globalParams[key] = params;
        }

        public static getGlobalParam(key:string):any {
            return this._globalParams[key];
        }

        public static removeGlobalParams(key:string): void {
            delete this._globalParams[key];
        }


        public static paramsToQueryString(...args):string {
            var params:Array<string> = [];
            for (var i:number = 0; i < args.length; i ++) {
                var item:Object = args[i];
                for (var key in item) {
                    params.push(key + "=" + item[key]);
                }
            }
            return params.join("&");
        }

        
    }

    
}