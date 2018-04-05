
module core {
    
    export enum MovieType {
        DRAGON ,
        DBFAST ,
        MOVIECLIP ,
        SEQUNCE_MOVIE

    }

    export interface IMovie extends egret.DisplayObject {
        play(name: string, playTimes?: number): void;
        gotoAndStop(name:string, frame:any):void;
        gotoAndPlay(name:string, frame:any, playTimes?:number):void;
        dispose():void;
        /**
         * 动画是否停留在最后
         */
        atLast: boolean;
        frameRate: number;
        /**
         * 是否缓存进对象池
         */
        isCache:boolean;
    }

    export interface IMovieOptionInfo {
        onComplete?:Function;
        playTimes?:number;
        actionName?:string;

        scaleX?:number;
        scaleY?:number;
        container?:egret.DisplayObjectContainer;
        offsetX?:number;
        offsetY?:number;
    }

    export class BaseFactory {

        constructor(){
            
        }

        private static _egretFactory : dragonBones.EgretFactory;
        private static _movieClock : MovieClock;
        public static getEgretFactory():dragonBones.EgretFactory{
            if(!this._egretFactory) {
                this._egretFactory = new dragonBones.EgretFactory();
                this.initClock();
            }
            return this._egretFactory;
        }
        private static initClock():void {
            if(!this._movieClock) {
                this._movieClock = new MovieClock();
                this._movieClock.start();
            }
        }

        private static create(path:string,type:MovieType,armature?:string):IMovie{
            //相对路径名称 assets/animation/fast/xxx_ske.dbmv 或 assets/animation/dragonBones/xxx_anim.json
            var arr = path.split("/");
            //动画文件名称
            var fileName = arr[arr.length - 1];
            var movie : any;
            switch(type) {
                case MovieType.DRAGON :
                    //龙骨动画
                    movie = new DragonMovie();
                    movie.isCache = false;
                    movie.setPath(path,armature);
                    break;
                case MovieType.DBFAST :
                    movie = new DBFaseMovie();
                    movie.isCache = false;
                    movie.setPath(path);
                    break;
                case MovieType.MOVIECLIP :
                    movie = new MovieClip();
                    movie.isCache = false;
                    movie.setPath(path);
                    break;
                case MovieType.SEQUNCE_MOVIE :
                    break;
                default :
                    throw new Error("创建动画错误,动画类型:"+type);
            }
            return movie;
        }

        static fast(option:IMovieOptionInfo,dbName:string):IMovie {
            var movie = this.create('assets/animation/fast/' + dbName,MovieType.DBFAST);
            option.actionName = option.actionName && option.actionName!="" ? option.actionName : "1";
            this.play(movie,option);
            return movie;
        }

        static playAnim(option:IMovieOptionInfo,name:string,armature:string):IMovie {
            var movie = this.create('assets/animation/dragonBones/' + name , MovieType.DRAGON,armature);
            option.actionName = option.actionName && option.actionName!="" ? option.actionName : name;
            this.play(movie,option);
            return movie;
        }
        
        private static play(movie:IMovie,option:IMovieOptionInfo):void {
            var playTime = option.playTimes ? option.playTimes : 0;
            movie.play(option.actionName,playTime);
            movie.touchEnabled = false;
            movie.once(MovieEvent.COMPLETE,()=>{
                if(option.onComplete){
                    option.onComplete();
                }
            },this);
            movie.scaleX = option.scaleX ? option.scaleX : 1;
            movie.scaleY = option.scaleY ? option.scaleY : 1;
            if(option.container) {
                option.container.addChild(movie);
                movie.x = option.container.width / 2 + ( option.offsetX || 0 );
                movie.y = option.container.height / 2 + ( option.offsetY || 0 );
            }else {
                App.stage.addChild(movie);
                movie.x = App.stage.width / 2 + ( option.offsetX || 0 );
                movie.y = App.stage.height / 2 + ( option.offsetY || 0 );
            }
        }

        static getFilenameWithoutExt(path: string): string {
            var arr = path.split('/');
            var filename = arr[arr.length - 1];
            arr = filename.split('.');
            return arr[0];
        }
    }
}