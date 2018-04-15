
module core {

    export interface IHook<T> {
        register(type:T):void;
        remove(type:T):void;
        reset():void;
        items : T[];
    }

    export class Hook<T> implements IHook<T> {
        private _hookMap : T[] = [];
        constructor(){

        }
        register(type:T):void{
            this._hookMap.push(type);
        }
        remove(type:T):void{
            let index = this._hookMap.indexOf(type);
            if(index!=-1){
                this._hookMap.splice(index,1);
            }
        }
        reset():void{
            this._hookMap = [];
        }
        get items():T[]{
            return this._hookMap;
        }
    }

    export interface IHooks {
        ui : IHook<IUIHook>;
        button : IHook<IButtonHook>;
    }

    export interface IUIHook{
        onAdd?(component:IComponent):void;
        onRemove?(component:IComponent):void;
    }

    export interface IButtonHook {
        onClick?(btn:core.Button):void;
    }

    export class Hooks implements IHooks {
        public ui = new Hook<IUIHook>();
        public button = new Hook<IButtonHook>();
    }

    export var hooks = new Hooks();


    export function invokeHook<T>(hook: IHook<T>, funName: string, ...args): boolean {
        var items = hook.items;
        var r = true;
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            if (item[funName]) {
                var r2 = item[funName](...args);
                if (r2 === false) {
                    r = false;
                }
            }
        }
        return r;
    }
}