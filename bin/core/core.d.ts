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
