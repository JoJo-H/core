
module core {

    export interface IComponentHook {
        setData(data:any, type?:any):void;
        addOperate(operate:IComponentOperate<any>):void;
        removeOperate(operate:IComponentOperate<any>):void;
        clearOperate():void ;
        removeOperateByName(name:string):void;
        getOperateByName(name:string):IComponentOperate<any>[];
        getOperateByType(type:string):IComponentOperate<any>[];
        onEnter(...args):void;
        onExit():void;
    }

    export class ComponentHook implements IComponentHook{

        private _component:IComponent;
        constructor(component:IComponent) {
            this._component = component;
        }

        setData(data:any, type?:any):void {

        }

        onEnter(...args):void {
            for (var i = 0; i < this._operates.length; i ++) {
                this._operates[i].enter(this._component);
            }
        }
        onExit():void {
            for (var i = 0; i < this._operates.length; i ++) {
                this._operates[i].exit(this._component);
            }
        }

        private _operates:IComponentOperate<any>[] = [];
        addOperate(operate:IComponentOperate<any>):void {
            this._operates.push(operate);
        }
        removeOperate(operate:IComponentOperate<any>):void {
            var idx = this._operates.indexOf(operate);
            if (idx > -1) {
                operate.exit(this._component);
                this._operates.splice(idx, 1);
            }
        }
        clearOperate():void {
            while (this._operates.length > 0) {
                this.removeOperate(this._operates[0]);
            }
        }
        removeOperateByName(name:string):void {
            for (var i = this._operates.length - 1; i >= 0; i --) {
                if (this._operates[i].getName() == name) {
                    this.removeOperate(this._operates[i]);
                }
            }
        }
        getOperateByName(name:string):IComponentOperate<any>[] {
            var r = [];
            for (var i = 0; i < this._operates.length; i ++) {
                if (this._operates[i].getName() == name) {
                    r.push(this._operates[i]);
                }
            }
            return r;
        }
        getOperateByType(type:string):IComponentOperate<any>[] {
            var r = [];
            for (var i = 0; i < this._operates.length; i ++) {
                if (this._operates[i].type == type) {
                    r.push(this._operates[i]);
                }
            }
            return r;
        } 
    }
    
}