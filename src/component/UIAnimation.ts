module core {

    export interface IAnimation {
        show(target: IComponent, calblack: Function): void;
        hide(target: IComponent, callback: Function): void;
    }
    /**
     * 按钮点击动画效果
     * 在Main.ts中指定
     */
    class ButtonAnimation implements core.IAnimation {
        private _sx:number = null;
        private _sy:number = null;

        show(component:core.IComponent, callback:Function) {
            var group = component;
            if (group) {
                if (this._sx == null && this._sy == null) {
                    this._sx = group.scaleX;
                    this._sy = group.scaleY;
                }
                group.scaleX = this._sx;
                group.scaleY = this._sy;
                egret.Tween.get(group).to({scaleX: this._sx + 0.04, scaleY: this._sy + 0.04}, 100);
            }
        }
        hide(component:core.IComponent, callback:Function) {
            var group = component;
            if (group) {
                egret.Tween.get(group).to({scaleX: this._sx, scaleY: this._sy}, 100);
            }
        }
    }

    /**
     * 弹框打开/关闭动画效果
     */
    class BoxAnimation implements core.IAnimation {
        show(c:core.IComponent, callback:Function) {
            var rect = c.getView('rect');
            var group = c.getView('group');
            var tw = null;
            if (rect) {
                var alpha = rect.alpha;
                rect.alpha = 0;
                tw = egret.Tween.get(rect).to({alpha:alpha}, 150);
            }
            if (group) {
                var sx = group.scaleX;
                var sy = group.scaleY;
                var alpha = group.alpha;
                group.scaleX = sx * 0.5;
                group.scaleY = sy * 0.5;
                group.alpha = 0;
                tw = egret.Tween.get(group).to({alpha: alpha, scaleX: sx, scaleY: sy}, 150);
            }
            if(callback) {
                if (tw) {
                    tw.call(()=>{
                        callback();
                        egret.Tween.removeTweens(rect);
                        egret.Tween.removeTweens(rect);
                    });
                } else {
                    callback();
                }
            }
        }

        hide(c:core.IComponent, callback:Function) {
            var rect = c.getView('rect');
            var group = c.getView('group');
            var tw = null;
            if (rect) {
                tw = egret.Tween.get(rect).to({alpha:0}, 100);
            }
            if (group) {
                var sx = group.scaleX * 0.5;
                var sy = group.scaleY * 0.5;
                tw = egret.Tween.get(group).to({alpha: 0, scaleX: sx, scaleY: sy}, 100);
            }
            if(callback) {
                if (tw) {
                    tw.call(()=>{
                        callback();
                        egret.Tween.removeTweens(rect);
                        egret.Tween.removeTweens(rect);
                    });
                } else {
                    callback();
                }
            }
        }
    }
}