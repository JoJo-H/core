
module core {

    export class DBFaseMovie extends egret.DisplayObjectContainer implements IMovie{

        private _dataPath : string;
        private _texturePath : string;
        private _fileName : string;
        isCache:boolean = false;
    
        private _atLast: boolean = false;
        constructor(){
            super();
        }
    
        public setPath(path:string):void {
            //  assets/animation/fast/xxx_ske.dbmv
            this._dataPath = path;
            this._texturePath = path.replace("_ske.dbmv","_tex.png");
            this._fileName = BaseFactory.getFilenameWithoutExt(path).replace("_ske","");
        }
    
        private prepareResource():Promise<any> {
            var ske = RES.getRes(this._dataPath);
            //preload预加载png图集
            var tex = RES.getRes(this._texturePath);
            if( ske && tex ) {
                return new Promise<any>((resolve,reject)=>{
                    resolve();
                });
            }else {
                RES.createGroup(this._fileName,[this._dataPath]);
                return RES.loadGroup(this._fileName);
            }
        }
    
        private _playName : string = "";
        public play(name:string,playTimes:number=0) {
            playTimes = playTimes == 0 ? -1 : playTimes;
            this.prepareResource().then(()=>{
                this._playName = name;
                this.getMC().play(name,playTimes);
            });
        }
    
        gotoAndStop(name:string, frame:number) {
            this.prepareResource().then(() => {
                this.getMC().gotoAndStop(name, frame / 24);
            });
        }
    
        gotoAndPlay(name:string, frame:number, playTimes: number = 0) {
            playTimes = playTimes == 0 ? -1 : playTimes == -1 ? 0 : playTimes 
            this.prepareResource().then(() => {
                this.getMC().gotoAndPlay(name, frame / 24, playTimes);
            });
        }
    
        private _mc : dragonBones.Movie;
        private getMC():any{
            if(this._mc == null) {
                this._mc = dragonBones.buildMovie(this._fileName);
                this.addChild(this._mc);
                this.initEvents();
            }
            if(this._mc && this._frameRate!=null) {
                this._mc.clipTimeScale = this._frameRate / 24;
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
                this._mc.clipTimeScale = this._frameRate / 24;
            }
        }
        get atLast(): boolean {
            return this._atLast;
        }
        set atLast(val: boolean) {
            this._atLast = val;
        }
    
        private clearEvents(): void {
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
            if (this._mc) {
                this._mc.removeEventListener(dragonBones.MovieEvent.LOOP_COMPLETE, this.onLoopComplete, this);
                this._mc.removeEventListener(dragonBones.MovieEvent.COMPLETE, this.onComplete, this);
                this._mc.removeEventListener(dragonBones.MovieEvent.FRAME_EVENT, this.onFrameLabel, this);
            }
        }
    
        private initEvents(): void {
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
            if (this._mc) {
                this._mc.addEventListener(dragonBones.MovieEvent.LOOP_COMPLETE, this.onLoopComplete, this);
                this._mc.addEventListener(dragonBones.MovieEvent.COMPLETE, this.onComplete, this);
                this._mc.addEventListener(dragonBones.MovieEvent.FRAME_EVENT, this.onFrameLabel, this);
            }
        }
    
        private onLoopComplete(e: dragonBones.MovieEvent): void {
            this.dispatchEvent(new MovieEvent(MovieEvent.LOOP_COMPLETE));
        }
    
        private onComplete(e: dragonBones.MovieEvent): void {
            this.dispatchEvent(new MovieEvent(MovieEvent.COMPLETE));
            if (!this.atLast) {
                display.removeFromParent(this._mc);
            }
        }
        private onFrameLabel(e: dragonBones.MovieEvent): void {
            this.dispatchEvent(new MovieEvent(MovieEvent.FRAME_LABEL, e.name));
        }
    
        private onRemoved(e:egret.Event):void
        {
            this.dispose();
        }
    
        dispose(): void {
            if(this.isCache){
                if(this._mc){
                    this._mc.stop();
                }
            }else{
                if (this._mc) {
                    this._mc.dispose();
                    this.clearEvents();
                    display.removeFromParent(this._mc);
                    this._mc = null;
                }
            }
        }
    }
}
