var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var core;
(function (core) {
    var Notification = (function () {
        function Notification(name, body, type) {
            if (body === void 0) { body = null; }
            if (type === void 0) { type = null; }
            this.name = null;
            this.body = null;
            this.type = null;
            this.name = name;
            this.body = body;
            this.type = type;
        }
        Notification.prototype.getName = function () {
            return this.name;
        };
        Notification.prototype.setBody = function (body) {
            this.body = body;
        };
        Notification.prototype.getBody = function () {
            return this.body;
        };
        Notification.prototype.setType = function (type) {
            this.type = type;
        };
        Notification.prototype.getType = function () {
            return this.type;
        };
        Notification.prototype.toString = function () {
            var msg = "Notification Name: " + this.getName();
            msg += "\nBody:" + ((this.getBody() == null) ? "null" : this.getBody().toString());
            msg += "\nType:" + ((this.getType() == null) ? "null" : this.getType());
            return msg;
        };
        return Notification;
    }());
    core.Notification = Notification;
    __reflect(Notification.prototype, "core.Notification", ["core.INotification"]);
})(core || (core = {}));
var core;
(function (core) {
    var ProxyCache = (function () {
        function ProxyCache() {
            this._cacheData = null;
            if (ProxyCache.instance) {
                throw Error("ProxyCache singleton already constructed!");
            }
            ProxyCache._instance = this;
            this._cacheData = {};
        }
        Object.defineProperty(ProxyCache, "instance", {
            get: function () {
                if (!this._instance) {
                    this._instance = new ProxyCache();
                }
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        // private setCache(proxy:Proxy):void {
        //     var params:any = proxy.params;
        //     if (params.hasOwnProperty("cache") && params["cache"] === true) {
        //         var data = proxy.responseData;
        //         var smod = proxy.getParamByName("mod");
        //         var sdo = proxy.getParamByName("do");
        //         if (!this._cacheData.hasOwnProperty(smod)) {
        //             this._cacheData[smod] = {};
        //         }
        //         this._cacheData[smod][sdo] = data;
        //         sendNotification(k.Cache(smod + "." + sdo), data);
        //     }
        // }
        ProxyCache.prototype.getCache = function (smod, sdo) {
            if (smod === void 0) { smod = null; }
            if (sdo === void 0) { sdo = null; }
            if (smod == null) {
                return this._cacheData;
            }
            if (this.isCache(smod, sdo)) {
                var params = this.formatParmas(smod, sdo);
                return this._cacheData[params[0]][params[1]];
            }
            return null;
        };
        ProxyCache.prototype.formatParmas = function (smod, sdo) {
            if (sdo === void 0) { sdo = null; }
            if (sdo == null) {
                var arr = smod.split(".");
                smod = arr[0];
                sdo = arr[1];
            }
            return [smod, sdo];
        };
        ProxyCache.prototype.isCache = function (smod, sdo) {
            if (sdo === void 0) { sdo = null; }
            var params = this.formatParmas(smod, sdo);
            return this._cacheData.hasOwnProperty(params[0]) &&
                this._cacheData[params[0]].hasOwnProperty(params[1]);
        };
        ProxyCache._instance = null;
        return ProxyCache;
    }());
    __reflect(ProxyCache.prototype, "ProxyCache");
})(core || (core = {}));
var core;
(function (core) {
    var Mediator = (function () {
        function Mediator(mediatorName) {
            if (mediatorName === void 0) { mediatorName = null; }
            /**
             * The name of the <code>Mediator</code>.
             */
            this.mediatorName = null;
            this.mediatorName = (mediatorName != null) ? mediatorName : Mediator.NAME;
        }
        Mediator.prototype.getMediatorName = function () {
            return this.mediatorName;
        };
        /**
         * List the <code>INotification</code> names this <code>IMediator</code> is interested in
         * being notified of.
         * @return The list of notifications names in which is interested the <code>Mediator</code>.
         */
        Mediator.prototype.listNotificationInterests = function () {
            return [];
        };
        /**
         * Handle <code>INotification</code>s.
         * Typically this will be handled in a switch statement, with one 'case' entry per
         * <code>INotification</code> the <code>Mediator</code> is interested in.
         * @param notification The notification instance to be handled.
         */
        Mediator.prototype.handleNotification = function (notification) {
        };
        /**
         * Called by the View when the Mediator is registered. This method has to be overridden
         * by the subclass to know when the instance is registered.
         */
        Mediator.prototype.onRegister = function () {
        };
        /**
         * Called by the View when the Mediator is removed. This method has to be overridden
         * by the subclass to know when the instance is removed.
         */
        Mediator.prototype.onRemove = function () {
        };
        /**
         * Default name of the <code>Mediator</code>.
         * @constant
         */
        Mediator.NAME = 'Mediator';
        return Mediator;
    }());
    core.Mediator = Mediator;
    __reflect(Mediator.prototype, "core.Mediator", ["core.IMediator"]);
})(core || (core = {}));
var core;
(function (core) {
    var Model = (function (_super) {
        __extends(Model, _super);
        function Model(proxyName, data) {
            if (proxyName === void 0) { proxyName = null; }
            if (data === void 0) { data = null; }
            var _this = _super.call(this) || this;
            _this._proxyName = null;
            _this._data = null;
            _this._proxyName = (proxyName != null) ? proxyName : Model.NAME;
            if (data != null)
                _this.setData(data);
            return _this;
        }
        Model.prototype.getProxyName = function () {
            return this._proxyName;
        };
        Model.prototype.setData = function (data) {
            this._data = data;
        };
        Model.prototype.getData = function () {
            return this._data;
        };
        Model.prototype.onRegister = function () {
        };
        Model.prototype.onRemove = function () {
        };
        Model.NAME = "Proxy";
        return Model;
    }(egret.EventDispatcher));
    core.Model = Model;
    __reflect(Model.prototype, "core.Model", ["core.IModel"]);
})(core || (core = {}));
var core;
(function (core) {
    var MVCSystem = (function () {
        function MVCSystem() {
            this._observerMap = null;
            this._mediatorMap = null;
            this._modelMap = null;
            if (MVCSystem._instance)
                throw Error("MVCSystem singleton already constructed!");
            MVCSystem._instance = this;
            this._observerMap = {};
            this._mediatorMap = {};
            this._modelMap = {};
        }
        Object.defineProperty(MVCSystem, "instance", {
            get: function () {
                if (!MVCSystem._instance)
                    MVCSystem._instance = new MVCSystem();
                return MVCSystem._instance;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 注册Mediator
         * @param mediator
         */
        MVCSystem.prototype.registerMediator = function (mediator) {
            var name = mediator.getMediatorName();
            if (this._mediatorMap[name]) {
                return;
            }
            this._mediatorMap[name] = mediator;
            var interests = mediator.listNotificationInterests();
            var len = interests.length;
            if (len > 0) {
                var observer = new core.Observer(mediator.handleNotification, mediator);
                for (var i = 0; i < len; i++) {
                    this.registerObserver(interests[i], observer);
                }
            }
            mediator.onRegister();
        };
        /**
         * 获取Mediator
         * @param mediatorName
         */
        MVCSystem.prototype.retrieveMediator = function (mediatorName) {
            return this._mediatorMap[mediatorName] || null;
        };
        MVCSystem.prototype.removeMediator = function (mediatorName) {
            var mediator = this._mediatorMap[mediatorName];
            if (!mediator)
                return null;
            var interests = mediator.listNotificationInterests();
            var i = interests.length;
            while (i--)
                this.removeObserver(interests[i], mediator);
            delete this._mediatorMap[mediatorName];
            mediator.onRemove();
            return mediator;
        };
        MVCSystem.prototype.hasMediator = function (mediatorName) {
            return this._mediatorMap[mediatorName] != null;
        };
        MVCSystem.prototype.registerModel = function (model) {
            var name = model.getProxyName();
            if (this._modelMap[name]) {
                return;
            }
            this._modelMap[name] = model;
            model.onRegister();
        };
        MVCSystem.prototype.removeModel = function (modelName) {
            var model = this._modelMap[modelName];
            if (model) {
                delete this._modelMap[modelName];
                model.onRemove();
            }
            return model;
        };
        MVCSystem.prototype.retrieveModel = function (modelName) {
            //Return a strict null when the model doesn't exist
            return this._modelMap[modelName] || null;
        };
        MVCSystem.prototype.hasModel = function (modelName) {
            return this._modelMap[modelName] != null;
        };
        MVCSystem.prototype.registerObserver = function (notifyName, observer) {
            var observers = this._observerMap[notifyName];
            if (observers && observers.length > 0) {
                if (!this.checkObserver(notifyName, observer.getNotifyContext())) {
                    observers.push(observer);
                    observers.sort(function (a, b) {
                        return b.getPriority() - a.getPriority();
                    });
                }
                else {
                    console.warn('registerObserver重复注册:', notifyName);
                }
            }
            else {
                this._observerMap[notifyName] = [observer];
            }
        };
        MVCSystem.prototype.checkObserver = function (notifyName, context) {
            var observers = this._observerMap[notifyName];
            var len = observers.length;
            for (var i = 0; i < len; i++) {
                var observer = observers[i];
                if (observer.compareNotifyContext(context)) {
                    return true;
                }
            }
            return false;
        };
        MVCSystem.prototype.notifyObservers = function (notification) {
            var notifyName = notification.getName();
            var observers = this._observerMap[notifyName];
            if (observers) {
                //copy
                var observersRef = observers.slice(0);
                var len = observersRef.length;
                for (var i = 0; i < len; i++) {
                    var observer = observersRef[i];
                    observer.notifyObserver(notification);
                }
            }
        };
        MVCSystem.prototype.removeObserver = function (notifyName, context) {
            var observers = this._observerMap[notifyName];
            if (observers) {
                var i = observers.length;
                while (i--) {
                    var observer = observers[i];
                    if (observer.compareNotifyContext(context)) {
                        observers.splice(i, 1);
                        break;
                    }
                }
            }
        };
        MVCSystem.prototype.removeObserverByName = function (notifyName) {
            this._observerMap[notifyName] = [];
        };
        MVCSystem.prototype.removeObserverByContext = function (context) {
            for (var notifyName in this._observerMap) {
                this.removeObserver(notifyName, context);
            }
        };
        return MVCSystem;
    }());
    __reflect(MVCSystem.prototype, "MVCSystem");
    function registerMediator(mediator) {
        core.singleton(MVCSystem).registerMediator(mediator);
    }
    core.registerMediator = registerMediator;
    function retrieveMediator(mediatorName) {
        core.singleton(MVCSystem).retrieveMediator(mediatorName);
    }
    core.retrieveMediator = retrieveMediator;
    function hasMediator(mediatorName) {
        core.singleton(MVCSystem).hasMediator(mediatorName);
    }
    core.hasMediator = hasMediator;
    function removeMediator(mediatorName) {
        core.singleton(MVCSystem).removeMediator(mediatorName);
    }
    core.removeMediator = removeMediator;
    function registerModel(proxy) {
        core.singleton(MVCSystem).registerModel(proxy);
    }
    core.registerModel = registerModel;
    function retrieveModel(proxyName) {
        core.singleton(MVCSystem).retrieveModel(proxyName);
    }
    core.retrieveModel = retrieveModel;
    function hasModel(proxyName) {
        core.singleton(MVCSystem).hasModel(proxyName);
    }
    core.hasModel = hasModel;
    function removeModel(proxyName) {
        core.singleton(MVCSystem).removeModel(proxyName);
    }
    core.removeModel = removeModel;
    function addNotification(notifyName, method, context, priority) {
        if (priority === void 0) { priority = 0; }
        core.singleton(MVCSystem).registerObserver(notifyName, new core.Observer(method, context, priority));
    }
    core.addNotification = addNotification;
    function sendNotification(notifyName, body, type) {
        if (body === void 0) { body = null; }
        if (type === void 0) { type = null; }
        core.singleton(MVCSystem).notifyObservers(new core.Notification(notifyName, body, type));
    }
    core.sendNotification = sendNotification;
    function removeNotification(notifyName, context) {
        core.singleton(MVCSystem).removeObserver(notifyName, context);
    }
    core.removeNotification = removeNotification;
    function removeNotificationByName(notifyName) {
        core.singleton(MVCSystem).removeObserverByName(notifyName);
    }
    core.removeNotificationByName = removeNotificationByName;
    function removeNotificationByContext(context) {
        core.singleton(MVCSystem).removeObserverByContext(context);
    }
    core.removeNotificationByContext = removeNotificationByContext;
    function hasNotification(notifyName, context) {
        return core.singleton(MVCSystem).checkObserver(notifyName, context);
    }
    core.hasNotification = hasNotification;
})(core || (core = {}));
var core;
(function (core) {
    var NotificationKey = (function () {
        function NotificationKey() {
        }
        NotificationKey.getModDo = function (moddo) {
            if (core.is.string(moddo)) {
                return moddo;
            }
            if (moddo && moddo.moddo) {
                return moddo.moddo;
            }
            return null;
        };
        /**
         * 缓存请求数据前
         * @param moddo
         * @returns {string}
         * @constructor
         */
        NotificationKey.BeforeChange = function (moddo) {
            return "BeforeChange." + NotificationKey.getModDo(moddo);
        };
        NotificationKey.AfterChange = function (moddo) {
            return "AfterChange." + NotificationKey.getModDo(moddo);
        };
        /**
         * 返回特定接口缓存更新的通知事件名
         * @param moddo 接口名称
         * @returns {string} 更新通知事件名
         * @constructor
         */
        NotificationKey.Change = function (moddo) {
            return "Change." + NotificationKey.getModDo(moddo);
        };
        /**
         * 返回特定接口缓存数据的通知事件名
         * @param moddo 接口名称
         * @returns {string} 缓存通知事件名
         * @constructor
         */
        NotificationKey.Cache = function (moddo) {
            return "Cache." + NotificationKey.getModDo(moddo);
        };
        /**
         * 缓存请求数据
         * @type {string}
         */
        NotificationKey.CacheChange = "CacheChange";
        return NotificationKey;
    }());
    core.NotificationKey = NotificationKey;
    __reflect(NotificationKey.prototype, "core.NotificationKey");
    /**
     * 框架基础通知事件
     * @type {core.NotificationKey}
     */
    core.k = NotificationKey;
})(core || (core = {}));
var core;
(function (core) {
    //实现观察者模式
    var Observer = (function () {
        function Observer(notifyMethod, notifyContext, priority) {
            if (priority === void 0) { priority = 0; }
            this._notifyMethod = null;
            this._context = null;
            this._priority = 0;
            this.setNotifyMethod(notifyMethod);
            this.setNotifyContext(notifyContext);
            this.setPriority(priority);
        }
        Observer.prototype.getNotifyMethod = function () {
            return this._notifyMethod;
        };
        Observer.prototype.setNotifyMethod = function (notifyMethod) {
            this._notifyMethod = notifyMethod;
        };
        Observer.prototype.getNotifyContext = function () {
            return this._context;
        };
        Observer.prototype.setNotifyContext = function (notifyContext) {
            this._context = notifyContext;
        };
        Observer.prototype.getPriority = function () {
            return this._priority;
        };
        Observer.prototype.setPriority = function (val) {
            this._priority = val;
        };
        Observer.prototype.notifyObserver = function (notification) {
            this.getNotifyMethod().call(this._context, notification);
        };
        Observer.prototype.compareNotifyContext = function (object) {
            return this._context == object;
        };
        return Observer;
    }());
    core.Observer = Observer;
    __reflect(Observer.prototype, "core.Observer", ["core.IObserver"]);
})(core || (core = {}));
var core;
(function (core) {
    var is = (function () {
        function is() {
        }
        is.truthy = function (value) {
            return this.existy(value) && value !== false && !this.nan(value) && value !== "" && value !== 0;
        };
        ;
        is.falsy = function (value) {
            return !this.truthy(value);
        };
        is.existy = function (value) {
            return value !== null && value !== undefined;
        };
        ;
        is.undefined = function (value) {
            return value === void 0;
        };
        ;
        is.nan = function (value) {
            return value !== value;
        };
        ;
        // is a given value null?
        is.nul = function (value) {
            return value === null;
        };
        ;
        // is a given value number?
        is.number = function (value) {
            return !this.nan(value) && is.toString.call(value) === '[object Number]';
        };
        ;
        // is a given value object?
        is.object = function (value) {
            var type = typeof value;
            return type === 'function' || type === 'object' && !!value;
        };
        ;
        // is a given value function?
        is.fun = function (value) {
            return is.toString.call(value) === '[object Function]' || typeof value === 'function';
        };
        ;
        // is a given value Array?
        is.array = function (value) {
            return Array.isArray(value) || is.toString.call(value) === '[object Array]';
        };
        ;
        // is a given value Boolean?
        is.bool = function (value) {
            return value === true || value === false || is.toString.call(value) === '[object Boolean]';
        };
        ;
        // is a given value Date Object?
        is.date = function (value) {
            return is.toString.call(value) === '[object Date]';
        };
        ;
        // is a given value RegExp?
        is.regexp = function (value) {
            return is.toString.call(value) === '[object RegExp]';
        };
        ;
        // is a given value String?
        is.string = function (value) {
            return is.toString.call(value) === '[object String]';
        };
        ;
        // is a given value Char?
        is.char = function (value) {
            return this.string(value) && value.length === 1;
        };
        ;
        is.even = function (numb) {
            return this.number(numb) && numb % 2 === 0;
        };
        ;
        // is a given number odd?
        is.odd = function (numb) {
            return this.number(numb) && numb % 2 === 1;
        };
        ;
        // is a given number decimal?
        is.decimal = function (numb) {
            return this.number(numb) && numb % 1 !== 0;
        };
        ;
        // is a given number integer?
        is.integer = function (numb) {
            return this.number(numb) && numb % 1 === 0;
        };
        ;
        // cache some methods to call later on
        is.toString = Object.prototype.toString;
        return is;
    }());
    core.is = is;
    __reflect(is.prototype, "core.is");
})(core || (core = {}));
var core;
(function (core) {
    /**
     * 对象池
     */
    var ObjectPool = (function () {
        function ObjectPool(type) {
            //剩余的对象池
            this._leftArr = [];
            //使用中的对象池
            this._useArr = [];
            this._type = type;
        }
        /**
         * 回收对象,当不需要使用对象池创建的对象时,使用该方法回收对象
         * @param instance
         */
        ObjectPool.prototype.push = function (instance) {
            var index = this._useArr.indexOf(instance);
            if (index != -1) {
                var delObj = this._useArr[index];
                //释放--注意该对象是复用的，不能随便释放资源。
                if (core.is.fun(delObj.dispose)) {
                    delObj.dispose();
                }
                this._useArr.splice(index, 1);
            }
            if (this._leftArr.indexOf(instance) == -1) {
                this._leftArr.push(instance);
            }
        };
        /**
         * 拉取对象,如果对象池中不存在任何可供使用的对象,则会创建出新的对象
         * 如果对象有init函数，则执行该函数传入参数
         * @param args 初始化对象的参数列表
         * @returns {any}
         */
        ObjectPool.prototype.pop = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (this._leftArr.length == 0) {
                var inst = new this._type();
                this._leftArr.push(inst);
            }
            var instance = this._leftArr.shift();
            //初始化数据
            if (core.is.fun(instance.init)) {
                instance.init.apply(instance, args);
            }
            this._useArr.push(instance);
            return instance;
        };
        return ObjectPool;
    }());
    __reflect(ObjectPool.prototype, "ObjectPool");
    var pool = (function () {
        function pool() {
        }
        /**
         * 获取指定类型的对象池
         * @param clz 指定的类型
         * @returns {ObjectPool<T>} 类型对象池
         */
        pool.getPool = function (clz) {
            var name = clz.name;
            var symbol = Symbol.for(name);
            if (!this._poolMap.has(symbol)) {
                this._poolMap.set(symbol, new ObjectPool(clz));
            }
            return this._poolMap.get(symbol);
        };
        /**
         * 获取指定分组的类型对象池
         * @param clz 指定类型
         * @param type 类别
         * @returns {any} 类型对象池
         */
        pool.getTypePool = function (clz, type) {
            var name = type + clz.name;
            var symbol = Symbol.for(name);
            if (!this._poolMap.has(symbol)) {
                this._poolMap.set(symbol, new ObjectPool(clz));
            }
            return this._poolMap.get(symbol);
        };
        pool._poolMap = new Map();
        return pool;
    }());
    __reflect(pool.prototype, "pool");
})(core || (core = {}));
var core;
(function (core) {
    /**
     * 返回指定分类的类型单例
     * @param clz 单例化的类型
     * @returns {any} 单例对象
     */
    function singleton(clz) {
        var name = clz.name;
        //使用ecma6特性的symbol类型,Symbol.for(key),获取symbol类型，不存在则新建
        var symbol = Symbol.for(name);
        if (!this._singletonMap.hasOwnProperty(symbol)) {
            this._singletonMap[symbol] = new clz();
        }
        return this._singletonMap[symbol];
    }
    core.singleton = singleton;
    /**
     * 返回指定分类的类型单例
     * @param clz 单例化的类型
     * @param type 分类名称
     * @returns {any} 单例对象
     */
    function typeSingleton(clz, type) {
        var name = type + clz.name;
        var symbol = Symbol.for(name);
        if (!this._singletonMap.hasOwnProperty(symbol)) {
            this._singletonMap[symbol] = new type();
        }
        return this._singletonMap[symbol];
    }
    core.typeSingleton = typeSingleton;
})(core || (core = {}));
var core;
(function (core) {
    /* 返回指定类型的类型编号
    * @param type 指定类型
    * @returns {any} 类型编号
    */
    function getTypeId(type) {
        //增加静态变量__obj_type_id__
        if (!type.hasOwnProperty(this._type_key_name)) {
            type[this._type_key_name] = this._type_id_++;
        }
        return type[this._type_key_name];
    }
    core.getTypeId = getTypeId;
    /**
     * 指定类型是否存在类型编号
     * @param type 指定类型
     * @returns {boolean} 是否存在类型编号
     */
    function hasTypeId(type) {
        return type && type.hasOwnProperty(this._type_key_name);
    }
    core.hasTypeId = hasTypeId;
})(core || (core = {}));
