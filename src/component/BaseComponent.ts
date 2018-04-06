
module core {

    export interface IComponent extends egret.DisplayObject {
        onEnter(...args):void;
        onExit():void;
        listener(component:eui.Component,type:string,sender:(e:egret.Event) => void):void;
        setState(name:string):IComponent;
        setData(data:any, type?:any):IComponent;
        setCompName(name:string):IComponent;
        getView(name):egret.DisplayObject;
    }

    export class BaseComponent extends eui.Component implements IComponent{

        private _data : any;
        private _dataMapArr:any = [];
        private _componentName:string;

        private _compState:ComponentState;
        constructor(...args){
            super();
            this._compState = new ComponentState(this);
            this.setArgs(args);
        }

        listener(component:eui.Component,type:string, sender:(e:egret.Event) => void):void {
            this._compState.listener(component,type, sender);
        }
        clearListeners():void {
            this._compState.clearLiteners();
        }

        private _hook:IComponentHook;
        get hook():IComponentHook {
            if(!this._hook) {
                this._hook = new ComponentHook(this);
            }
            return this._hook;
        }
        set hook(value:IComponentHook) {
            this._hook = value;
        }
        addOperate(operate:IComponentOperate<any>):BaseComponent {
            this.hook.addOperate(operate);
            return this;
        }
        removeOperate(operate:IComponentOperate<any>):void {
            this.hook.removeOperate(operate);
        }
        clearOperate():void {
            this.hook.clearOperate();
        }
        removeOperateByName(name:string):void {
            this.hook.removeOperateByName(name);
        }
        getOperateByName(name:string):IComponentOperate<any>[] {
            return this.hook.getOperateByName(name);
        }

        getArgs():any {
            return this._compState.getArgs();
        }
        setArgs(args):void {
            this._compState.setArgs(args);
        }

        updateAttribute(attribute:Attribute):void {
            this[attribute.name] = attribute.value;
        }

        public set data(value:any) {
            this._data = value;
            if (value != null) {
                this.addDataMap('data');
                eui.PropertyEvent.dispatchPropertyEvent(this, eui.PropertyEvent.PROPERTY_CHANGE, "data");
            }
            this.dataChanged();
        }
        public get data(){
            return this._data;
        }
        private addDataMap(name) {
            if (this._dataMapArr.indexOf(name) == -1) {
                this._dataMapArr.push(name);
            }
        }

        public get isFull(): boolean  {
            return this._compState.isFull;
        }
        setFull():this {
            this._compState.setFull();
            return this;
        }
        
        setData(data:any, type:any = 'data'):BaseComponent {
            if (type == 'data') {
                this.data = data;
            } else {
                this[type] = data;
                if (data != null) {
                    this.addDataMap(type);
                    eui.PropertyEvent.dispatchPropertyEvent(this, eui.PropertyEvent.PROPERTY_CHANGE, type);
                }
            }
            
            if (this._hook && data != null) {
                this._hook.setData(data, type);
            }
            return this;
        }

        protected dataChanged():void {
        }

        setState(name:string):this {
            this.currentState = name;
            return this;
        }

        setCompName(name:string):this {
            this.componentName = name;
            return this;
        }
        get componentName():string {
            return this._componentName;
        }
        set componentName(value:string) {
            this._componentName = value;
        }

        isType(type:UIType):boolean {
            return this._compState.isType(type);
        }
        setType(type:UIType):void {
            this._compState.setType(type);
        }

        private onAddToStage(e:egret.Event):void {
            this.onEnter();
        }

        private onRemoveFromStage(e:egret.Event):void {
            this.onExit();
        }

        onEnter(...args):void {
            core.setAttribute(this);
            this.hook.onEnter(...args);
        }

        onExit():void {
            this.clearListeners();
            this.hook.onExit();
            this.destoryData();
        }

        destoryData():void {
            this.componentName = "";
            while (this._dataMapArr.length) {
                this[this._dataMapArr.shift()] = null;
            }
            core.destoryChildren(this);
        }

        getView(name):egret.DisplayObject {
            if (this[name]) {
                return this[name];
            }
            return core.getChildByName(name, this);
        }
    }
}