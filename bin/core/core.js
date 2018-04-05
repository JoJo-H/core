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
    var ComponentState = (function () {
        function ComponentState(component) {
            this._args = [];
            this._listeners = [];
            this._isFull = false;
            this._component = component;
            component.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            component.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemovedFromStage, this);
        }
        ComponentState.prototype.getArgs = function () {
            return this._args;
        };
        ComponentState.prototype.setArgs = function (args) {
            this._args = args;
        };
        Object.defineProperty(ComponentState.prototype, "isFull", {
            get: function () {
                return this._isFull;
            },
            enumerable: true,
            configurable: true
        });
        ComponentState.prototype.setFull = function () {
            this._isFull = true;
        };
        ComponentState.prototype.isType = function (type) {
            return this._type == type;
        };
        ComponentState.prototype.setType = function (type) {
            this._type = type;
        };
        ComponentState.prototype.listener = function (component, type, func) {
            if (!component || !func) {
                return;
            }
            if (component.hasEventListener(type)) {
                return;
            }
            this._listeners.push({ component: component, func: func, type: type });
            component.addEventListener(type, func, this._component);
        };
        ComponentState.prototype.clearLiteners = function () {
            while (this._listeners.length > 0) {
                var listItem = this._listeners.shift();
                listItem.component.removeEventListener(listItem.type, listItem.func, this);
            }
        };
        ComponentState.prototype.onAddToStage = function (e) {
            this._component.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            (_a = this._component).onEnter.apply(_a, this._args);
            var _a;
        };
        ComponentState.prototype.onRemovedFromStage = function () {
            this._component.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemovedFromStage, this);
            this.clearLiteners();
            this._component.onExit();
        };
        return ComponentState;
    }());
    core.ComponentState = ComponentState;
    __reflect(ComponentState.prototype, "core.ComponentState");
})(core || (core = {}));
var core;
(function (core) {
    var App = (function () {
        function App() {
        }
        App.setStage = function (s) {
            this._stage = s;
        };
        Object.defineProperty(App, "stage", {
            get: function () {
                return this._stage;
            },
            enumerable: true,
            configurable: true
        });
        return App;
    }());
    core.App = App;
    __reflect(App.prototype, "core.App");
})(core || (core = {}));
var core;
(function (core) {
    var DBFaseMovie = (function (_super) {
        __extends(DBFaseMovie, _super);
        function DBFaseMovie() {
            var _this = _super.call(this) || this;
            _this.isCache = false;
            _this._atLast = false;
            _this._playName = "";
            _this._frameRate = null;
            return _this;
        }
        DBFaseMovie.prototype.setPath = function (path) {
            //  assets/animation/fast/xxx_ske.dbmv
            this._dataPath = path;
            this._texturePath = path.replace("_ske.dbmv", "_tex.png");
            this._fileName = core.BaseFactory.getFilenameWithoutExt(path).replace("_ske", "");
        };
        DBFaseMovie.prototype.prepareResource = function () {
            var ske = RES.getRes(this._dataPath);
            //preload预加载png图集
            var tex = RES.getRes(this._texturePath);
            if (ske && tex) {
                return new Promise(function (resolve, reject) {
                    resolve();
                });
            }
            else {
                RES.createGroup(this._fileName, [this._dataPath]);
                return RES.loadGroup(this._fileName);
            }
        };
        DBFaseMovie.prototype.play = function (name, playTimes) {
            var _this = this;
            if (playTimes === void 0) { playTimes = 0; }
            playTimes = playTimes == 0 ? -1 : playTimes;
            this.prepareResource().then(function () {
                _this._playName = name;
                _this.getMC().play(name, playTimes);
            });
        };
        DBFaseMovie.prototype.gotoAndStop = function (name, frame) {
            var _this = this;
            this.prepareResource().then(function () {
                _this.getMC().gotoAndStop(name, frame / 24);
            });
        };
        DBFaseMovie.prototype.gotoAndPlay = function (name, frame, playTimes) {
            var _this = this;
            if (playTimes === void 0) { playTimes = 0; }
            playTimes = playTimes == 0 ? -1 : playTimes == -1 ? 0 : playTimes;
            this.prepareResource().then(function () {
                _this.getMC().gotoAndPlay(name, frame / 24, playTimes);
            });
        };
        DBFaseMovie.prototype.getMC = function () {
            if (this._mc == null) {
                this._mc = dragonBones.buildMovie(this._fileName);
                this.addChild(this._mc);
                this.initEvents();
            }
            if (this._mc && this._frameRate != null) {
                this._mc.clipTimeScale = this._frameRate / 24;
            }
            return this._mc;
        };
        Object.defineProperty(DBFaseMovie.prototype, "frameRate", {
            get: function () {
                return this._frameRate;
            },
            set: function (val) {
                this._frameRate = val;
                if (this._mc) {
                    this._mc.clipTimeScale = this._frameRate / 24;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DBFaseMovie.prototype, "atLast", {
            get: function () {
                return this._atLast;
            },
            set: function (val) {
                this._atLast = val;
            },
            enumerable: true,
            configurable: true
        });
        DBFaseMovie.prototype.clearEvents = function () {
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
            if (this._mc) {
                this._mc.removeEventListener(dragonBones.MovieEvent.LOOP_COMPLETE, this.onLoopComplete, this);
                this._mc.removeEventListener(dragonBones.MovieEvent.COMPLETE, this.onComplete, this);
                this._mc.removeEventListener(dragonBones.MovieEvent.FRAME_EVENT, this.onFrameLabel, this);
            }
        };
        DBFaseMovie.prototype.initEvents = function () {
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
            if (this._mc) {
                this._mc.addEventListener(dragonBones.MovieEvent.LOOP_COMPLETE, this.onLoopComplete, this);
                this._mc.addEventListener(dragonBones.MovieEvent.COMPLETE, this.onComplete, this);
                this._mc.addEventListener(dragonBones.MovieEvent.FRAME_EVENT, this.onFrameLabel, this);
            }
        };
        DBFaseMovie.prototype.onLoopComplete = function (e) {
            this.dispatchEvent(new core.MovieEvent(core.MovieEvent.LOOP_COMPLETE));
        };
        DBFaseMovie.prototype.onComplete = function (e) {
            this.dispatchEvent(new core.MovieEvent(core.MovieEvent.COMPLETE));
            if (!this.atLast) {
                core.display.removeFromParent(this._mc);
            }
        };
        DBFaseMovie.prototype.onFrameLabel = function (e) {
            this.dispatchEvent(new core.MovieEvent(core.MovieEvent.FRAME_LABEL, e.name));
        };
        DBFaseMovie.prototype.onRemoved = function (e) {
            this.dispose();
        };
        DBFaseMovie.prototype.dispose = function () {
            if (this.isCache) {
                if (this._mc) {
                    this._mc.stop();
                }
            }
            else {
                if (this._mc) {
                    this._mc.dispose();
                    this.clearEvents();
                    core.display.removeFromParent(this._mc);
                    this._mc = null;
                }
            }
        };
        return DBFaseMovie;
    }(egret.DisplayObjectContainer));
    core.DBFaseMovie = DBFaseMovie;
    __reflect(DBFaseMovie.prototype, "core.DBFaseMovie", ["core.IMovie"]);
})(core || (core = {}));
var core;
(function (core) {
    var DragonMovie = (function (_super) {
        __extends(DragonMovie, _super);
        function DragonMovie() {
            var _this = _super.call(this) || this;
            _this.isCache = false;
            _this._intialized = false;
            _this._replaceDisplayArr = [];
            _this._initEvent = false;
            _this._frameRate = null;
            return _this;
        }
        DragonMovie.prototype.setPath = function (path, armature) {
            // dir: assets/animation/dragonBones/xxx
            this._skeletonJson = path + "_anim.json";
            this._textureImage = path + "_texture.png";
            this._textureJson = path + "_texture.json";
            this._dragonBonesName = core.BaseFactory.getFilenameWithoutExt(path);
            this._fileName = this._dragonBonesName + "_dragonGroup";
            this._armatureName = armature ? armature : this._dragonBonesName;
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
        };
        Object.defineProperty(DragonMovie.prototype, "armature", {
            get: function () {
                return this._armatureName;
            },
            set: function (val) {
                this._armatureName = val;
            },
            enumerable: true,
            configurable: true
        });
        DragonMovie.prototype.play = function (name, playTimes) {
            var _this = this;
            this.prepareResource().then(function () {
                _this.getArmture().animation.play(name, playTimes);
            });
        };
        DragonMovie.prototype.getArmture = function () {
            if (!this._armature) {
                dragonBones.WorldClock.clock.remove(this._armature);
                var aniData = RES.getRes(this._skeletonJson);
                var texData = RES.getRes(this._textureJson);
                var texImg = RES.getRes(this._textureImage);
                //把动画数据添加到工厂里
                //BaseFactory.getEgretFactory().getAllDragonBonesData();
                if (!core.BaseFactory.getEgretFactory().getDragonBonesData(this._dragonBonesName)) {
                    core.BaseFactory.getEgretFactory().parseDragonBonesData(aniData, this._dragonBonesName);
                }
                //把纹理集数据和图片添加到工厂里
                if (!core.BaseFactory.getEgretFactory().getTextureAtlasData(this._dragonBonesName)) {
                    core.BaseFactory.getEgretFactory().parseTextureAtlasData(texData, texImg, this._dragonBonesName);
                }
                //从工厂里创建出Armature
                this._armature = core.BaseFactory.getEgretFactory().buildArmature(this._armatureName);
                this._armature.display.x = this._armature.display.y = 0;
                this.addChild(this._armature.display);
                //插槽替换资源
                if (this._replaceDisplayArr.length) {
                    var info = this._replaceDisplayArr.shift();
                    this.replaceDisplay(info.name, info.display);
                }
                dragonBones.WorldClock.clock.add(this._armature);
                if (this._frameRate) {
                    this.frameRate = this._frameRate;
                }
                this.initEvent();
            }
            return this._armature;
        };
        DragonMovie.prototype.gotoAndStop = function (name, frame) {
        };
        DragonMovie.prototype.gotoAndPlay = function (name, frame, playTimes) {
        };
        DragonMovie.prototype.prepareResource = function () {
            var aniData = RES.getRes(this._armatureName);
            var texData = RES.getRes(this._textureJson);
            var texImg = RES.getRes(this._textureImage);
            if (aniData && texData && texImg) {
                return new Promise(function (resolve, reject) {
                    resolve();
                });
            }
            else {
                RES.createGroup(this._fileName, [this._skeletonJson, this._textureJson, this._textureImage]);
                return RES.loadGroup(this._fileName);
            }
        };
        DragonMovie.prototype.onFrame = function (e) {
            var ev = new core.MovieEvent(core.MovieEvent.FRAME_LABEL, e.frameLabel);
            this.dispatchEvent(ev);
        };
        DragonMovie.prototype.onComplete = function (e) {
            this.dispatchEvent(new core.MovieEvent(core.MovieEvent.COMPLETE));
        };
        DragonMovie.prototype.start = function (e) {
            console.log("开始播放动画：", this._fileName + ".", this._armatureName);
        };
        DragonMovie.prototype.frameEvent = function (evt) {
            //自定义事件的值 == evt.frameLabel
            console.log("armature 播放到了一个关键帧！ 帧标签为：", evt.frameLabel);
        };
        DragonMovie.prototype.onAddToStage = function () {
            this.initEvent();
        };
        DragonMovie.prototype.initEvent = function () {
            if (this._armature && !this._initEvent) {
                this._initEvent = true;
                dragonBones.WorldClock.clock.add(this._armature);
                this._armature.addEventListener(dragonBones.EgretEvent.START, this.start, this);
                this._armature.addEventListener(dragonBones.EgretEvent.FRAME_EVENT, this.onFrame, this);
                this._armature.addEventListener(dragonBones.EgretEvent.COMPLETE, this.onComplete, this);
                this._armature.addEventListener(dragonBones.EgretEvent.LOOP_COMPLETE, this.onComplete, this);
            }
        };
        DragonMovie.prototype.onRemoveFromStage = function () {
            dragonBones.WorldClock.clock.remove(this._armature);
            if (this._armature) {
                this._initEvent = false;
                this._armature.animation.stop();
                this._armature.removeEventListener(dragonBones.EgretEvent.START, this.start, this);
                this._armature.removeEventListener(dragonBones.EgretEvent.FRAME_EVENT, this.onFrame, this);
                this._armature.removeEventListener(dragonBones.EgretEvent.COMPLETE, this.onComplete, this);
                this._armature.removeEventListener(dragonBones.EgretEvent.LOOP_COMPLETE, this.onComplete, this);
            }
        };
        Object.defineProperty(DragonMovie.prototype, "frameRate", {
            get: function () {
                return this._frameRate;
            },
            set: function (val) {
                this._frameRate = val;
                if (this._armature) {
                    this._armature.clock.timeScale = this._frameRate / 24;
                }
            },
            enumerable: true,
            configurable: true
        });
        DragonMovie.prototype.dispose = function () {
        };
        DragonMovie.prototype.replaceDisplay = function (slotName, display) {
            if (this._armature) {
                var slot = this._armature.getSlot(slotName);
                slot.displayIndex = 0;
                slot.display = display;
            }
        };
        DragonMovie.prototype.addReplaceDisplayInfo = function (info) {
            this._replaceDisplayArr.push(info);
        };
        DragonMovie.prototype.replaceGlobal = function (textureName) {
            //全局换装可实现将一个骨骼动画的骨架中全部贴图替换，如果使用全局换装功能，则新骨骼动画纹理集与源骨骼动画纹理集必须尺寸以及内部元素尺寸相同。
            if (this._armature && RES.getRes(textureName)) {
                this._armature.replacedTexture(RES.getRes(textureName));
            }
        };
        DragonMovie.prototype.getSlot = function (slotName) {
            if (this._armature) {
                return this._armature.getSlot(slotName);
            }
            return null;
        };
        return DragonMovie;
    }(egret.DisplayObjectContainer));
    core.DragonMovie = DragonMovie;
    __reflect(DragonMovie.prototype, "core.DragonMovie", ["core.IMovie"]);
})(core || (core = {}));
var core;
(function (core) {
    var MovieClip = (function (_super) {
        __extends(MovieClip, _super);
        function MovieClip() {
            var _this = _super.call(this) || this;
            _this._atLast = false;
            _this.isCache = false;
            _this._frameRate = null;
            _this._hasEvent = false;
            return _this;
        }
        Object.defineProperty(MovieClip.prototype, "atLast", {
            get: function () {
                return this._atLast;
            },
            set: function (val) {
                this._atLast = val;
            },
            enumerable: true,
            configurable: true
        });
        MovieClip.prototype.setPath = function (path) {
            this._dataPath = path;
            this._texturePath = path.replace('.json', '.png');
            this._filename = core.BaseFactory.getFilenameWithoutExt(this._dataPath);
        };
        MovieClip.prototype.prepareResource = function () {
            var factory = RES.getRes(this._dataPath);
            if (factory) {
                return new Promise(function (ok) {
                    ok();
                });
            }
            else {
                RES.createGroup(this._filename, [this._dataPath]);
                return RES.loadGroup(this._filename);
            }
        };
        MovieClip.prototype.play = function (name, playTimes) {
            var _this = this;
            if (playTimes === void 0) { playTimes = 0; }
            this.prepareResource().then(function () {
                _this.getMC(name).play(playTimes);
            });
        };
        MovieClip.prototype.gotoAndStop = function (name, frame) {
            var _this = this;
            this.prepareResource().then(function () {
                _this.getMC(name).gotoAndStop(frame);
            });
        };
        MovieClip.prototype.gotoAndPlay = function (name, frame, playTimes) {
            var _this = this;
            if (playTimes === void 0) { playTimes = 0; }
            this.prepareResource().then(function () {
                _this.getMC(name).gotoAndPlay(frame, playTimes);
            });
        };
        MovieClip.prototype.getMC = function (name) {
            if (this._mc) {
                if (!this._hasEvent) {
                    this.initEvents();
                }
                return this._mc;
            }
            var factory = RES.getRes(this._dataPath);
            if (factory) {
                this._mc = new egret.MovieClip(factory.generateMovieClipData(name));
                this.initEvents();
                this.addChild(this._mc);
            }
            return this._mc;
        };
        Object.defineProperty(MovieClip.prototype, "frameRate", {
            get: function () {
                return this._frameRate;
            },
            set: function (val) {
                this._frameRate = val;
                if (this._mc) {
                    this._mc.frameRate = val;
                }
            },
            enumerable: true,
            configurable: true
        });
        MovieClip.prototype.clearEvents = function () {
            this._hasEvent = false;
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
            if (this._mc) {
                this._mc.removeEventListener(egret.MovieClipEvent.LOOP_COMPLETE, this.onLoopComplete, this);
                this._mc.removeEventListener(egret.MovieClipEvent.COMPLETE, this.onComplete, this);
                this._mc.removeEventListener(egret.MovieClipEvent.FRAME_LABEL, this.onFrameLabel, this);
            }
        };
        MovieClip.prototype.initEvents = function () {
            this._hasEvent = true;
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
            if (this._mc) {
                this._mc.addEventListener(egret.MovieClipEvent.LOOP_COMPLETE, this.onLoopComplete, this);
                this._mc.addEventListener(egret.MovieClipEvent.COMPLETE, this.onComplete, this);
                this._mc.addEventListener(egret.MovieClipEvent.FRAME_LABEL, this.onFrameLabel, this);
            }
        };
        MovieClip.prototype.onLoopComplete = function (e) {
            this.dispatchEvent(new core.MovieEvent(core.MovieEvent.LOOP_COMPLETE));
        };
        MovieClip.prototype.onComplete = function (e) {
            this.dispatchEvent(new core.MovieEvent(core.MovieEvent.COMPLETE));
            if (!this.atLast) {
                core.display.removeFromParent(this);
            }
        };
        MovieClip.prototype.onFrameLabel = function (e) {
            this.dispatchEvent(new core.MovieEvent(core.MovieEvent.FRAME_LABEL, e.frameLabel));
        };
        MovieClip.prototype.onRemoved = function (e) {
            this.dispose();
        };
        MovieClip.prototype.dispose = function () {
            this.clearEvents();
        };
        return MovieClip;
    }(egret.DisplayObjectContainer));
    core.MovieClip = MovieClip;
    __reflect(MovieClip.prototype, "core.MovieClip", ["core.IMovie"]);
})(core || (core = {}));
var core;
(function (core) {
    var MovieClock = (function () {
        function MovieClock() {
            this._lastTime = 0;
        }
        MovieClock.prototype.start = function () {
            this._lastTime = egret.getTimer();
            egret.startTick(this.tick, this);
        };
        MovieClock.prototype.tick = function (time) {
            var gap = time - this._lastTime;
            this._lastTime = time;
            dragonBones.WorldClock.clock.advanceTime(gap / 1000);
            return false;
        };
        MovieClock.prototype.stop = function () {
            egret.stopTick(this.tick, this);
        };
        return MovieClock;
    }());
    core.MovieClock = MovieClock;
    __reflect(MovieClock.prototype, "core.MovieClock");
})(core || (core = {}));
var core;
(function (core) {
    var MovieEvent = (function (_super) {
        __extends(MovieEvent, _super);
        function MovieEvent(name, label) {
            if (label === void 0) { label = null; }
            var _this = _super.call(this, name) || this;
            _this._frameLabel = label;
            return _this;
        }
        Object.defineProperty(MovieEvent.prototype, "frameLabel", {
            get: function () {
                return this._frameLabel;
            },
            enumerable: true,
            configurable: true
        });
        MovieEvent.FRAME_LABEL = "Frame_Label";
        MovieEvent.LOOP_COMPLETE = "Loop_Complete";
        MovieEvent.COMPLETE = "Complete";
        return MovieEvent;
    }(egret.Event));
    core.MovieEvent = MovieEvent;
    __reflect(MovieEvent.prototype, "core.MovieEvent");
})(core || (core = {}));
var core;
(function (core) {
    var ProxyCache = (function () {
        function ProxyCache() {
            this._cacheData = null;
            this._instance = null;
            if (this.instance) {
                throw Error("ProxyCache singleton already constructed!");
            }
            this._instance = this;
            this._cacheData = {};
        }
        Object.defineProperty(ProxyCache.prototype, "instance", {
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
        return ProxyCache;
    }());
    __reflect(ProxyCache.prototype, "ProxyCache");
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
    var Attribute = (function (_super) {
        __extends(Attribute, _super);
        function Attribute() {
            var _this = _super.call(this) || this;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.add, _this);
            return _this;
        }
        Object.defineProperty(Attribute.prototype, "name", {
            get: function () {
                return this._name;
            },
            set: function (value) {
                this._name = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Attribute.prototype, "type", {
            get: function () {
                return this._type;
            },
            set: function (value) {
                this._type = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Attribute.prototype, "value", {
            get: function () {
                if (this._value == 'true' || this._value == 'false') {
                    return this._value == 'true';
                }
                return this._value;
            },
            set: function (value) {
                this._value = value;
                this.onUpdate();
            },
            enumerable: true,
            configurable: true
        });
        Attribute.prototype.onUpdate = function () {
            if (this.parent && this.parent.updateAttribute) {
                var host = this.parent;
                host.updateAttribute(this);
            }
        };
        Attribute.prototype.add = function () {
            this.onUpdate();
        };
        return Attribute;
    }(eui.Component));
    core.Attribute = Attribute;
    __reflect(Attribute.prototype, "core.Attribute");
})(core || (core = {}));
var core;
(function (core) {
    var BaseComponent = (function (_super) {
        __extends(BaseComponent, _super);
        function BaseComponent() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.call(this) || this;
            _this._dataMapArr = [];
            _this._args = [];
            _this.$_state = new core.ComponentState(_this);
            _this.setArgs(args);
            return _this;
        }
        BaseComponent.prototype.listener = function (component, type, sender) {
            this.$_state.listener(component, type, sender);
        };
        BaseComponent.prototype.clearListeners = function () {
            this.$_state.clearLiteners();
        };
        Object.defineProperty(BaseComponent.prototype, "hook", {
            get: function () {
                if (!this._hook) {
                    this._hook = new core.ComponentHook(this);
                }
                return this._hook;
            },
            set: function (value) {
                this._hook = value;
            },
            enumerable: true,
            configurable: true
        });
        BaseComponent.prototype.addOperate = function (operate) {
            this.hook.addOperate(operate);
            return this;
        };
        BaseComponent.prototype.removeOperate = function (operate) {
            this.hook.removeOperate(operate);
        };
        BaseComponent.prototype.clearOperate = function () {
            this.hook.clearOperate();
        };
        BaseComponent.prototype.removeOperateByName = function (name) {
            this.hook.removeOperateByName(name);
        };
        BaseComponent.prototype.getOperateByName = function (name) {
            return this.hook.getOperateByName(name);
        };
        BaseComponent.prototype.getArgs = function () {
            return this.$_state.getArgs();
        };
        BaseComponent.prototype.setArgs = function (args) {
            this.$_state.setArgs(args);
        };
        BaseComponent.prototype.updateAttribute = function (attribute) {
            this[attribute.name] = attribute.value;
        };
        Object.defineProperty(BaseComponent.prototype, "data", {
            get: function () {
                return this._data;
            },
            set: function (value) {
                this._data = value;
                if (value != null) {
                    this.addDataMap('data');
                    eui.PropertyEvent.dispatchPropertyEvent(this, eui.PropertyEvent.PROPERTY_CHANGE, "data");
                }
                this.dataChanged();
            },
            enumerable: true,
            configurable: true
        });
        BaseComponent.prototype.addDataMap = function (name) {
            if (this._dataMapArr.indexOf(name) == -1) {
                this._dataMapArr.push(name);
            }
        };
        Object.defineProperty(BaseComponent.prototype, "isFull", {
            get: function () {
                return this.$_state.isFull;
            },
            enumerable: true,
            configurable: true
        });
        BaseComponent.prototype.setFull = function () {
            this.$_state.setFull();
            return this;
        };
        BaseComponent.prototype.setData = function (data, type) {
            if (type === void 0) { type = 'data'; }
            if (type == 'data') {
                this.data = data;
            }
            else {
                this[type] = data;
                if (data != null) {
                    this.addDataMap(type);
                    eui.PropertyEvent.dispatchPropertyEvent(this, eui.PropertyEvent.PROPERTY_CHANGE, type);
                }
            }
            if (this._hook && data != null) {
                this._hook.setData(data, type);
            }
            return this;
        };
        BaseComponent.prototype.dataChanged = function () {
        };
        BaseComponent.prototype.setState = function (name) {
            this.currentState = name;
            return this;
        };
        BaseComponent.prototype.setCompName = function (name) {
            this.componentName = name;
            return this;
        };
        Object.defineProperty(BaseComponent.prototype, "componentName", {
            get: function () {
                return this._componentName;
            },
            set: function (value) {
                this._componentName = value;
            },
            enumerable: true,
            configurable: true
        });
        BaseComponent.prototype.isType = function (type) {
            return this.$_state.isType(type);
        };
        BaseComponent.prototype.setType = function (type) {
            this.$_state.setType(type);
        };
        BaseComponent.prototype.onAddToStage = function (e) {
            this.onEnter();
        };
        BaseComponent.prototype.onRemoveFromStage = function (e) {
            this.onExit();
        };
        BaseComponent.prototype.onEnter = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            (_a = this.hook).onEnter.apply(_a, args);
            var _a;
        };
        BaseComponent.prototype.onExit = function () {
            this.hook.onExit();
            this.destoryData();
        };
        BaseComponent.prototype.destoryData = function () {
            while (this._dataMapArr.length) {
                this[this._dataMapArr.shift()] = null;
            }
            this._args = [];
            this._data = null;
            this.componentName = "";
        };
        return BaseComponent;
    }(eui.Component));
    core.BaseComponent = BaseComponent;
    __reflect(BaseComponent.prototype, "core.BaseComponent", ["core.IComponent"]);
})(core || (core = {}));
var core;
(function (core) {
    var ComponentHook = (function () {
        function ComponentHook(component) {
            this._operates = [];
            this._component = component;
        }
        ComponentHook.prototype.setData = function (data, type) {
        };
        ComponentHook.prototype.onEnter = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            for (var i = 0; i < this._operates.length; i++) {
                this._operates[i].enter(this._component);
            }
        };
        ComponentHook.prototype.onExit = function () {
            for (var i = 0; i < this._operates.length; i++) {
                this._operates[i].exit(this._component);
            }
        };
        ComponentHook.prototype.addOperate = function (operate) {
            this._operates.push(operate);
        };
        ComponentHook.prototype.removeOperate = function (operate) {
            var idx = this._operates.indexOf(operate);
            if (idx > -1) {
                operate.exit(this._component);
                this._operates.splice(idx, 1);
            }
        };
        ComponentHook.prototype.clearOperate = function () {
            while (this._operates.length > 0) {
                this.removeOperate(this._operates[0]);
            }
        };
        ComponentHook.prototype.removeOperateByName = function (name) {
            for (var i = this._operates.length - 1; i >= 0; i--) {
                if (this._operates[i].getName() == name) {
                    this.removeOperate(this._operates[i]);
                }
            }
        };
        ComponentHook.prototype.getOperateByName = function (name) {
            var r = [];
            for (var i = 0; i < this._operates.length; i++) {
                if (this._operates[i].getName() == name) {
                    r.push(this._operates[i]);
                }
            }
            return r;
        };
        ComponentHook.prototype.getOperateByType = function (type) {
            var r = [];
            for (var i = 0; i < this._operates.length; i++) {
                if (this._operates[i].type == type) {
                    r.push(this._operates[i]);
                }
            }
            return r;
        };
        return ComponentHook;
    }());
    core.ComponentHook = ComponentHook;
    __reflect(ComponentHook.prototype, "core.ComponentHook", ["core.IComponentHook"]);
})(core || (core = {}));
var core;
(function (core) {
    var MovieType;
    (function (MovieType) {
        MovieType[MovieType["DRAGON"] = 0] = "DRAGON";
        MovieType[MovieType["DBFAST"] = 1] = "DBFAST";
        MovieType[MovieType["MOVIECLIP"] = 2] = "MOVIECLIP";
        MovieType[MovieType["SEQUNCE_MOVIE"] = 3] = "SEQUNCE_MOVIE";
    })(MovieType = core.MovieType || (core.MovieType = {}));
    var BaseFactory = (function () {
        function BaseFactory() {
        }
        BaseFactory.getEgretFactory = function () {
            if (!this._egretFactory) {
                this._egretFactory = new dragonBones.EgretFactory();
                this.initClock();
            }
            return this._egretFactory;
        };
        BaseFactory.initClock = function () {
            if (!this._movieClock) {
                this._movieClock = new core.MovieClock();
                this._movieClock.start();
            }
        };
        BaseFactory.create = function (path, type, armature) {
            //相对路径名称 assets/animation/fast/xxx_ske.dbmv 或 assets/animation/dragonBones/xxx_anim.json
            var arr = path.split("/");
            //动画文件名称
            var fileName = arr[arr.length - 1];
            var movie;
            switch (type) {
                case MovieType.DRAGON:
                    //龙骨动画
                    movie = new core.DragonMovie();
                    movie.isCache = false;
                    movie.setPath(path, armature);
                    break;
                case MovieType.DBFAST:
                    movie = new core.DBFaseMovie();
                    movie.isCache = false;
                    movie.setPath(path);
                    break;
                case MovieType.MOVIECLIP:
                    movie = new core.MovieClip();
                    movie.isCache = false;
                    movie.setPath(path);
                    break;
                case MovieType.SEQUNCE_MOVIE:
                    break;
                default:
                    throw new Error("创建动画错误,动画类型:" + type);
            }
            return movie;
        };
        BaseFactory.fast = function (option, dbName) {
            var movie = this.create('assets/animation/fast/' + dbName, MovieType.DBFAST);
            option.actionName = option.actionName && option.actionName != "" ? option.actionName : "1";
            this.play(movie, option);
            return movie;
        };
        BaseFactory.playAnim = function (option, name, armature) {
            var movie = this.create('assets/animation/dragonBones/' + name, MovieType.DRAGON, armature);
            option.actionName = option.actionName && option.actionName != "" ? option.actionName : name;
            this.play(movie, option);
            return movie;
        };
        BaseFactory.play = function (movie, option) {
            var playTime = option.playTimes ? option.playTimes : 0;
            movie.play(option.actionName, playTime);
            movie.touchEnabled = false;
            movie.once(core.MovieEvent.COMPLETE, function () {
                if (option.onComplete) {
                    option.onComplete();
                }
            }, this);
            movie.scaleX = option.scaleX ? option.scaleX : 1;
            movie.scaleY = option.scaleY ? option.scaleY : 1;
            if (option.container) {
                option.container.addChild(movie);
                movie.x = option.container.width / 2 + (option.offsetX || 0);
                movie.y = option.container.height / 2 + (option.offsetY || 0);
            }
            else {
                core.App.stage.addChild(movie);
                movie.x = core.App.stage.width / 2 + (option.offsetX || 0);
                movie.y = core.App.stage.height / 2 + (option.offsetY || 0);
            }
        };
        BaseFactory.getFilenameWithoutExt = function (path) {
            var arr = path.split('/');
            var filename = arr[arr.length - 1];
            arr = filename.split('.');
            return arr[0];
        };
        return BaseFactory;
    }());
    core.BaseFactory = BaseFactory;
    __reflect(BaseFactory.prototype, "core.BaseFactory");
})(core || (core = {}));
var core;
(function (core) {
    var UIType;
    (function (UIType) {
        UIType[UIType["SCENE"] = 0] = "SCENE";
        UIType[UIType["COMMON"] = 1] = "COMMON";
        UIType[UIType["PANEL"] = 2] = "PANEL";
        UIType[UIType["MENU"] = 3] = "MENU";
        UIType[UIType["BOX"] = 4] = "BOX";
        UIType[UIType["GUIDE"] = 5] = "GUIDE";
        UIType[UIType["TOOLTIP"] = 6] = "TOOLTIP";
    })(UIType = core.UIType || (core.UIType = {}));
    /**
    * 游戏UI界面控制器
    * 目前支持的容器(层级从下往上):场景层、公共UI层、面板层、菜单层、弹框层、新手引导层、浮动层
    */
    var UI = (function (_super) {
        __extends(UI, _super);
        function UI() {
            var _this = _super.call(this) || this;
            _this.touchEnabled = false;
            _this._scene = new eui.UILayer();
            _this._scene.touchEnabled = false;
            _this.addChild(_this._scene);
            _this._common = new eui.UILayer();
            _this._common.touchEnabled = false;
            _this.addChild(_this._common);
            _this._panel = new eui.UILayer();
            _this.addChild(_this._panel);
            _this._panel.touchEnabled = false;
            _this._menu = new eui.UILayer();
            _this.addChild(_this._menu);
            _this._menu.touchEnabled = false;
            _this._box = new eui.UILayer();
            _this.addChild(_this._box);
            _this._box.touchEnabled = false;
            _this._guide = new eui.UILayer();
            _this.addChild(_this._guide);
            _this._guide.touchEnabled = false;
            _this._tooltip = new eui.UILayer();
            _this.addChild(_this._tooltip);
            _this._tooltip.touchEnabled = false;
            _this._containerArr = [_this._scene, _this._common, _this._panel, _this._menu, _this._box, _this._guide, _this._tooltip];
            return _this;
        }
        UI.prototype.setRoot = function (container) {
            if (container) {
                container.addChild(this);
            }
        };
        UI.prototype.setMenu = function (menuType) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (this._menuInst != null) {
                this.remove(this._menuInst);
            }
            var menuInst = this.getTypeInst(menuType, args, UIType.MENU);
            core.display.setFullDisplay(menuInst);
            this._menuInst = menuInst;
            this._menuInst.bottom = 0;
            this._menuInst.horizontalCenter = 0;
            this._menu.addChild(this._menuInst);
        };
        UI.prototype.runScene = function (sceneType) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (this._sceneInst) {
                this.remove(this._sceneInst);
            }
            var ret = this.addScene(sceneType, args);
            return ret;
        };
        UI.prototype.addScene = function (sceneType) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var sceneInst = this.getTypeInst(sceneType, args, UIType.SCENE);
            core.display.setFullDisplay(sceneInst);
            this._sceneInst = sceneInst;
            this._scene.addChild(sceneInst);
            return sceneInst;
        };
        UI.prototype.addBox = function (boxType) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var boxInst = this.getTypeInst(boxType, args, UIType.BOX);
            core.display.setFullDisplay(boxInst);
            this._box.addChild(boxInst);
            return boxInst;
        };
        UI.prototype.addPanel = function (panelType) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var panelInst = this.getTypeInst(panelType, args, UIType.PANEL);
            core.display.setFullDisplay(panelInst);
            this._panel.addChild(panelInst);
            return panelInst;
        };
        UI.prototype.addCommon = function (commonType) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var commonInst = this.getTypeInst(commonType, args, UIType.COMMON);
            core.display.setFullDisplay(commonInst);
            this._common.addChild(commonInst);
            return commonInst;
        };
        UI.prototype.addTooltip = function (tooltipType) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var tooltipInst = this.getTypeInst(tooltipType, args, UIType.TOOLTIP);
            core.display.setFullDisplay(tooltipInst);
            this._tooltip.addChild(tooltipInst);
            return tooltipInst;
        };
        UI.prototype.getTypeInst = function (type, arg, uiType) {
            var inst = null;
            var skinName;
            if (typeof (type) == "string") {
                skinName = type;
                type = core.BaseComponent;
            }
            if (type.constructor.name == "Function") {
                inst = new (type.bind.apply(type, [void 0].concat(arg)))();
            }
            else {
                inst = type;
                inst.setArgs(arg);
                if (skinName) {
                    inst.skinName = skinName;
                }
            }
            return inst;
        };
        UI.prototype.removeComponent = function (name) {
            var obj = this.getComponent(name);
            if (egret.is(obj, 'BaseComponent')) {
                if (!this.isSingleContainer(obj)) {
                    this.remove(obj);
                }
            }
        };
        UI.prototype.getComponent = function (name) {
            for (var i = 0; i < this._containerArr.length; i++) {
                var container = this._containerArr[i];
                var component = this.getComponentByName(name, container);
                if (component) {
                    return component;
                }
            }
            return null;
        };
        UI.prototype.getComponentByName = function (name, container) {
            var num = container.numChildren;
            for (var i = 0; i < num; i++) {
                var child = container.getChildAt(i);
                if (child.componentName == name) {
                    return child;
                }
            }
            return null;
        };
        UI.prototype.isSingleContainer = function (component) {
            if (component.isType(UIType.SCENE) &&
                component.isType(UIType.MENU)) {
                return true;
            }
            return false;
        };
        UI.prototype.getContainerByType = function (type) {
            switch (type) {
                case UIType.BOX: {
                    return this._box;
                }
                case UIType.SCENE: {
                    return this._scene;
                }
                case UIType.GUIDE: {
                    return this._guide;
                }
                case UIType.COMMON: {
                    return this._common;
                }
                case UIType.MENU: {
                    return this._menu;
                }
                case UIType.TOOLTIP: {
                    return this._tooltip;
                }
                case UIType.PANEL: {
                    return this._panel;
                }
            }
            return null;
        };
        UI.prototype.remove = function (component) {
            if (!component)
                return;
            // component.dispose();
            core.display.removeFromParent(component);
        };
        return UI;
    }(eui.UILayer));
    __reflect(UI.prototype, "UI");
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
            if (this.instance) {
                throw Error("MVCSystem singleton already constructed!");
            }
            this._instance = this;
            this._observerMap = {};
            this._mediatorMap = {};
            this._modelMap = {};
        }
        Object.defineProperty(MVCSystem.prototype, "instance", {
            get: function () {
                if (!this._instance) {
                    this._instance = new MVCSystem();
                }
                return this._instance;
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
    var BaseOperate = (function (_super) {
        __extends(BaseOperate, _super);
        function BaseOperate() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        BaseOperate.prototype.setName = function (name) {
            this._name = name;
            var r = this;
            return r;
        };
        BaseOperate.prototype.getName = function () {
            return this._name;
        };
        BaseOperate.prototype.enter = function (component) {
        };
        BaseOperate.prototype.exit = function (component) {
        };
        return BaseOperate;
    }(egret.HashObject));
    core.BaseOperate = BaseOperate;
    __reflect(BaseOperate.prototype, "core.BaseOperate", ["core.IComponentOperate"]);
})(core || (core = {}));
var core;
(function (core) {
    var display = (function () {
        function display() {
        }
        display.setFullDisplay = function (display) {
            display.width = core.App.stage.stageWidth;
            display.width = core.App.stage.stageWidth;
        };
        /**
         * 移除容器中的所有子显示对象
         * @param container 需要移除子显示对象的容器
         */
        display.removeAllChildren = function (container) {
            while (container.numChildren > 0) {
                container.removeChildAt(0);
            }
        };
        /**
         * 移除显示对象,可以是egret的显示对象,也可以是继承组件
         * @param child 子显示对象  child:egret.DisplayObject|BaseComponent
         */
        display.removeFromParent = function (child) {
            if (child && child.parent) {
                child.parent.removeChild(child);
            }
        };
        /**
         * 设置显示对象的相对描点
         * @param disObj 需要设置描点的显示对象
         * @param anchorX X轴相对描点
         * @param anchorY Y轴相对描点
         */
        display.setAnchor = function (disObj, anchorX, anchorY) {
            if (anchorY === void 0) { anchorY = anchorX; }
            disObj.anchorOffsetX = disObj.width * anchorX;
            disObj.anchorOffsetY = disObj.height * anchorY;
        };
        Object.defineProperty(display, "stageW", {
            get: function () {
                return core.App.stage.stageWidth;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(display, "stageH", {
            get: function () {
                return core.App.stage.stageHeight;
            },
            enumerable: true,
            configurable: true
        });
        return display;
    }());
    core.display = display;
    __reflect(display.prototype, "core.display");
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
