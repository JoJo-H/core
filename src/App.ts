
module core {

    export class App {

        constructor(){
        }

        private static _stage : egret.Stage;
        public static setStage(s:egret.Stage):void {
            this._stage = s;
        }

        public static get stage(){
            return this._stage;
        }
    }
}