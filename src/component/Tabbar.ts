
module core {
    export class TabBar extends eui.TabBar {
        onRendererTouchEnd(event):void {
            if (this._sel) {
                var itemRenderer = event.currentTarget;
                var r = this._sel.call(this._context, itemRenderer.itemIndex, itemRenderer);
                if (r == true || is.undefined(r)) {
                    super.onRendererTouchEnd(event);
                }
            } else {
                super.onRendererTouchEnd(event);
            }
        }

        private _sel:(itemIndex:number, itemRenderer:any)=>void;
        private _context:any;
        onVerifyCallback<Z>(sel:(itemIndex:number, itemRenderer:any)=>void, context:Z):void {
            this._sel = sel;
            this._context = context;
        }
    }
}