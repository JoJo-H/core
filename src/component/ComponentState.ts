

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
            this.full()
        }

        full(): this {
            this._component.width = App.stage.stageWidth;
            this._component.height = App.stage.stageHeight;
            App.stage.removeEventListener(egret.Event.RESIZE, this.onResize, this);
            App.stage.addEventListener(egret.Event.RESIZE, this.onResize, this);
            return this;
        }

        private onResize():void {
            this._component.width = App.stage.stageWidth;
            this._component.height = App.stage.stageHeight;
        }

        private _type:ComponentType;
        isType(type:ComponentType):boolean {
            return this._type == type;
        }
        setCompType(type:ComponentType):void {
            this._type = type;
        }
        getCompType():ComponentType{
            return this._type;
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
            if(this._isFull){
                App.stage.removeEventListener(egret.Event.RESIZE, this.onResize, this);
            }
            this.clearLiteners();
            this._component.onExit();
        }
    }
}