

module core {
    export class ComponentState {
        private _component:IComponent;
        private _args:any[] = [];
        private _listeners:any[] = [];

        constructor(component:IComponent) {
            this._component = component;
            component.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            component.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemovedFromStage, this);
        }

        getArgs():any {
            return this._args;
        }
        setArgs(args):void {
            this._args = args;
        }

        private _isFull:boolean = false;
        public get isFull(): boolean  {
            return this._isFull;
        }
        setFull():void {
            this._isFull = true;
        }

        private _type:UIType;
        isType(type:UIType):boolean {
            return this._type == type;
        }
        setType(type:UIType):void {
            this._type = type;
        }

        listener(component:eui.Component,type:string,func:(e:egret.Event) => void):void {
            if (!component || !func) {
                return;
            }
            if(component.hasEventListener(type)) {
                return;
            }
            this._listeners.push({component: component, func:func, type: type});
            component.addEventListener(type, func, this._component);
        }
        clearLiteners():void {
            while (this._listeners.length > 0) {
                var listItem = this._listeners.shift();
                listItem.component.removeEventListener(listItem.type, listItem.func, this);
            }
        }

        onAddToStage(e):void {
            this._component.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this._component.onEnter(...this._args);
        }
        onRemovedFromStage():void {
            this._component.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemovedFromStage, this);
            this.clearLiteners();
            this._component.onExit();
        }
    }
}