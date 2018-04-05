
module core {
    export class MovieClip extends egret.DisplayObjectContainer implements IMovie {

        private _dataPath: string;
        private _texturePath: string;
        private _filename: string;
    
        private _atLast: boolean = false;
    
        public isCache = false;
    
        get atLast(): boolean {
            return this._atLast;
        }
        set atLast(val: boolean) {
            this._atLast = val;
        }
    
        constructor() {
            super();
    
        }
    
        public setPath(path: string){
            this._dataPath = path;
            this._texturePath = path.replace('.json', '.png');
            this._filename = BaseFactory.getFilenameWithoutExt(this._dataPath);
        }
    
        private prepareResource() {
            var factory = <egret.MovieClipDataFactory>RES.getRes(this._dataPath);
            if (factory) {
                return new Promise<void>((ok) => {
                    ok();
                });
            } else {
                RES.createGroup(this._filename, [this._dataPath]);
                return RES.loadGroup(this._filename);
            }
        }
    
        play(name:string, playTimes:number = 0) {
            this.prepareResource().then(() => {
                this.getMC(name).play(playTimes);
            });
        }
    
        gotoAndStop(name:string, frame:any) {
            this.prepareResource().then(() => {
                this.getMC(name).gotoAndStop(frame);
            });
        }
    
        gotoAndPlay(name:string, frame:any, playTimes:number = 0) {
            this.prepareResource().then(() => {
                this.getMC(name).gotoAndPlay(frame, playTimes);
            })
        }
    
        private getMC(name:string) {
            if(this._mc) {
                if(!this._hasEvent) {
                    this.initEvents();
                }
                return this._mc;
            }
            var factory : egret.MovieClipDataFactory = <egret.MovieClipDataFactory>RES.getRes(this._dataPath);
            if(factory) {
                this._mc = new egret.MovieClip(factory.generateMovieClipData(name));
                this.initEvents();
                this.addChild(this._mc);
            }
            return this._mc;
        }
    
        private _frameRate: number = null;
        get frameRate(): number {
            return this._frameRate;
        }
        set frameRate(val: number) {
            this._frameRate = val;
            if (this._mc) {
                this._mc.frameRate = val;
            }
        }
    
        private _hasEvent:boolean = false;
    
        private clearEvents(): void {
            this._hasEvent = false;
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
            if (this._mc) {
                this._mc.removeEventListener(egret.MovieClipEvent.LOOP_COMPLETE, this.onLoopComplete, this);
                this._mc.removeEventListener(egret.MovieClipEvent.COMPLETE, this.onComplete, this);
                this._mc.removeEventListener(egret.MovieClipEvent.FRAME_LABEL, this.onFrameLabel, this);
            }
        }
    
        private initEvents(): void {
            this._hasEvent = true;
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
            if (this._mc) {
                this._mc.addEventListener(egret.MovieClipEvent.LOOP_COMPLETE, this.onLoopComplete, this);
                this._mc.addEventListener(egret.MovieClipEvent.COMPLETE, this.onComplete, this);
                this._mc.addEventListener(egret.MovieClipEvent.FRAME_LABEL, this.onFrameLabel, this);
            }
        }
    
        private _mc: egret.MovieClip;
        
        private onLoopComplete(e: egret.MovieClipEvent): void {
            this.dispatchEvent(new MovieEvent(MovieEvent.LOOP_COMPLETE));
        }
    
        private onComplete(e: egret.MovieClipEvent): void {
            this.dispatchEvent(new MovieEvent(MovieEvent.COMPLETE));
            if (!this.atLast) {
                display.removeFromParent(this);
            }
        }
    
        private onFrameLabel(e: egret.MovieClipEvent): void {
            this.dispatchEvent(new MovieEvent(MovieEvent.FRAME_LABEL, e.frameLabel));
        }
    
        private onRemoved(e:egret.Event):void
        {
            this.dispose();
        }
    
        dispose(): void {
            this.clearEvents();
        }
    }
}
