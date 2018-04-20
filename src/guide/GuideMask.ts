
module core {

    //圆角遮罩，使用截图及blendMode的earse擦除模式，还可以制作各种形状的遮罩
    class GuideMask extends BaseComponent{

        constructor(){
            super();
            this.init();
        }
        private _top:eui.Rect;
        private _left:eui.Rect;
        private _right:eui.Rect;
        private _bottom:eui.Rect;
        private _stageRect:egret.Sprite;
        init():void{
            this.touchEnabled = false;

            this._top = new eui.Rect(1, 1);
            this._top.alpha = 0.01;
            // this._top.fillColor = 0x51A9F7;
            this._top.touchEnabled = true;
            this.addChild(this._top);

            this._left = new eui.Rect(1, 1);
            this._left.alpha = 0.01;
            // this._left.fillColor = 0x51A9F7;
            this._left.touchEnabled = true;
            this.addChild(this._left);

            this._right = new eui.Rect(1, 1);
            this._right.alpha = 0.01;
            // this._right.fillColor = 0x51A9F7;
            this._right.touchEnabled = true;
            this.addChild(this._right);

            this._bottom = new eui.Rect(1, 1);
            this._bottom.alpha = 0.01;
            // this._bottom.fillColor = 0x51A9F7;
            this._bottom.touchEnabled = true;
            this.addChild(this._bottom);

            this._stageRect = new egret.Sprite();
            this._stageRect.graphics.beginFill(0,1);
            this._stageRect.graphics.drawRect(0,0,egret.MainContext.instance.stage.stageWidth,egret.MainContext.instance.stage.stageHeight);
            this._stageRect.graphics.endFill();
            this._stageRect.touchEnabled = false;
            this._stageRect.touchChildren = false;
            this.addChild(this._stageRect);
        }
        private _arrow:eui.Image;
        show (target:egret.DisplayObject, arrowType:number) {
            var bounds = target.getTransformedBounds(egret.MainContext.instance.stage);
            // console.log(bounds.x,bounds.y,bounds.width,bounds.height,UI.instance.stage.stageWidth,UI.instance.stage.stageHeight);
            this._top.width = egret.MainContext.instance.stage.stageWidth;
            this._top.height = bounds.y;

            this._left.y = bounds.y;
            this._left.width = bounds.x;
            this._left.height = bounds.height;

            this._right.x = bounds.right;
            this._right.y = bounds.y;
            this._right.width = egret.MainContext.instance.stage.stageWidth - bounds.right;
            this._right.height = bounds.height;

            this._bottom.y = bounds.y + bounds.height;
            this._bottom.width = egret.MainContext.instance.stage.stageWidth;
            this._bottom.height = egret.MainContext.instance.stage.stageHeight - this._bottom.y;

            let reverseMask = this.getReverseMask(bounds);
            this._stageRect.mask = reverseMask;

            //1向上指  2向下指
            if (arrowType > 0) {
                if (!this._arrow) {
                    this._arrow = new eui.Image('point_1_png');
                    this._arrow.width = 150;
                    this._arrow.height = 168;
                    this._arrow.anchorOffsetX = 75;
                    this._arrow.anchorOffsetY = 84;
                    this.addChild(this._arrow);
                }
                this._arrow.source = arrowType == 1 ? 'point_1_png' : 'point_2_png';
            }
            if (this._arrow) {
                this._arrow.visible = arrowType > 0;
                if(arrowType == 1){
                    this._arrow.x = bounds.x + bounds.width / 2+ this._arrow.width/2 +5;
                    this._arrow.y = bounds.y + bounds.height + this._arrow.height/2 - 5;
                }else{
                    this._arrow.x = bounds.x - 10;
                    this._arrow.y = bounds.y - bounds.height/2 - 10;
                }
                egret.Tween.removeTweens(this._arrow);
                this._arrow.scaleX = this._arrow.scaleY = 0.8;
                egret.Tween.get(this._arrow, {loop: true}).to({scaleX:1.2,scaleY:1.2}, 300).to({scaleX:0.8,scaleY:0.8}, 300);
            }
        }
        
        private _earseSp : egret.Sprite;
        private _reverseSp : egret.Sprite;
        private getReverseMask(bounds:egret.Rectangle):egret.Bitmap{
            // 将原来的遮罩图的混合模式设置为擦除,根据显示对象的 Alpha 值擦除背景。Alpha 值不为0的区域将被擦除。
            if(!this._earseSp){
                this._earseSp = new egret.Sprite();
                this._earseSp.blendMode = egret.BlendMode.ERASE;
            }
            let val = Math.max(Math.floor(bounds.width/5),Math.floor(bounds.height/5));
            this._earseSp.graphics.clear();
            this._earseSp.graphics.beginFill(0,1);
            this._earseSp.graphics.drawRoundRect(bounds.x,bounds.y,bounds.width,bounds.height,val,val);
            this._earseSp.graphics.endFill();

            // 绘制一个黑色的Sprite作为反遮罩，然后把上面的遮罩加进去
            if(!this._reverseSp){
                this._reverseSp = new egret.Sprite();
                this._reverseSp.graphics.beginFill(0,0.4);
                this._reverseSp.graphics.drawRect(0,0,egret.MainContext.instance.stage.stageWidth,egret.MainContext.instance.stage.stageHeight);
                this._reverseSp.graphics.endFill();
                this._reverseSp.addChild(this._earseSp);
            }

            // 创建一个RenderTexture，把反遮罩绘制上去
            let renderTex = new egret.RenderTexture();
            renderTex.drawToTexture(this._reverseSp);
            // 用得到的Texture创建一个Bitmap，这样就得到最终的反遮罩位图对象了
            let reverseMask = new egret.Bitmap(renderTex);
            return reverseMask;
        }
        
        static show(target:egret.DisplayObject, arrowType:number = 1) {
            var guideMask = core.singleton(GuideMask);
            if (!guideMask.parent) {
                core.UI.addGuide(guideMask);
            }
            guideMask.visible = true;
            guideMask.show(target, arrowType);
        }

        static hide() {
            var guideMask = core.singleton(GuideMask);
            if (guideMask._arrow) {
                egret.Tween.removeTweens(guideMask._arrow);
            }
            guideMask.visible = false;
        }
        //
        static showRect():void{

        }

        static dispose():void{
            var guideMask = core.singleton(GuideMask);
            if (guideMask._arrow) {
                egret.Tween.removeTweens(guideMask._arrow);
            }
            if(guideMask.parent){
                guideMask.parent.removeChild(guideMask);
            }
        }
    }
}