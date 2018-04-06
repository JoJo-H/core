
module core {
    export class display {
    
        public static setFullDisplay(display:egret.DisplayObject):void {
            display.width = App.stage.stageWidth;
            display.width = App.stage.stageWidth;
        }
    
        /**
         * 移除容器中的所有子显示对象
         * @param container 需要移除子显示对象的容器
         */
        static removeAllChildren(container:egret.DisplayObjectContainer):void {
            while (container.numChildren > 0) {
                container.removeChildAt(0);
            }
        }
    
        /**
         * 移除显示对象,可以是egret的显示对象,也可以是继承组件
         * @param child 子显示对象
         */
        static removeFromParent(child:egret.DisplayObject):void {
            if ( child && child.parent) {
                child.parent.removeChild(child);
            }
        }
    
        /**
         * 设置显示对象的相对描点
         * @param disObj 需要设置描点的显示对象
         * @param anchorX X轴相对描点
         * @param anchorY Y轴相对描点
         */
        static setAnchor(disObj:egret.DisplayObject, anchorX:number, anchorY:number = anchorX):void {
            disObj.anchorOffsetX = disObj.width * anchorX;
            disObj.anchorOffsetY = disObj.height * anchorY;
        }

        static get stageW():number {
            return App.stage.stageWidth;
        }
        static get stageH():number {
            return App.stage.stageHeight;
        }
    }
}