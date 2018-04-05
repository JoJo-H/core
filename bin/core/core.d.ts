declare module core {
    class ComponentState {
        private _component;
        private _args;
        private _listeners;
        constructor(component: IComponent);
        getArgs(): any;
        setArgs(args: any): void;
        private _isFull;
        readonly isFull: boolean;
        setFull(): void;
        private _type;
        isType(type: UIType): boolean;
        setType(type: UIType): void;
        listener(component: eui.Component, type: string, func: (e: egret.Event) => void): void;
        clearLiteners(): void;
        onAddToStage(e: any): void;
        onRemovedFromStage(): void;
    }
}
declare module core {
    class App {
        constructor();
        private static _stage;
        static setStage(s: egret.Stage): void;
        static readonly stage: egret.Stage;
    }
}
declare module core {
    class DBFaseMovie extends egret.DisplayObjectContainer implements IMovie {
        private _dataPath;
        private _texturePath;
        private _fileName;
        isCache: boolean;
        private _atLast;
        constructor();
        setPath(path: string): void;
        private prepareResource();
        private _playName;
        play(name: string, playTimes?: number): void;
        gotoAndStop(name: string, frame: number): void;
        gotoAndPlay(name: string, frame: number, playTimes?: number): void;
        private _mc;
        private getMC();
        private _frameRate;
        frameRate: number;
        atLast: boolean;
        private clearEvents();
        private initEvents();
        private onLoopComplete(e);
        private onComplete(e);
        private onFrameLabel(e);
        private onRemoved(e);
        dispose(): void;
    }
}
declare module core {
    class DragonMovie extends egret.DisplayObjectContainer implements IMovie {
        atLast: boolean;
        isCache: boolean;
        constructor();
        private _skeletonJson;
        private _textureImage;
        private _textureJson;
        private _armatureName;
        private _dragonBonesName;
        private _fileName;
        private _intialized;
        setPath(path: string, armature?: string): void;
        armature: string;
        play(name: string, playTimes?: number): void;
        private _armature;
        private _replaceDisplayArr;
        getArmture(): dragonBones.Armature;
        gotoAndStop(name: string, frame: any): void;
        gotoAndPlay(name: string, frame: any, playTimes?: number): void;
        private prepareResource();
        private onFrame(e);
        private onComplete(e);
        private start(e);
        private frameEvent(evt);
        private _initEvent;
        private onAddToStage();
        private initEvent();
        private onRemoveFromStage();
        private _frameRate;
        frameRate: number;
        dispose(): void;
        replaceDisplay(slotName: string, display: egret.DisplayObject): void;
        addReplaceDisplayInfo(info: MovieSlotDisplayInfo): void;
        replaceGlobal(textureName: string): void;
        getSlot(slotName: string): dragonBones.Slot;
    }
    interface MovieSlotDisplayInfo {
        name: string;
        display: egret.DisplayObject | string;
        offsetX?: number;
        offsetY?: number;
    }
}
declare module core {
    class MovieClip extends egret.DisplayObjectContainer implements IMovie {
        private _dataPath;
        private _texturePath;
        private _filename;
        private _atLast;
        isCache: boolean;
        atLast: boolean;
        constructor();
        setPath(path: string): void;
        private prepareResource();
        play(name: string, playTimes?: number): void;
        gotoAndStop(name: string, frame: any): void;
        gotoAndPlay(name: string, frame: any, playTimes?: number): void;
        private getMC(name);
        private _frameRate;
        frameRate: number;
        private _hasEvent;
        private clearEvents();
        private initEvents();
        private _mc;
        private onLoopComplete(e);
        private onComplete(e);
        private onFrameLabel(e);
        private onRemoved(e);
        dispose(): void;
    }
}
declare module core {
    class MovieClock {
        private _lastTime;
        constructor();
        start(): void;
        private tick(time);
        stop(): void;
    }
}
declare module core {
    class MovieEvent extends egret.Event {
        static FRAME_LABEL: string;
        static LOOP_COMPLETE: string;
        static COMPLETE: string;
        constructor(name: string, label?: string);
        private _frameLabel;
        readonly frameLabel: string;
    }
}
declare module core {
    /**
     * 接口信息
     */
    interface ProxyInfo {
        /**
         * 接口名称
         */
        moddo: string;
        /**
         * 请求时是否显示简单载入条(默认:是)
         */
        mask?: boolean;
        /**
         * 请求数据是否进行缓存(默认:否)
         */
        cache?: boolean;
        /**
         * 请求参数
         */
        params?: any;
    }
}
declare module core {
    class NotificationKey {
        constructor();
        /**
         * 缓存请求数据
         * @type {string}
         */
        static CacheChange: string;
        static getModDo(moddo: string | ProxyInfo): any;
        /**
         * 缓存请求数据前
         * @param moddo
         * @returns {string}
         * @constructor
         */
        static BeforeChange(moddo: string | ProxyInfo): any;
        static AfterChange(moddo: string | ProxyInfo): any;
        /**
         * 返回特定接口缓存更新的通知事件名
         * @param moddo 接口名称
         * @returns {string} 更新通知事件名
         * @constructor
         */
        static Change(moddo: string | ProxyInfo): any;
        /**
         * 返回特定接口缓存数据的通知事件名
         * @param moddo 接口名称
         * @returns {string} 缓存通知事件名
         * @constructor
         */
        static Cache(moddo: string | ProxyInfo): any;
    }
    /**
     * 框架基础通知事件
     * @type {core.NotificationKey}
     */
    let k: typeof NotificationKey;
}
declare module core {
    interface IAttributeHost {
        updateAttribute(attribute: Attribute): void;
    }
    class Attribute extends eui.Component {
        private _name;
        private _value;
        private _type;
        constructor();
        name: string;
        type: any;
        value: any;
        onUpdate(): void;
        add(): void;
    }
}
declare module core {
    interface IComponent extends egret.DisplayObject {
        onEnter(...args: any[]): void;
        onExit(): void;
        listener(component: eui.Component, type: string, sender: (e: egret.Event) => void): void;
        setState(name: string): IComponent;
        setData(data: any, type?: any): IComponent;
        setCompName(name: string): IComponent;
    }
    class BaseComponent extends eui.Component implements IComponent {
        private _data;
        private _dataMapArr;
        private _args;
        private _componentName;
        private $_state;
        constructor(...args: any[]);
        listener(component: eui.Component, type: string, sender: (e: egret.Event) => void): void;
        clearListeners(): void;
        private _hook;
        hook: IComponentHook;
        addOperate(operate: IComponentOperate<any>): BaseComponent;
        removeOperate(operate: IComponentOperate<any>): void;
        clearOperate(): void;
        removeOperateByName(name: string): void;
        getOperateByName(name: string): IComponentOperate<any>[];
        getArgs(): any;
        setArgs(args: any): void;
        updateAttribute(attribute: Attribute): void;
        data: any;
        private addDataMap(name);
        readonly isFull: boolean;
        setFull(): this;
        setData(data: any, type?: any): BaseComponent;
        protected dataChanged(): void;
        setState(name: string): this;
        setCompName(name: string): this;
        componentName: string;
        isType(type: UIType): boolean;
        setType(type: UIType): void;
        private onAddToStage(e);
        private onRemoveFromStage(e);
        onEnter(...args: any[]): void;
        onExit(): void;
        destoryData(): void;
    }
}
declare module core {
    interface IComponentHook {
        setData(data: any, type?: any): void;
        addOperate(operate: IComponentOperate<any>): void;
        removeOperate(operate: IComponentOperate<any>): void;
        clearOperate(): void;
        removeOperateByName(name: string): void;
        getOperateByName(name: string): IComponentOperate<any>[];
        getOperateByType(type: string): IComponentOperate<any>[];
        onEnter(...args: any[]): void;
        onExit(): void;
    }
    class ComponentHook implements IComponentHook {
        private _component;
        constructor(component: IComponent);
        setData(data: any, type?: any): void;
        onEnter(...args: any[]): void;
        onExit(): void;
        private _operates;
        addOperate(operate: IComponentOperate<any>): void;
        removeOperate(operate: IComponentOperate<any>): void;
        clearOperate(): void;
        removeOperateByName(name: string): void;
        getOperateByName(name: string): IComponentOperate<any>[];
        getOperateByType(type: string): IComponentOperate<any>[];
    }
}
declare module core {
    enum MovieType {
        DRAGON = 0,
        DBFAST = 1,
        MOVIECLIP = 2,
        SEQUNCE_MOVIE = 3,
    }
    interface IMovie extends egret.DisplayObject {
        play(name: string, playTimes?: number): void;
        gotoAndStop(name: string, frame: any): void;
        gotoAndPlay(name: string, frame: any, playTimes?: number): void;
        dispose(): void;
        /**
         * 动画是否停留在最后
         */
        atLast: boolean;
        frameRate: number;
        /**
         * 是否缓存进对象池
         */
        isCache: boolean;
    }
    interface IMovieOptionInfo {
        onComplete?: Function;
        playTimes?: number;
        actionName?: string;
        scaleX?: number;
        scaleY?: number;
        container?: egret.DisplayObjectContainer;
        offsetX?: number;
        offsetY?: number;
    }
    class BaseFactory {
        constructor();
        private static _egretFactory;
        private static _movieClock;
        static getEgretFactory(): dragonBones.EgretFactory;
        private static initClock();
        private static create(path, type, armature?);
        static fast(option: IMovieOptionInfo, dbName: string): IMovie;
        static playAnim(option: IMovieOptionInfo, name: string, armature: string): IMovie;
        private static play(movie, option);
        static getFilenameWithoutExt(path: string): string;
    }
}
declare module core {
    enum UIType {
        SCENE = 0,
        COMMON = 1,
        PANEL = 2,
        MENU = 3,
        BOX = 4,
        GUIDE = 5,
        TOOLTIP = 6,
    }
}
declare module core {
    interface IMediator {
        getMediatorName(): string;
        listNotificationInterests(): string[];
        handleNotification(notification: INotification): void;
        onRegister(): void;
        onRemove(): void;
    }
    class Mediator implements IMediator {
        /**
         * The name of the <code>Mediator</code>.
         */
        mediatorName: string;
        constructor(mediatorName?: string);
        getMediatorName(): string;
        /**
         * List the <code>INotification</code> names this <code>IMediator</code> is interested in
         * being notified of.
         * @return The list of notifications names in which is interested the <code>Mediator</code>.
         */
        listNotificationInterests(): string[];
        /**
         * Handle <code>INotification</code>s.
         * Typically this will be handled in a switch statement, with one 'case' entry per
         * <code>INotification</code> the <code>Mediator</code> is interested in.
         * @param notification The notification instance to be handled.
         */
        handleNotification(notification: INotification): void;
        /**
         * Called by the View when the Mediator is registered. This method has to be overridden
         * by the subclass to know when the instance is registered.
         */
        onRegister(): void;
        /**
         * Called by the View when the Mediator is removed. This method has to be overridden
         * by the subclass to know when the instance is removed.
         */
        onRemove(): void;
        /**
         * Default name of the <code>Mediator</code>.
         * @constant
         */
        static NAME: string;
    }
}
declare module core {
    interface IModel {
        getProxyName(): string;
        setData(data: any): void;
        getData(): any;
        onRegister(): void;
        onRemove(): void;
    }
    class Model extends egret.EventDispatcher implements IModel {
        private _proxyName;
        private _data;
        constructor(proxyName?: string, data?: any);
        getProxyName(): string;
        setData(data: any): void;
        getData(): any;
        onRegister(): void;
        onRemove(): void;
        static NAME: string;
    }
}
declare module core {
    function registerMediator(mediator: IMediator): void;
    function retrieveMediator(mediatorName: string): void;
    function hasMediator(mediatorName: string): void;
    function removeMediator(mediatorName: string): void;
    function registerModel(proxy: IModel): void;
    function retrieveModel(proxyName: string): void;
    function hasModel(proxyName: string): void;
    function removeModel(proxyName: string): void;
    function addNotification(notifyName: string, method: Function, context: any, priority?: number): void;
    function sendNotification(notifyName: string, body?: any, type?: any): void;
    function removeNotification(notifyName: string, context: any): void;
    function removeNotificationByName(notifyName: string): void;
    function removeNotificationByContext(context: any): void;
    function hasNotification(notifyName: string, context: any): boolean;
}
declare module core {
    class Notification implements INotification {
        private name;
        private body;
        private type;
        constructor(name: string, body?: any, type?: string);
        getName(): string;
        setBody(body: any): void;
        getBody(): any;
        setType(type: string): void;
        getType(): string;
        toString(): string;
    }
    interface INotification {
        getName(): string;
        setBody(body: any): void;
        getBody(): any;
        setType(type: string): void;
        getType(): string;
        toString(): string;
    }
}
declare module core {
    class Observer implements IObserver {
        private _notifyMethod;
        private _context;
        private _priority;
        constructor(notifyMethod: Function, notifyContext: any, priority?: number);
        getNotifyMethod(): Function;
        setNotifyMethod(notifyMethod: Function): void;
        getNotifyContext(): any;
        setNotifyContext(notifyContext: any): void;
        getPriority(): number;
        setPriority(val: number): void;
        notifyObserver(notification: INotification): void;
        compareNotifyContext(object: any): boolean;
    }
    interface IObserver {
        getNotifyMethod(): void;
        setNotifyMethod(notifyMethod: Function): void;
        getNotifyContext(): void;
        setNotifyContext(notifyContext: any): void;
        getPriority(): number;
        setPriority(val: number): void;
        notifyObserver(notification: INotification): void;
        compareNotifyContext(object: any): boolean;
    }
}
declare module core {
    interface IComponentOperate<T> {
        type: string;
        getName(): string;
        setName(val: string): T;
        enter(component: IComponent): void;
        exit(component: IComponent): void;
    }
    class BaseOperate<T> extends egret.HashObject implements IComponentOperate<T> {
        private _name;
        type: string;
        setName(name: string): T;
        getName(): string;
        enter(component: BaseComponent): void;
        exit(component: BaseComponent): void;
    }
}
declare module core {
    class display {
        static setFullDisplay(display: egret.DisplayObject): void;
        /**
         * 移除容器中的所有子显示对象
         * @param container 需要移除子显示对象的容器
         */
        static removeAllChildren(container: egret.DisplayObjectContainer): void;
        /**
         * 移除显示对象,可以是egret的显示对象,也可以是继承组件
         * @param child 子显示对象  child:egret.DisplayObject|BaseComponent
         */
        static removeFromParent(child: egret.DisplayObject): void;
        /**
         * 设置显示对象的相对描点
         * @param disObj 需要设置描点的显示对象
         * @param anchorX X轴相对描点
         * @param anchorY Y轴相对描点
         */
        static setAnchor(disObj: egret.DisplayObject, anchorX: number, anchorY?: number): void;
        static readonly stageW: number;
        static readonly stageH: number;
    }
}
declare module core {
    class is {
        constructor();
        static toString: () => string;
        static truthy(value: any): boolean;
        static falsy(value: any): boolean;
        static existy(value: any): boolean;
        static undefined(value: any): boolean;
        static nan(value: any): boolean;
        static nul(value: any): boolean;
        static number(value: any): boolean;
        static object(value: any): boolean;
        static fun(value: any): boolean;
        static array(value: any): boolean;
        static bool(value: any): boolean;
        static date(value: any): boolean;
        static regexp(value: any): boolean;
        static string(value: any): boolean;
        static char(value: any): boolean;
        static even(numb: any): boolean;
        static odd(numb: any): boolean;
        static decimal(numb: any): boolean;
        static integer(numb: any): boolean;
    }
}
declare module core {
}
declare module core {
    /**
     * 返回指定分类的类型单例
     * @param clz 单例化的类型
     * @returns {any} 单例对象
     */
    function singleton<T>(clz: {
        new (): T;
    }): T;
    /**
     * 返回指定分类的类型单例
     * @param clz 单例化的类型
     * @param type 分类名称
     * @returns {any} 单例对象
     */
    function typeSingleton<T>(clz: {
        new (): T;
    }, type: string): T;
}
declare module core {
    function getTypeId(type: any): any;
    /**
     * 指定类型是否存在类型编号
     * @param type 指定类型
     * @returns {boolean} 是否存在类型编号
     */
    function hasTypeId(type: any): boolean;
}
