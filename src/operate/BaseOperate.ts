
module core {

    export interface IComponentOperate <T>{

        type:string;
        getName():string;
        setName(val:string):T;
        enter(component:IComponent):void;
        exit(component:IComponent):void;
    }

    export class BaseOperate<T> extends egret.HashObject implements IComponentOperate<T> {

        private _name:string;
        public type:string;
        setName(name:string):T {
            this._name = name;
            var r:any = this;
            return <T>r;
        }
        getName():string {
            return this._name;
        }

        enter(component:BaseComponent):void {
        }
        exit(component:BaseComponent):void {
        }
    }
}
