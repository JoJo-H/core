
module core {

    export class MovieClock {
    
        private _lastTime : number = 0;
        constructor(){
    
        }
    
        start():void {
            this._lastTime = egret.getTimer();
            egret.startTick(this.tick,this);
        }
    
        private tick(time:number):boolean {
            var gap = time - this._lastTime;
            this._lastTime = time;
            dragonBones.WorldClock.clock.advanceTime( gap / 1000 );
            return false;
        }
    
        stop():void {
            egret.stopTick(this.tick,this);
        }
    }
}
