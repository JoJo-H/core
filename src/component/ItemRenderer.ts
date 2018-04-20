
module core {
    export class ItemRenderer extends eui.ItemRenderer implements IComponent, IAttributeHost{
        private _compState:ComponentState;
        public constructor() {
            super();
            this._compState = new ComponentState(this);
        }

        private _notice:string;
        get notice():string {
            return this._notice;
        }
        set notice(notice:string) {
            this._notice = notice;
        }

        private _componentName:string;
        get componentName():string {
            return this._componentName;
        }
        set componentName(value:string) {
            this._componentName = value;
        }

        private _ignoreButton:boolean = false;
        get ignoreButton():boolean {
            return this._ignoreButton;
        }
        set ignoreButton(value:boolean) {
            this._ignoreButton = value;
        }

        getArgs():any {
            return this._compState.getArgs();
        }
        setArgs(args):void {
            this._compState.setArgs(args);
        }
        setFull():IComponent {
            return this;
        }
        setCompType(type:ComponentType):void {
            this._compState.setCompType(type);
        }
        getCompType():ComponentType {
            return this._compState.getCompType();
        }
        private _animation: IAnimation;
        get animation(): IAnimation {
            return this._animation;
        }
        setAnimation(animation: IAnimation): IComponent {
            this._animation = animation;
            return this;
        }

        private $_data:any;
        get data():any {
            return this.$_data;
        }
        set data(val:any) {
            this.$_data = val;
            if (val != null) {
                this.addDataMap('data');
            }
            eui.PropertyEvent.dispatchPropertyEvent(this, eui.PropertyEvent.PROPERTY_CHANGE, "data");
            this.dataChanged();
        }

        private _dataMapArr:any = [];
        private addDataMap(name) {
            if (this._dataMapArr.indexOf(name) == -1) {
                this._dataMapArr.push(name);
            }
        }
        setData(data:any, type:any = 'data'):core.IComponent {
            this[type] = data;
            if (data != null) {
                this.addDataMap(type);
            }
            return this;
        }

        dataChanged():void {
            super.dataChanged();
        }

        updateAttribute(attribute:core.Attribute):void {
            this[attribute.name] = attribute.value;
        }

        setState(name:string):core.IComponent {
            this.currentState = name;
            return this;
        }

        setCompName(name:string):core.IComponent {
            this.componentName = name;
            return this;
        }

        listener(component:eui.Component,type, sender:(e:egret.Event) => void,context:any):void {
            this._compState.listener(component,type, sender,context);
        }
        clearListeners():void {
            this._compState.clearLiteners();
        }

        onEnter():void {
            core.setAttribute(this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tap, this);
        }

        onExit():void {
            this.clearListeners();
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.tap, this);
        }

        protected getCurrentState():string {
            if (this.enabled == false && this.skin.hasState('disabled')) {
                return 'disabled';
            }
            var state = this.skin.currentState;
            var s = super.getCurrentState();
            if (this.skin.hasState(s)) {
                return s;
            }
            return state;
        }

        destoryData():void {
            while (this._dataMapArr.length) {
                this[this._dataMapArr.shift()] = null;
            }
            core.destoryChildren(this);
        }

        private tap(e:egret.TouchEvent):void {
            if (!this.ignoreButton && e.target instanceof core.Button) {
                e.stopPropagation();
                return;
            }
            if (is.truthy(this._notice)) {
                core.sendNotification(this._notice, this.data, this);
            }
        }
        getView(name):egret.DisplayObject {
            if (this[name]) {
                return this[name];
            }
            return core.getChildByName(name, this);
        }
    }
}