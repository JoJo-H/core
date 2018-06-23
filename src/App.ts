///<reference path="CoreMediator.ts" />
module core {

    export class App {

        public static tooltipLayout : string = '';
        public static httpRequestUrl : string;
        public static httpTimeout : number = 10000;

        constructor(){
        }

        private static _stage : egret.Stage;
        public static setStage(s:egret.Stage):void {
            this._stage = s;
        }

        public static get stage(){
            return this._stage;
        }
    }

    core.registerMediator(new CoreMediator());
    /**
     * 框架入口类，本类应在程序主入口调用run方法进行初始化
     */
    export function run(stage: egret.Stage): void {
        egret.ImageLoader.crossOrigin = 'anonymous';
        core.FrameEventCenter.getInstance().init(stage);
        // core.LayerCenter.getInstance().init(stage);
        RES.setMaxLoadingThread(8);
        if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
            core.WebUtils.addKeyboardListener();
            egret.Logger.logLevel = egret.Logger.ALL;
        }
    }

    /**
     * 获取指定类的类型
     * @param name 类型名称
     * @param defaultType 默认类型
     * @returns {any}
     */
    export function getDefinitionType(name,defaultType):any{
        if (is.truthy(name)) {
            var t = egret.getDefinitionByName(name);
            if (is.truthy(t)) {
                return t;
            }
        }
        return defaultType;
    }
    /**
     * 获取指定类的实例
     * @param args 类型构造函数参数列表
     * @param name 类型名称
     * @param defaultType 默认类型
     * @param args 类型构造函数参数列表
     * @returns {null}
     */
    export function getDefinitionInstance<T>(name:string, defaultType:any = null, ...args):T {
        var define = core.getDefinitionType(name, defaultType);
        if( is.truthy(define)) {
            return new define(...args);
        }
        return null;
    }
    
    export function propertyChange(obj,...arg):void {
        for (var i = 0; i < arg.length; i++) {
            eui.PropertyEvent.dispatchPropertyEvent(obj, eui.PropertyEvent.PROPERTY_CHANGE, arg[i]);
        }
    }

    export function getHostComponent(display:egret.DisplayObject):core.BaseComponent {
        var host:any = display.parent;
        if (this.isHostComponentType(host)) {
            return host;
        }
        while (host && !(this.isHostComponentType(host))) {
            host = host.parent;
        }

        if (this.isHostComponentType(host)) {
            return host;
        }

        return null;
    }

    export function destoryChildren(container:any):void {
        var children = container.numChildren;
        for (var i = 0; i < children; i ++) {
            var item = container.getChildAt(i);
            if (item instanceof BaseComponent) {
                item.destoryData();
            } else if (item instanceof Button) {
                item.destoryData();
            } else if (item instanceof eui.Group) {
                this.destoryChildren(item);
            } else if (item instanceof eui.Scroller) {
                this.destoryChildren(item);
            } else if (item instanceof ItemRenderer) {
                item.destoryData();
            }
        }
    }

    export function getChildByName(name, display):egret.DisplayObject {
        var num = display.numChildren;
        for (var i = 0; i < num; i++) {
            var child = display.getChildAt(i);
            if (child instanceof egret.DisplayObjectContainer) {
                if (child.name == name) {
                    return child;
                }
                else {
                    return this.getChildByName(name, child);
                }
            }
            else if (child.name == name) {
                return child;
            }
        }
        return null;
    };
}