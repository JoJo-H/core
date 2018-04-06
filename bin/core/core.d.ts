declare module core {
    interface IComponent extends egret.DisplayObject {
        onEnter(...args: any[]): void;
        onExit(): void;
        listener(component: eui.Component, type: string, sender: (e: egret.Event) => void): void;
        setState(name: string): IComponent;
        setData(data: any, type?: any): IComponent;
        setCompName(name: string): IComponent;
        getView(name: any): egret.DisplayObject;
    }
    class BaseComponent extends eui.Component implements IComponent {
        private _data;
        private _dataMapArr;
        private _componentName;
        private _compState;
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
        getView(name: any): egret.DisplayObject;
    }
}
declare module core {
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
        static CLICK_BUTTON: string;
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
    function setAttribute(component: egret.DisplayObjectContainer): void;
}
declare module core {
    class App {
        static tooltipLayout: string;
        constructor();
        private static _stage;
        static setStage(s: egret.Stage): void;
        static readonly stage: egret.Stage;
    }
    /**
     * 获取指定类的类型
     * @param name 类型名称
     * @param defaultType 默认类型
     * @returns {any}
     */
    function getDefinitionType(name: any, defaultType: any): any;
    /**
     * 获取指定类的实例
     * @param args 类型构造函数参数列表
     * @param name 类型名称
     * @param defaultType 默认类型
     * @param args 类型构造函数参数列表
     * @returns {null}
     */
    function getDefinitionInstance<T>(name: string, defaultType?: any, ...args: any[]): T;
    function propertyChange(obj: any, ...arg: any[]): void;
    function getHostComponent(display: egret.DisplayObject): core.BaseComponent;
    function destoryChildren(container: any): void;
    function getChildByName(name: any, display: any): egret.DisplayObject;
}
declare module core {
    class Button extends eui.Component {
        static THROTTLE_TIME: number;
        constructor();
        private onAddToStage(e);
        private _throttleTime;
        throttleTime: number;
        private _notice;
        notice: string;
        private _data;
        data: any;
        private addDataMap(name);
        private _dataMapArr;
        dataChanged(): void;
        protected onEnter(): void;
        protected onExit(): void;
        private _throttleFun;
        readonly throttleFun: Function;
        private onRemoveFromStage(e);
        destoryData(): void;
        dispose(): void;
        labelDisplay: eui.IDisplayText;
        private _label;
        label: string;
        iconDisplay: eui.Image;
        private _icon;
        icon: string | egret.Texture;
        private setIconSource(icon);
        /**
         * @private
         * 指示第一次分派 TouchEvent.TOUCH_BEGIN 时，触摸点是否在按钮上。
         */
        private touchCaptured;
        /**
         * 解除触碰事件处理。
         * @param event 事件 <code>egret.TouchEvent</code> 的对象。
         * @version Egret 3.0.1
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        protected onTouchCancle(event: egret.TouchEvent): void;
        /**
         * 触碰事件处理。
         * @param event 事件 <code>egret.TouchEvent</code> 的对象。
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        protected onTouchBegin(event: egret.TouchEvent): void;
        /**
         * @private
         * 舞台上触摸弹起事件
         */
        private onStageTouchEnd(event);
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        protected getCurrentState(): string;
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        protected partAdded(partName: string, instance: any): void;
        /**
         * 当在用户单击按钮之后处理 <code>egret.TouchEvent.TOUCH_END</code> 事件时，将调用此方法。
         * 仅当以按钮为目标，并且 <code>touchCaptured</code> 为 <code>true</code> 时，才会调用此方法。
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        protected buttonReleased(): void;
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
    class ItemRenderer extends eui.ItemRenderer implements IComponent, IAttributeHost {
        private _state;
        constructor();
        private _notice;
        notice: string;
        private _componentName;
        componentName: string;
        private _ignoreButton;
        ignoreButton: boolean;
        private $_data;
        data: any;
        private _dataMapArr;
        private addDataMap(name);
        setData(data: any, type?: any): core.IComponent;
        dataChanged(): void;
        updateAttribute(attribute: core.Attribute): void;
        setState(name: string): core.IComponent;
        setCompName(name: string): core.IComponent;
        listener(component: eui.Component, type: any, sender: (e: egret.Event) => void): void;
        clearListeners(): void;
        onEnter(): void;
        onExit(): void;
        protected getCurrentState(): string;
        destoryData(): void;
        private tap(e);
        getView(name: any): egret.DisplayObject;
    }
}
declare module core {
    class ProgressBar extends eui.ProgressBar {
        private _data;
        data: any;
    }
}
declare module core {
    class RadioButton extends eui.RadioButton {
        private _data;
        data: any;
        private _notice;
        notice: string;
        protected getCurrentState(): string;
        customState: string;
        protected buttonReleased(): void;
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
    class ToggleButton extends eui.ToggleButton {
        private _data;
        data: any;
        private _notice;
        notice: string;
        constructor();
        getButton(name: string): this;
        protected getCurrentState(): string;
        protected buttonReleased(): void;
    }
}
declare module core {
    interface ITooltip {
        show(info: TooltipInfo | string, skinName?: string): void;
        customView(skinName: string, data: any, delay?: number): void;
        skinName: string;
    }
    interface TooltipInfo {
        text: string;
        size?: number;
        color?: number;
        delay?: number;
    }
    class Tooltip extends BaseComponent implements ITooltip {
        private _items;
        constructor();
        show(arg: TooltipInfo | string, skinName?: string): void;
        private createItem(item, delay);
        private removeItem(item);
        customView(skinName: string, data: any, delay?: number): void;
        private _layout;
        readonly layout: ITooltipLayout;
    }
    interface ITooltipLayout {
        layout(items: BaseComponent[]): void;
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
    /**
     * 游戏UI界面控制器
     * 目前支持的容器(层级从下往上):场景层、公共UI层、面板层、菜单层、弹框层、新手引导层、浮动层
     */
    class UI extends eui.UILayer {
        private _tooltip;
        private _guide;
        private _box;
        private _common;
        private _panel;
        private _menu;
        private _scene;
        private _topScene;
        private _containerArr;
        constructor();
        getContainerByType(type: UIType): eui.UILayer;
        hasPanel(): boolean;
        private getComponentByName(name, container);
    }
}
declare module core {
    interface IAnimation {
        show(target: IComponent, calblack: Function): void;
        hide(target: IComponent, callback: Function): void;
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
         * @param child 子显示对象
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
    class fun {
        static throttle(fn: any, delay: any, immediate?: boolean, debounce?: any): () => void;
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
    class obj {
        static deepClone(obj: any): any;
        static deepClone2(obj: any): any;
        /**
         * @desc 深拷贝，支持常见类型
         * @param {Any} values
         */
        static deepCloneCommon(values: any): any;
        static simpleClone(obj: any): {};
        static getValue(data: any, key: any, defVal?: any): any;
        static hasValue(data: any, key: any): boolean;
    }
}
declare module core {
    /**
     * 对象池
     */
    class ObjectPool<T> {
        private _type;
        constructor(type: any);
        private _leftArr;
        private _useArr;
        /**
         * 回收对象,当不需要使用对象池创建的对象时,使用该方法回收对象
         * @param instance
         */
        push(instance: T): void;
        /**
         * 拉取对象,如果对象池中不存在任何可供使用的对象,则会创建出新的对象
         * 如果对象有init函数，则执行该函数传入参数
         * @param args 初始化对象的参数列表
         * @returns {any}
         */
        pop(...args: any[]): T;
    }
    class pool {
        constructor();
        private static _poolMap;
        /**
         * 获取指定类型的对象池
         * @param clz 指定的类型
         * @returns {ObjectPool<T>} 类型对象池
         */
        static getPool<T>(clz: {
            new (): T;
        }): ObjectPool<T>;
        /**
         * 获取指定分组的类型对象池
         * @param clz 指定类型
         * @param type 类别
         * @returns {any} 类型对象池
         */
        static getTypePool<T>(clz: {
            new (): T;
        }, type: string): ObjectPool<T>;
    }
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
