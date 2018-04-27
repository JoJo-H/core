
module core {

    export class RequestEvent extends egret.Event{
        
        /**
         * 请求失败,请求异常
         */
        public static REQUEST_FAIL:string = "fail";
        /**
         * 响应结果成功
         */
        public static RESPONSE_SUCCEED:string = "respnseSucceed";
        /**
         * 响应结果失败
         */
        public static RESPONSE_ERROR:string = "error";

        /**
         * 请求超时
         */
        public static TIME_OUT:string = "timeout";

        private _target : NetworkRequest

        public constructor(type: string, target:NetworkRequest, bubbles?: boolean, cancelable?: boolean) {
            super(type, bubbles, cancelable);
            this._target = target;
        }
    }
}