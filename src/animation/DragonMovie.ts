
module core {

    export class DragonMovie extends egret.DisplayObjectContainer implements IMovie {

        atLast: boolean;
        isCache:boolean = false;
        constructor(){
            super();
        }
        //骨架配置json名称：可含多个骨架
        private _skeletonJson : string;
        //图集png名称
        private _textureImage : string;
        //图集配置json名称
        private _textureJson : string;
        //要构建的骨架名称
        private _armatureName : string;
    
        //龙骨数据key
        private _dragonBonesName : string;
        //文件组名 "xxx_dragonGroup"
        private _fileName : string;
        private _intialized:boolean = false;
        setPath(path:string,armature?:string):void {
            // dir: assets/animation/dragonBones/xxx
            this._skeletonJson = path + "_anim.json";
            this._textureImage = path + "_texture.png";
            this._textureJson = path + "_texture.json";
    
            this._dragonBonesName = BaseFactory.getFilenameWithoutExt(path);
            this._fileName = this._dragonBonesName + "_dragonGroup";
            this._armatureName = armature ? armature : this._dragonBonesName ;
            if (!this._intialized) {
                this._intialized = true;
                if (this.stage) {
                    this.onAddToStage();
                }
                if (!this.hasEventListener(egret.Event.ADDED_TO_STAGE)) {
                    this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
                }
                if (!this.hasEventListener(egret.Event.REMOVED_FROM_STAGE)) {
                    this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
                }
            }
        }
    
        get armature():string {
            return this._armatureName;
        }
        set armature(val:string) {
            this._armatureName = val;
        }
    
        play(name: string, playTimes?: number): void{
            this.prepareResource().then(()=>{
                this.getArmture().animation.play(name,playTimes);
            });
        }
    
        private _armature : dragonBones.Armature;
        private _replaceDisplayArr : MovieSlotDisplayInfo[] = [];
        getArmture():dragonBones.Armature {
            if(!this._armature) {
                dragonBones.WorldClock.clock.remove(this._armature);
                var aniData = RES.getRes(this._skeletonJson);
                var texData = RES.getRes(this._textureJson);
                var texImg = RES.getRes(this._textureImage);
                //把动画数据添加到工厂里
                //BaseFactory.getEgretFactory().getAllDragonBonesData();
                if(!BaseFactory.getEgretFactory().getDragonBonesData(this._dragonBonesName)) {
                    BaseFactory.getEgretFactory().parseDragonBonesData(aniData,this._dragonBonesName);
                }
                
                //把纹理集数据和图片添加到工厂里
                if(!BaseFactory.getEgretFactory().getTextureAtlasData(this._dragonBonesName)) {
                    BaseFactory.getEgretFactory().parseTextureAtlasData(texData,texImg,this._dragonBonesName);
                }
                
                //从工厂里创建出Armature
                this._armature = BaseFactory.getEgretFactory().buildArmature(this._armatureName);
                this._armature.display.x = this._armature.display.y = 0;
                
                this.addChild(this._armature.display);
    
                //插槽替换资源
                if(this._replaceDisplayArr.length) {
                    var info = this._replaceDisplayArr.shift();
                    this.replaceDisplay(info.name,<egret.DisplayObject>info.display);
                }
    
                dragonBones.WorldClock.clock.add(this._armature);
                if(this._frameRate){
                    this.frameRate = this._frameRate;
                }
                this.initEvent();
            }
            return this._armature;
        }
        gotoAndStop(name:string, frame:any):void{
    
        }
        gotoAndPlay(name:string, frame:any, playTimes?:number):void{
    
        }
    
        private prepareResource():Promise<any> {
            var aniData = RES.getRes(this._armatureName);
            var texData = RES.getRes(this._textureJson);
            var texImg = RES.getRes(this._textureImage);
            if( aniData && texData && texImg ) {
                return new Promise<any>((resolve,reject)=>{
                    resolve();
                });
            }else {
                RES.createGroup(this._fileName,[this._skeletonJson,this._textureJson,this._textureImage]);
                return RES.loadGroup(this._fileName);
            }
        }
    
        private onFrame(e:dragonBones.EgretEvent):void {
            var ev = new MovieEvent(MovieEvent.FRAME_LABEL, e.frameLabel);
            this.dispatchEvent(ev);
        }
    
        private onComplete(e:dragonBones.EgretEvent):void {
            this.dispatchEvent(new MovieEvent(MovieEvent.COMPLETE));
        }
        private start(e:dragonBones.EgretEvent):void {
            console.log("开始播放动画：",this._fileName+".",this._armatureName);
        }
        private frameEvent(evt:dragonBones.FrameEvent):void {
            //自定义事件的值 == evt.frameLabel
            console.log( "armature 播放到了一个关键帧！ 帧标签为：",evt.frameLabel);
        }
    
        private _initEvent : boolean = false;
        private onAddToStage():void {
            this.initEvent();
        }
        private initEvent():void {
            if(this._armature && !this._initEvent) {
                this._initEvent = true;
                dragonBones.WorldClock.clock.add(this._armature);
                this._armature.addEventListener(dragonBones.EgretEvent.START,this.start,this);
                this._armature.addEventListener(dragonBones.EgretEvent.FRAME_EVENT,this.onFrame,this);
                this._armature.addEventListener(dragonBones.EgretEvent.COMPLETE,this.onComplete,this);
                this._armature.addEventListener(dragonBones.EgretEvent.LOOP_COMPLETE,this.onComplete,this);
            }
        }
    
        private onRemoveFromStage():void {
            dragonBones.WorldClock.clock.remove(this._armature);
            if(this._armature) {
                this._initEvent = false;
                this._armature.animation.stop();
                this._armature.removeEventListener(dragonBones.EgretEvent.START,this.start,this);
                this._armature.removeEventListener(dragonBones.EgretEvent.FRAME_EVENT,this.onFrame,this);
                this._armature.removeEventListener(dragonBones.EgretEvent.COMPLETE,this.onComplete,this);
                this._armature.removeEventListener(dragonBones.EgretEvent.LOOP_COMPLETE,this.onComplete,this);
            }
        }
    
        private _frameRate: number = null;
        get frameRate(): number {
            return this._frameRate;
        }
        set frameRate(val: number) {
            this._frameRate = val;
            if(this._armature){
                this._armature.clock.timeScale = this._frameRate / 24;
            }
        }
    
        dispose():void{
    
        }
    
        replaceDisplay(slotName:string,display:egret.DisplayObject):void {
            if(this._armature) {
                var slot = this._armature.getSlot(slotName);
                slot.displayIndex = 0;
                slot.display = display;
            }
            
        }
        addReplaceDisplayInfo(info:MovieSlotDisplayInfo):void {
            this._replaceDisplayArr.push(info);
        }
    
        replaceGlobal(textureName:string):void {
            //全局换装可实现将一个骨骼动画的骨架中全部贴图替换，如果使用全局换装功能，则新骨骼动画纹理集与源骨骼动画纹理集必须尺寸以及内部元素尺寸相同。
            if(this._armature && RES.getRes(textureName)) {
                this._armature.replacedTexture(RES.getRes(textureName));
            }
        }
    
        getSlot(slotName:string):dragonBones.Slot{
            if(this._armature) {
                return this._armature.getSlot(slotName);
            }
            return null;
        }
    }
    
    
    export interface MovieSlotDisplayInfo {
        name:string;
        display:egret.DisplayObject|string;
        offsetX?:number;
        offsetY?:number;
    }
}
