
module core {
    export class Button extends eui.Component{
        static THROTTLE_TIME : number = 0
        constructor(){
            super();
            this.touchChildren = false;
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE,this.onRemoveFromStage,this);
        }

        private onAddToStage(e:egret.Event):void {
            this.onEnter();
        }

        private _throttleTime : number = null;
        get throttleTime():number {
            if (this._throttleTime == null || this._throttleTime <= 0) {
                return Button.THROTTLE_TIME;
            }
            return this._throttleTime;
        }
        set throttleTime(val:number){
            this._throttleTime = val;
        }

        private _notice:string = '';
        get notice():string {
            return this._notice;
        }
        set notice(notice:string) {
            this._notice = notice;
        }

        private _data : any;
        set data(value:any) {
            this._data = value;
            if (value != null) {
                this.addDataMap('data');
            }
            eui.PropertyEvent.dispatchPropertyEvent(this, eui.PropertyEvent.PROPERTY_CHANGE, "data");
            this.dataChanged();
        }

        private addDataMap(name) {
            if (this._dataMapArr.indexOf(name) == -1) {
                this._dataMapArr.push(name);
            }
        }

        private _dataMapArr:any[] = [];

        dataChanged():void {

        }

        protected onEnter():void {
            
        }

        protected onExit():void {

        }
        private _throttleFun:Function;
        public get throttleFun():Function {
            if (this._throttleFun == null) {
                this._throttleFun = fun.throttle(this.buttonReleased, this.throttleTime);
            }
            return this._throttleFun;
        }

        private onRemoveFromStage(e:egret.Event):void {
            this.onExit();
        }

        destoryData():void {
            while (this._dataMapArr.length) {
                this[this._dataMapArr.shift()] = null;
            }
        }

        dispose():void {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE,this.onRemoveFromStage,this);
        }

        //eui.Button 源代码
        public labelDisplay:eui.IDisplayText = null;
        private _label:string = "";
        public get label():string {
            return this._label;
        }
        public set label(value:string) {
            this._label = value;
            if (this.labelDisplay) {
                this.labelDisplay.text = value;
            }
        }
        public iconDisplay:eui.Image = null;
        private _icon:string|egret.Texture = null;
        public get icon():string|egret.Texture {
            return this._icon;
        }
        public set icon(value:string|egret.Texture) {
            this._icon = value;
            if (this.iconDisplay) {
                this.setIconSource(value);
            }
        }
        private setIconSource(icon:any):void {
            if (this.iconDisplay && is.truthy(icon)) {
                this.iconDisplay.source = icon;
                this.iconDisplay.includeInLayout = this.iconDisplay.visible = true;
            } else if (this.iconDisplay) {
                this.iconDisplay.includeInLayout = this.iconDisplay.visible = false;
            }
        }
        /**
         * @private
         * 指示第一次分派 TouchEvent.TOUCH_BEGIN 时，触摸点是否在按钮上。
         */
        private touchCaptured:boolean = false;
        /**
         * 解除触碰事件处理。
         * @param event 事件 <code>egret.TouchEvent</code> 的对象。
         * @version Egret 3.0.1
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        protected onTouchCancle(event:egret.TouchEvent):void {
            let stage = event.$currentTarget;
            stage.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancle, this);
            stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onStageTouchEnd, this);
            this.touchCaptured = false;
            this.invalidateState();
        }
        /**
         * 触碰事件处理。
         * @param event 事件 <code>egret.TouchEvent</code> 的对象。
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        protected onTouchBegin(event:egret.TouchEvent):void {
            this.$stage.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancle, this);
            this.$stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onStageTouchEnd, this);
            this.touchCaptured = true;
            this.invalidateState();
            event.updateAfterEvent();
        }
        /**
         * @private
         * 舞台上触摸弹起事件
         */
        private onStageTouchEnd(event:egret.Event):void {
            let stage = event.$currentTarget;
            stage.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancle, this);
            stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onStageTouchEnd, this);
            if (this.contains(event.target)){
                if (this.throttleTime > 0) {
                    this.throttleFun();
                } else {
                    this.buttonReleased();
                }
            }
            this.touchCaptured = false;
            this.invalidateState();
        }
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        protected getCurrentState():string {
            var oldState = this.skin.currentState;
            var newState = 'up';
            if (!this.enabled)
                newState = "disabled";

            if (this.touchCaptured)
                newState = "down";

            if (this.skin.hasState(newState)) {
                return newState;
            }

            return oldState;
        }
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        protected partAdded(partName:string, instance:any):void {
            if (instance === this.labelDisplay) {
                this.labelDisplay.text = this._label;
            }
            else if (instance == this.iconDisplay) {
                this.iconDisplay.source = this._icon;
            }
        }
        /**
         * 当在用户单击按钮之后处理 <code>egret.TouchEvent.TOUCH_END</code> 事件时，将调用此方法。
         * 仅当以按钮为目标，并且 <code>touchCaptured</code> 为 <code>true</code> 时，才会调用此方法。
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        protected buttonReleased():void {
            if (is.truthy(this._notice)) {
                var data = this.data;
                if (!data) {
                    var host = core.getHostComponent(this);
                    if (host) {
                        data = host.data;
                    }
                }
                core.sendNotification(this._notice,{ date:data ,host:host ,button:this });
            }
            // if (this.name) {
            //     core.sendNotification(core.k.CLICK_BUTTON, { name : this.name , button: this });
            // }
            // invokeHook(hooks.button, 'onClick', this);
        }
    }

}