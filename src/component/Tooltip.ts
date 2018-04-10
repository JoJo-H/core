
module core {

    export interface ITooltip {
        show(info:TooltipInfo|string, skinName?:string):void;
        customView(skinName:string, data:any, delay?:number):void;
        skinName:string;
    }

    export interface TooltipInfo {
        text:string,
        size?:number;
        color?:number;
        delay?:number;
    }

    export class Tooltip extends BaseComponent implements ITooltip{
        private _items:TooltipItem[];
        constructor(){
            super();
            this._items = [];
            display.setFullDisplay(this);
            this.touchEnabled = this.touchChildren = false;
        }

        show(arg:TooltipInfo|string, skinName:string = undefined):void {

            var info : TooltipInfo;
            if(is.string(arg)) {
                info = {text: <string>arg};
            }else {
                info = <any>arg;
            }
            if (!obj.hasValue(info,'color')) {
                info.color = 0;
            }
            if (!obj.hasValue(info,'size')) {
                info.size = 20;
            }
            if (!obj.hasValue(info,'delay')) {
                info.delay = 1500;
            }

            var item : TooltipItem = pool.getPool(TooltipItem).pop(info,skinName);
            this.createItem(item,info.delay);
        }

        private createItem(item:TooltipItem, delay):void {
            this.addChild(item);
            this._items.push(item);

            item.animation.show(()=>{
                item.animation.delay(delay,()=>{
                    item.animation.close(()=>{
                        this.removeItem(item);
                    });
                });
            });
            egret.callLater(() => {
                this.layout.layout(this._items);
            }, this);
        }

        private removeItem(item:any):void {
            var idx = this._items.indexOf(item);
            if (idx >= 0) {
                this._items.splice(idx, 1);
                pool.getPool(TooltipItem).push(item);
                display.removeFromParent(item);
            }
        }

        customView(skinName:string, data:any, delay:number = 1500):void {
            var item:TooltipItem = pool.getPool(TooltipItem).pop(data, skinName)
            this.createItem(item, delay);
        }

        private _layout:ITooltipLayout;
        
        public get layout():ITooltipLayout {
            if (!this._layout) {
                this._layout = core.getDefinitionInstance<ITooltipLayout>(App.tooltipLayout, TooltipLayout);
            }
            return this._layout;
        }
    }

    class TooltipItem extends eui.Component {
        private _animation : TooltipAnimation;
        public data:TooltipInfo;
        constructor() {
            super();
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            // this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemovedFromStage, this);
            this._animation = new TooltipAnimation(this);
        }
        onAddToStage(e):void {
            // this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.onEnter();
        }
        onRemovedFromStage():void {
            // this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemovedFromStage, this);
            this.onExit();
        }

        public init(info:any, skinName:string):void {
            if (skinName) {
                this.skinName = skinName;
            } else {
                this.skinName = 'TooltipSkin';
            }
            this.data = info;
            this.onEnter();
        }

        public onEnter():void {
            if (this.label) {
                if (this.data.text.indexOf('<font') > -1) {
                    this.label.textFlow = new egret.HtmlTextParser().parser(this.data.text);
                } else {
                    this.label.text = this.data.text;
                }
            }
        }

        public onExit():void{
            
        }

        get animation():TooltipAnimation {
            return this._animation;
        }
        private label:eui.Label;
    }

    class TooltipAnimation {
        private _item:TooltipItem;
        constructor(item){
            this._item = item;
        }
        show(callback:Function):void {
            egret.Tween.removeTweens(this._item);
            this._item.visible = true;
            this._item.scaleX = this._item.scaleY = 2;
            this._item.alpha = 1;
            egret.Tween.get(this._item).to({scaleX: 1, scaleY: 1},300).call(callback);
        }

        delay(delay,callback:Function):void {
            egret.Tween.get(this._item).wait(delay).call(callback);
        }

        close(callback:Function):void {
            egret.Tween.get(this._item).to({alpha: 0},200).call((()=>{
                egret.Tween.removeTweens(this._item);
                callback();
            }));
        }
    }


    class TooltipLayout implements ITooltipLayout {
        getTotalHeight(items:BaseComponent[], offsetY:number = 0):number {
            return items.reduce((a,b) => {
                return a + b.height;
            }, 0) + items.length * offsetY;
        }

        layout(items:BaseComponent[]):void {
            if (items.length == 0) {
                return;
            }

            var offsetY:number = 5;

            var len = items.length;

            var w = display.stageW;
            var h = display.stageH;

            var minY = h / 2;
            var maxY = h * 0.8;

            var y = this.getTotalHeight(items, offsetY);

            if (y < minY) {
                y = minY;
            } else if (y > maxY) {
                y = maxY;
            }

            var totalH = 0;
            for (var i = len - 1; i >= 0; i --) {
                display.setAnchor(items[i], 0.5);
                items[i].y = y - totalH;
                totalH += items[i].height + offsetY;
                items[i].x = w / 2;
            }
        }
    }


    export interface ITooltipLayout {
        layout(items:eui.Component[]):void;
    }
}