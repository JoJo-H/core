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
    var BaseComponent = (function (_super) {
        __extends(BaseComponent, _super);
        function BaseComponent() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.call(this) || this;
            _this._dataMapArr = [];
            _this._compState = new core.ComponentState(_this);
            _this.setArgs(args);
            return _this;
        }
        BaseComponent.prototype.listener = function (component, type, sender) {
            this._compState.listener(component, type, sender);
        };
        BaseComponent.prototype.clearListeners = function () {
            this._compState.clearLiteners();
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
            return this._compState.getArgs();
        };
        BaseComponent.prototype.setArgs = function (args) {
            this._compState.setArgs(args);
        };
        Object.defineProperty(BaseComponent.prototype, "animation", {
            get: function () {
                return this._animation;
            },
            enumerable: true,
            configurable: true
        });
        BaseComponent.prototype.setAnimation = function (animation) {
            this._animation = animation;
            return this;
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
                return this._compState.isFull;
            },
            enumerable: true,
            configurable: true
        });
        BaseComponent.prototype.setFull = function () {
            this._compState.setFull();
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
        BaseComponent.prototype.getCompType = function () {
            return this._compState.getCompType();
        };
        BaseComponent.prototype.setCompType = function (type) {
            this._compState.setCompType(type);
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
            core.setAttribute(this);
            (_a = this.hook).onEnter.apply(_a, args);
            var _a;
        };
        BaseComponent.prototype.onExit = function () {
            this.clearListeners();
            this.hook.onExit();
            this.destoryData();
        };
        BaseComponent.prototype.destoryData = function () {
            this.componentName = "";
            while (this._dataMapArr.length) {
                this[this._dataMapArr.shift()] = null;
            }
            core.destoryChildren(this);
        };
        BaseComponent.prototype.getView = function (name) {
            if (this[name]) {
                return this[name];
            }
            return core.getChildByName(name, this);
        };
        return BaseComponent;
    }(eui.Component));
    core.BaseComponent = BaseComponent;
    __reflect(BaseComponent.prototype, "core.BaseComponent", ["core.IComponent"]);
})(core || (core = {}));
var core;
(function (core) {
    var ToggleButton = (function (_super) {
        __extends(ToggleButton, _super);
        function ToggleButton() {
            return _super.call(this) || this;
        }
        Object.defineProperty(ToggleButton.prototype, "data", {
            get: function () {
                return this._data;
            },
            set: function (value) {
                this._data = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ToggleButton.prototype, "notice", {
            get: function () {
                return this._notice;
            },
            set: function (value) {
                this._notice = value;
            },
            enumerable: true,
            configurable: true
        });
        ToggleButton.prototype.getButton = function (name) {
            if (this.name == name) {
                return this;
            }
        };
        ToggleButton.prototype.getCurrentState = function () {
            var state = this.skin.currentState;
            if (this.selected) {
                if (this.skin.hasState(state + 'AndSelected')) {
                    return state + 'AndSelected';
                }
            }
            else {
                if (state.indexOf('AndSelected') > -1) {
                    return state.replace('AndSelected', '');
                }
            }
            return _super.prototype.getCurrentState.call(this);
        };
        ToggleButton.prototype.buttonReleased = function () {
            if (core.is.truthy(this._notice)) {
                var data = this.data;
                if (!data) {
                    var host = core.getHostComponent(this);
                    if (host) {
                        data = host.data;
                    }
                }
                core.sendNotification(this._notice, { date: data, host: host, button: this });
            }
            else {
                _super.prototype.buttonReleased.call(this);
                if (this.name) {
                    core.sendNotification(core.k.CLICK_BUTTON, this.name, this);
                }
            }
        };
        return ToggleButton;
    }(eui.ToggleButton));
    core.ToggleButton = ToggleButton;
    __reflect(ToggleButton.prototype, "core.ToggleButton");
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
        NotificationKey.CLICK_BUTTON = "guide_click_button";
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
    function setAttribute(component) {
        var num = component.numChildren;
        for (var i = num - 1; i >= 0; i--) {
            var child = component.getChildAt(i);
            if (child instanceof Attribute) {
                var attr = child;
                component[attr.name] = attr.value;
            }
        }
    }
    core.setAttribute = setAttribute;
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
        App.tooltipLayout = '';
        return App;
    }());
    core.App = App;
    __reflect(App.prototype, "core.App");
    /**
     * 获取指定类的类型
     * @param name 类型名称
     * @param defaultType 默认类型
     * @returns {any}
     */
    function getDefinitionType(name, defaultType) {
        if (core.is.truthy(name)) {
            var t = egret.getDefinitionByName(name);
            if (core.is.truthy(t)) {
                return t;
            }
        }
        return defaultType;
    }
    core.getDefinitionType = getDefinitionType;
    /**
     * 获取指定类的实例
     * @param args 类型构造函数参数列表
     * @param name 类型名称
     * @param defaultType 默认类型
     * @param args 类型构造函数参数列表
     * @returns {null}
     */
    function getDefinitionInstance(name, defaultType) {
        if (defaultType === void 0) { defaultType = null; }
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var define = core.getDefinitionType(name, defaultType);
        if (core.is.truthy(define)) {
            return new (define.bind.apply(define, [void 0].concat(args)))();
        }
        return null;
    }
    core.getDefinitionInstance = getDefinitionInstance;
    function propertyChange(obj) {
        var arg = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            arg[_i - 1] = arguments[_i];
        }
        for (var i = 0; i < arg.length; i++) {
            eui.PropertyEvent.dispatchPropertyEvent(obj, eui.PropertyEvent.PROPERTY_CHANGE, arg[i]);
        }
    }
    core.propertyChange = propertyChange;
    function getHostComponent(display) {
        var host = display.parent;
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
    core.getHostComponent = getHostComponent;
    function destoryChildren(container) {
        var children = container.numChildren;
        for (var i = 0; i < children; i++) {
            var item = container.getChildAt(i);
            if (item instanceof core.BaseComponent) {
                item.destoryData();
            }
            else if (item instanceof core.Button) {
                item.destoryData();
            }
            else if (item instanceof eui.Group) {
                this.destoryChildren(item);
            }
            else if (item instanceof eui.Scroller) {
                this.destoryChildren(item);
            }
            else if (item instanceof core.ItemRenderer) {
                item.destoryData();
            }
        }
    }
    core.destoryChildren = destoryChildren;
    function getChildByName(name, display) {
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
    }
    core.getChildByName = getChildByName;
    ;
})(core || (core = {}));
var core;
(function (core) {
    var Button = (function (_super) {
        __extends(Button, _super);
        function Button() {
            var _this = _super.call(this) || this;
            _this._throttleTime = null;
            _this._notice = '';
            _this._dataMapArr = [];
            //eui.Button 源代码
            _this.labelDisplay = null;
            _this._label = "";
            _this.iconDisplay = null;
            _this._icon = null;
            /**
             * @private
             * 指示第一次分派 TouchEvent.TOUCH_BEGIN 时，触摸点是否在按钮上。
             */
            _this.touchCaptured = false;
            _this.touchChildren = false;
            _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onTouchBegin, _this);
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
            return _this;
        }
        Button.prototype.onAddToStage = function (e) {
            this.onEnter();
        };
        Object.defineProperty(Button.prototype, "throttleTime", {
            get: function () {
                if (this._throttleTime == null || this._throttleTime <= 0) {
                    return Button.THROTTLE_TIME;
                }
                return this._throttleTime;
            },
            set: function (val) {
                this._throttleTime = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Button.prototype, "notice", {
            get: function () {
                return this._notice;
            },
            set: function (notice) {
                this._notice = notice;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Button.prototype, "data", {
            set: function (value) {
                this._data = value;
                if (value != null) {
                    this.addDataMap('data');
                }
                eui.PropertyEvent.dispatchPropertyEvent(this, eui.PropertyEvent.PROPERTY_CHANGE, "data");
                this.dataChanged();
            },
            enumerable: true,
            configurable: true
        });
        Button.prototype.addDataMap = function (name) {
            if (this._dataMapArr.indexOf(name) == -1) {
                this._dataMapArr.push(name);
            }
        };
        Button.prototype.dataChanged = function () {
        };
        Button.prototype.onEnter = function () {
        };
        Button.prototype.onExit = function () {
        };
        Object.defineProperty(Button.prototype, "throttleFun", {
            get: function () {
                if (this._throttleFun == null) {
                    this._throttleFun = core.fun.throttle(this.buttonReleased, this.throttleTime);
                }
                return this._throttleFun;
            },
            enumerable: true,
            configurable: true
        });
        Button.prototype.onRemoveFromStage = function (e) {
            this.onExit();
        };
        Button.prototype.destoryData = function () {
            while (this._dataMapArr.length) {
                this[this._dataMapArr.shift()] = null;
            }
        };
        Button.prototype.dispose = function () {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        };
        Object.defineProperty(Button.prototype, "label", {
            get: function () {
                return this._label;
            },
            set: function (value) {
                this._label = value;
                if (this.labelDisplay) {
                    this.labelDisplay.text = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Button.prototype, "icon", {
            get: function () {
                return this._icon;
            },
            set: function (value) {
                this._icon = value;
                if (this.iconDisplay) {
                    this.setIconSource(value);
                }
            },
            enumerable: true,
            configurable: true
        });
        Button.prototype.setIconSource = function (icon) {
            if (this.iconDisplay && core.is.truthy(icon)) {
                this.iconDisplay.source = icon;
                this.iconDisplay.includeInLayout = this.iconDisplay.visible = true;
            }
            else if (this.iconDisplay) {
                this.iconDisplay.includeInLayout = this.iconDisplay.visible = false;
            }
        };
        /**
         * 解除触碰事件处理。
         * @param event 事件 <code>egret.TouchEvent</code> 的对象。
         * @version Egret 3.0.1
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        Button.prototype.onTouchCancle = function (event) {
            var stage = event.$currentTarget;
            stage.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancle, this);
            stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onStageTouchEnd, this);
            this.touchCaptured = false;
            this.invalidateState();
        };
        /**
         * 触碰事件处理。
         * @param event 事件 <code>egret.TouchEvent</code> 的对象。
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        Button.prototype.onTouchBegin = function (event) {
            this.$stage.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancle, this);
            this.$stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onStageTouchEnd, this);
            this.touchCaptured = true;
            this.invalidateState();
            event.updateAfterEvent();
        };
        /**
         * @private
         * 舞台上触摸弹起事件
         */
        Button.prototype.onStageTouchEnd = function (event) {
            var stage = event.$currentTarget;
            stage.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancle, this);
            stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onStageTouchEnd, this);
            if (this.contains(event.target)) {
                if (this.throttleTime > 0) {
                    this.throttleFun();
                }
                else {
                    this.buttonReleased();
                }
            }
            this.touchCaptured = false;
            this.invalidateState();
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        Button.prototype.getCurrentState = function () {
            var oldState = this.skin.currentState;
            var newState = 'up';
            if (!this.enabled)
                newState = "disabled";
            if (this.touchCaptured)
                newState = "down";
            if (this.skin.hasState(newState)) {
                return newState;
            }
            return oldState;
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        Button.prototype.partAdded = function (partName, instance) {
            if (instance === this.labelDisplay) {
                this.labelDisplay.text = this._label;
            }
            else if (instance == this.iconDisplay) {
                this.iconDisplay.source = this._icon;
            }
        };
        /**
         * 当在用户单击按钮之后处理 <code>egret.TouchEvent.TOUCH_END</code> 事件时，将调用此方法。
         * 仅当以按钮为目标，并且 <code>touchCaptured</code> 为 <code>true</code> 时，才会调用此方法。
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        Button.prototype.buttonReleased = function () {
            if (core.is.truthy(this._notice)) {
                var data = this.data;
                if (!data) {
                    var host = core.getHostComponent(this);
                    if (host) {
                        data = host.data;
                    }
                }
                core.sendNotification(this._notice, { date: data, host: host, button: this });
            }
            if (this.name) {
                core.sendNotification(core.k.CLICK_BUTTON, { name: this.name, button: this });
            }
        };
        Button.THROTTLE_TIME = 0;
        return Button;
    }(eui.Component));
    core.Button = Button;
    __reflect(Button.prototype, "core.Button");
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
            this.full();
        };
        ComponentState.prototype.full = function () {
            this._component.width = core.App.stage.stageWidth;
            this._component.height = core.App.stage.stageHeight;
            core.App.stage.removeEventListener(egret.Event.RESIZE, this.onResize, this);
            core.App.stage.addEventListener(egret.Event.RESIZE, this.onResize, this);
            return this;
        };
        ComponentState.prototype.onResize = function () {
            this._component.width = core.App.stage.stageWidth;
            this._component.height = core.App.stage.stageHeight;
        };
        ComponentState.prototype.isType = function (type) {
            return this._type == type;
        };
        ComponentState.prototype.setCompType = function (type) {
            this._type = type;
        };
        ComponentState.prototype.getCompType = function () {
            return this._type;
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
            if (this._isFull) {
                core.App.stage.removeEventListener(egret.Event.RESIZE, this.onResize, this);
            }
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
    var ItemRenderer = (function (_super) {
        __extends(ItemRenderer, _super);
        function ItemRenderer() {
            var _this = _super.call(this) || this;
            _this._ignoreButton = false;
            _this._dataMapArr = [];
            _this._compState = new core.ComponentState(_this);
            return _this;
        }
        Object.defineProperty(ItemRenderer.prototype, "notice", {
            get: function () {
                return this._notice;
            },
            set: function (notice) {
                this._notice = notice;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ItemRenderer.prototype, "componentName", {
            get: function () {
                return this._componentName;
            },
            set: function (value) {
                this._componentName = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ItemRenderer.prototype, "ignoreButton", {
            get: function () {
                return this._ignoreButton;
            },
            set: function (value) {
                this._ignoreButton = value;
            },
            enumerable: true,
            configurable: true
        });
        ItemRenderer.prototype.getArgs = function () {
            return this._compState.getArgs();
        };
        ItemRenderer.prototype.setArgs = function (args) {
            this._compState.setArgs(args);
        };
        ItemRenderer.prototype.setFull = function () {
            return this;
        };
        ItemRenderer.prototype.setCompType = function (type) {
            this._compState.setCompType(type);
        };
        ItemRenderer.prototype.getCompType = function () {
            return this._compState.getCompType();
        };
        Object.defineProperty(ItemRenderer.prototype, "animation", {
            get: function () {
                return this._animation;
            },
            enumerable: true,
            configurable: true
        });
        ItemRenderer.prototype.setAnimation = function (animation) {
            this._animation = animation;
            return this;
        };
        Object.defineProperty(ItemRenderer.prototype, "data", {
            get: function () {
                return this.$_data;
            },
            set: function (val) {
                this.$_data = val;
                if (val != null) {
                    this.addDataMap('data');
                }
                eui.PropertyEvent.dispatchPropertyEvent(this, eui.PropertyEvent.PROPERTY_CHANGE, "data");
                this.dataChanged();
            },
            enumerable: true,
            configurable: true
        });
        ItemRenderer.prototype.addDataMap = function (name) {
            if (this._dataMapArr.indexOf(name) == -1) {
                this._dataMapArr.push(name);
            }
        };
        ItemRenderer.prototype.setData = function (data, type) {
            if (type === void 0) { type = 'data'; }
            this[type] = data;
            if (data != null) {
                this.addDataMap(type);
            }
            return this;
        };
        ItemRenderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
        };
        ItemRenderer.prototype.updateAttribute = function (attribute) {
            this[attribute.name] = attribute.value;
        };
        ItemRenderer.prototype.setState = function (name) {
            this.currentState = name;
            return this;
        };
        ItemRenderer.prototype.setCompName = function (name) {
            this.componentName = name;
            return this;
        };
        ItemRenderer.prototype.listener = function (component, type, sender) {
            this._compState.listener(component, type, sender);
        };
        ItemRenderer.prototype.clearListeners = function () {
            this._compState.clearLiteners();
        };
        ItemRenderer.prototype.onEnter = function () {
            core.setAttribute(this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tap, this);
        };
        ItemRenderer.prototype.onExit = function () {
            this.clearListeners();
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.tap, this);
        };
        ItemRenderer.prototype.getCurrentState = function () {
            if (this.enabled == false && this.skin.hasState('disabled')) {
                return 'disabled';
            }
            var state = this.skin.currentState;
            var s = _super.prototype.getCurrentState.call(this);
            if (this.skin.hasState(s)) {
                return s;
            }
            return state;
        };
        ItemRenderer.prototype.destoryData = function () {
            while (this._dataMapArr.length) {
                this[this._dataMapArr.shift()] = null;
            }
            core.destoryChildren(this);
        };
        ItemRenderer.prototype.tap = function (e) {
            if (!this.ignoreButton && e.target instanceof core.Button) {
                e.stopPropagation();
                return;
            }
            if (core.is.truthy(this._notice)) {
                core.sendNotification(this._notice, this.data, this);
            }
        };
        ItemRenderer.prototype.getView = function (name) {
            if (this[name]) {
                return this[name];
            }
            return core.getChildByName(name, this);
        };
        return ItemRenderer;
    }(eui.ItemRenderer));
    core.ItemRenderer = ItemRenderer;
    __reflect(ItemRenderer.prototype, "core.ItemRenderer", ["core.IComponent", "core.IAttributeHost"]);
})(core || (core = {}));
var core;
(function (core) {
    var ProgressBar = (function (_super) {
        __extends(ProgressBar, _super);
        function ProgressBar() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(ProgressBar.prototype, "data", {
            get: function () {
                return this._data;
            },
            set: function (value) {
                this._data = value;
                eui.PropertyEvent.dispatchPropertyEvent(this, eui.PropertyEvent.PROPERTY_CHANGE, "data");
            },
            enumerable: true,
            configurable: true
        });
        return ProgressBar;
    }(eui.ProgressBar));
    core.ProgressBar = ProgressBar;
    __reflect(ProgressBar.prototype, "core.ProgressBar");
})(core || (core = {}));
var core;
(function (core) {
    var RadioButton = (function (_super) {
        __extends(RadioButton, _super);
        function RadioButton() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.customState = null;
            return _this;
        }
        Object.defineProperty(RadioButton.prototype, "data", {
            get: function () {
                return this._data;
            },
            set: function (value) {
                this._data = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RadioButton.prototype, "notice", {
            get: function () {
                return this._notice;
            },
            set: function (value) {
                this._notice = value;
            },
            enumerable: true,
            configurable: true
        });
        RadioButton.prototype.getCurrentState = function () {
            var state = this.customState;
            if (!state) {
                state = this.skin.currentState;
            }
            if (this.selected) {
                if (this.skin.hasState(state + 'AndSelected')) {
                    return state + 'AndSelected';
                }
            }
            else {
                if (state.indexOf('AndSelected') > -1) {
                    return state.replace('AndSelected', '');
                }
            }
            return state;
        };
        RadioButton.prototype.buttonReleased = function () {
            if (core.is.truthy(this._notice)) {
                var data = this.data;
                if (!data) {
                    var host = core.getHostComponent(this);
                    if (host) {
                        data = host.data;
                    }
                }
                core.sendNotification(this._notice, { date: data, host: host, button: this });
            }
            else {
                _super.prototype.buttonReleased.call(this);
            }
        };
        return RadioButton;
    }(eui.RadioButton));
    core.RadioButton = RadioButton;
    __reflect(RadioButton.prototype, "core.RadioButton");
})(core || (core = {}));
var core;
(function (core) {
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
    var Tooltip = (function (_super) {
        __extends(Tooltip, _super);
        function Tooltip() {
            var _this = _super.call(this) || this;
            _this._items = [];
            core.display.setFullDisplay(_this);
            _this.touchEnabled = _this.touchChildren = false;
            return _this;
        }
        Tooltip.prototype.show = function (arg, skinName) {
            if (skinName === void 0) { skinName = undefined; }
            var info;
            if (core.is.string(arg)) {
                info = { text: arg };
            }
            else {
                info = arg;
            }
            if (!core.obj.hasValue(info, 'color')) {
                info.color = 0;
            }
            if (!core.obj.hasValue(info, 'size')) {
                info.size = 20;
            }
            if (!core.obj.hasValue(info, 'delay')) {
                info.delay = 1500;
            }
            var item = core.pool.getPool(TooltipItem).pop(info, skinName);
            this.createItem(item, info.delay);
        };
        Tooltip.prototype.createItem = function (item, delay) {
            var _this = this;
            this.addChild(item);
            this._items.push(item);
            item.animation.show(function () {
                item.animation.delay(delay, function () {
                    item.animation.close(function () {
                        _this.removeItem(item);
                    });
                });
            });
            egret.callLater(function () {
                _this.layout.layout(_this._items);
            }, this);
        };
        Tooltip.prototype.removeItem = function (item) {
            var idx = this._items.indexOf(item);
            if (idx >= 0) {
                this._items.splice(idx, 1);
                core.pool.getPool(TooltipItem).push(item);
                core.display.removeFromParent(item);
            }
        };
        Tooltip.prototype.customView = function (skinName, data, delay) {
            if (delay === void 0) { delay = 1500; }
            var item = core.pool.getPool(TooltipItem).pop(data, skinName);
            this.createItem(item, delay);
        };
        Object.defineProperty(Tooltip.prototype, "layout", {
            get: function () {
                if (!this._layout) {
                    this._layout = core.getDefinitionInstance(core.App.tooltipLayout, TooltipLayout);
                }
                return this._layout;
            },
            enumerable: true,
            configurable: true
        });
        return Tooltip;
    }(core.BaseComponent));
    core.Tooltip = Tooltip;
    __reflect(Tooltip.prototype, "core.Tooltip", ["core.ITooltip"]);
    var TooltipItem = (function (_super) {
        __extends(TooltipItem, _super);
        function TooltipItem() {
            var _this = _super.call(this) || this;
            _this._animation = new TooltipAnimation(_this);
            return _this;
        }
        TooltipItem.prototype.init = function (info, skinName) {
            if (skinName) {
                this.skinName = skinName;
            }
            else {
                this.skinName = 'TooltipSkin';
            }
            this.data = info;
            this.onEnter();
        };
        TooltipItem.prototype.onEnter = function () {
            if (this.label) {
                if (this.data.text.indexOf('<font') > -1) {
                    this.label.textFlow = new egret.HtmlTextParser().parser(this.data.text);
                }
                else {
                    this.label.text = this.data.text;
                }
            }
        };
        Object.defineProperty(TooltipItem.prototype, "animation", {
            get: function () {
                return this._animation;
            },
            enumerable: true,
            configurable: true
        });
        return TooltipItem;
    }(core.BaseComponent));
    __reflect(TooltipItem.prototype, "TooltipItem");
    var TooltipAnimation = (function () {
        function TooltipAnimation(item) {
            this._item = item;
        }
        TooltipAnimation.prototype.show = function (callback) {
            egret.Tween.removeTweens(this._item);
            this._item.visible = true;
            this._item.scaleX = this._item.scaleY = 2;
            this._item.alpha = 1;
            egret.Tween.get(this._item).to({ scaleX: 1, scaleY: 1 }, 300).call(callback);
        };
        TooltipAnimation.prototype.delay = function (delay, callback) {
            egret.Tween.get(this._item).wait(delay).call(callback);
        };
        TooltipAnimation.prototype.close = function (callback) {
            var _this = this;
            egret.Tween.get(this._item).to({ alpha: 0 }, 200).call((function () {
                egret.Tween.removeTweens(_this._item);
                callback();
            }));
        };
        return TooltipAnimation;
    }());
    __reflect(TooltipAnimation.prototype, "TooltipAnimation");
    var TooltipLayout = (function () {
        function TooltipLayout() {
        }
        TooltipLayout.prototype.getTotalHeight = function (items, offsetY) {
            if (offsetY === void 0) { offsetY = 0; }
            return items.reduce(function (a, b) {
                return a + b.height;
            }, 0) + items.length * offsetY;
        };
        TooltipLayout.prototype.layout = function (items) {
            if (items.length == 0) {
                return;
            }
            var offsetY = 5;
            var len = items.length;
            var w = core.display.stageW;
            var h = core.display.stageH;
            var minY = h / 2;
            var maxY = h * 0.8;
            var y = this.getTotalHeight(items, offsetY);
            if (y < minY) {
                y = minY;
            }
            else if (y > maxY) {
                y = maxY;
            }
            var totalH = 0;
            for (var i = len - 1; i >= 0; i--) {
                core.display.setAnchor(items[i], 0.5);
                items[i].y = y - totalH;
                totalH += items[i].height + offsetY;
                items[i].x = w / 2;
            }
        };
        return TooltipLayout;
    }());
    __reflect(TooltipLayout.prototype, "TooltipLayout", ["core.ITooltipLayout"]);
})(core || (core = {}));
var core;
(function (core) {
    var ComponentType;
    (function (ComponentType) {
        ComponentType[ComponentType["None"] = 0] = "None";
        ComponentType[ComponentType["Scene"] = 1] = "Scene";
        ComponentType[ComponentType["Panel"] = 2] = "Panel";
        ComponentType[ComponentType["Menu"] = 3] = "Menu";
        ComponentType[ComponentType["Box"] = 4] = "Box";
        ComponentType[ComponentType["Guide"] = 5] = "Guide";
        ComponentType[ComponentType["Tooltip"] = 6] = "Tooltip";
    })(ComponentType = core.ComponentType || (core.ComponentType = {}));
    function isInstance(type) {
        if (type.constructor != Object.constructor) {
            return true;
        }
        return false;
    }
    core.isInstance = isInstance;
    function isType(type) {
        if (type.constructor == Object.constructor) {
            return true;
        }
        return false;
    }
    core.isType = isType;
    /**
     * 游戏UI界面控制器
     * 目前支持的容器(层级从下往上):场景层、公共UI层、面板层、菜单层、弹框层、新手引导层、浮动层
     */
    var UI = (function (_super) {
        __extends(UI, _super);
        function UI() {
            var _this = _super.call(this) || this;
            _this._components = [];
            _this.touchEnabled = false;
            _this._sceneLayer = new eui.UILayer();
            _this._sceneLayer.touchEnabled = false;
            _this.addChild(_this._sceneLayer);
            _this._commonLayer = new eui.UILayer();
            _this._commonLayer.touchEnabled = false;
            _this.addChild(_this._commonLayer);
            _this._panelLayer = new eui.UILayer();
            _this._panelLayer.touchEnabled = false;
            _this.addChild(_this._panelLayer);
            _this._menuLayer = new eui.UILayer();
            _this._menuLayer.touchEnabled = false;
            _this.addChild(_this._menuLayer);
            _this._boxLayer = new eui.UILayer();
            _this._boxLayer.touchEnabled = false;
            _this.addChild(_this._boxLayer);
            _this._guideLayer = new eui.UILayer();
            _this._guideLayer.touchEnabled = false;
            _this.addChild(_this._guideLayer);
            _this._tooltipLayer = new eui.UILayer();
            _this._tooltipLayer.touchEnabled = false;
            _this.addChild(_this._tooltipLayer);
            _this._containerArr = [_this._sceneLayer, _this._menuLayer, _this._panelLayer, _this._commonLayer, _this._boxLayer, _this._guideLayer, _this._tooltipLayer];
            return _this;
        }
        UI.prototype.openBox = function (type, args) {
            var component = this.addUI(type, ComponentType.Box, this._boxLayer, args);
            if (core.style.animation.box) {
                component.setAnimation(core.style.animation.box);
            }
            this.onEnter(component, args);
            return component;
        };
        UI.prototype.addUI = function (type, compType, parent, args) {
            var component = this.createComponent(type);
            component.setCompType(compType);
            this._components.push(component);
            component.setArgs(args);
            parent.addChild(component);
            return component;
        };
        UI.prototype.createComponent = function (type) {
            var newInst;
            if (core.is.string(type)) {
                var component = new core.BaseComponent();
                component.skinName = type;
                newInst = component;
            }
            else if (isInstance(type)) {
                newInst = type;
            }
            else if (isType(type)) {
                var t = type;
                newInst = new t();
            }
            // newInst.setFull();
            return newInst;
        };
        UI.prototype.onEnter = function (component, args) {
            var _this = this;
            if (component.animation) {
                component.visible = true;
                if (component.stage) {
                    this.showAnimation(component, args);
                }
                else {
                    component.once(egret.Event.ADDED_TO_STAGE, function () {
                        _this.showAnimation(component, args);
                    }, this);
                }
            }
            else {
                this.showAnimation(component, args);
            }
        };
        UI.prototype.showAnimation = function (component, args) {
            component.onEnter.apply(component, args);
            if (component.animation) {
                egret.callLater(function () {
                    component.animation.show(component, function () { });
                }, this);
            }
        };
        UI.prototype.addTooltip = function (type, args) {
            var component = this.addUI(type, ComponentType.Tooltip, this._tooltipLayer, args);
            this.onEnter(component, args);
            return component;
        };
        UI.prototype.runScene = function (type, args) {
            var oldScene = this.getComponentByType(ComponentType.Scene);
            if (oldScene) {
                this.remove(oldScene);
            }
            var component = this.addUI(type, ComponentType.Scene, this._sceneLayer, args);
            if (core.style.animation.scene) {
                component.setAnimation(core.style.animation.scene);
            }
            this.onEnter(component, args);
            return component;
        };
        UI.prototype.getComponentByType = function (componentType) {
            for (var i = 0; i < this._components.length; i++) {
                if (this._components[i].getCompType() == componentType) {
                    return this._components[i];
                }
            }
            return null;
        };
        UI.prototype.remove = function (type) {
            var has = false;
            for (var i = this._components.length - 1; i >= 0; i--) {
                var component = this._components[i];
                if (this.compareType(type, component)) {
                    this._components.splice(i, 1);
                    var disObj = component;
                    this.onExit(component, true);
                    has = true;
                    // if (component[UI.SEQ_BOX_KEY] == true) {
                    //     this.checkSeqBox(component[UI.SEQ_GROUP_KEY]);
                    // }
                    // if (component[UI.STACK_BOX_KEY] === true) {
                    //     this.setStackBoxVisible(true);
                    // }
                }
            }
            return has;
        };
        UI.prototype.compareType = function (type, component) {
            if (core.is.string(type)) {
                return component.name == type;
            }
            else if (core.is.number(type)) {
                return component.getCompType() == type;
            }
            else if (isInstance(type)) {
                return component == type;
            }
            else if (isType(type)) {
                return component.constructor == type;
            }
            return false;
        };
        UI.prototype.onExit = function (component, forcerRemove) {
            component.onExit();
            if (component.animation) {
                component.animation.hide(component, function () {
                    component.visible = false;
                    if (forcerRemove) {
                        core.display.removeFromParent(component);
                    }
                });
            }
            else {
                if (forcerRemove) {
                    core.display.removeFromParent(component);
                }
            }
        };
        UI.SEQ_BOX_KEY = "__seq_box__";
        UI.SEQ_GROUP_KEY = "__seq_group__";
        UI.STACK_BOX_KEY = "__stack_box__";
        return UI;
    }(eui.UILayer));
    core.UI = UI;
    __reflect(UI.prototype, "core.UI");
})(core || (core = {}));
var core;
(function (core) {
    /**
     * 按钮点击动画效果
     * 在Main.ts中指定
     */
    var ButtonAnimation = (function () {
        function ButtonAnimation() {
            this._sx = null;
            this._sy = null;
        }
        ButtonAnimation.prototype.show = function (component, callback) {
            var group = component;
            if (group) {
                if (this._sx == null && this._sy == null) {
                    this._sx = group.scaleX;
                    this._sy = group.scaleY;
                }
                group.scaleX = this._sx;
                group.scaleY = this._sy;
                egret.Tween.get(group).to({ scaleX: this._sx + 0.04, scaleY: this._sy + 0.04 }, 100);
            }
        };
        ButtonAnimation.prototype.hide = function (component, callback) {
            var group = component;
            if (group) {
                egret.Tween.get(group).to({ scaleX: this._sx, scaleY: this._sy }, 100);
            }
        };
        return ButtonAnimation;
    }());
    __reflect(ButtonAnimation.prototype, "ButtonAnimation", ["core.IAnimation"]);
    /**
     * 弹框打开/关闭动画效果
     */
    var BoxAnimation = (function () {
        function BoxAnimation() {
        }
        BoxAnimation.prototype.show = function (c, callback) {
            var rect = c.getView('rect');
            var group = c.getView('group');
            var tw = null;
            if (rect) {
                var alpha = rect.alpha;
                rect.alpha = 0;
                tw = egret.Tween.get(rect).to({ alpha: alpha }, 150);
            }
            if (group) {
                var sx = group.scaleX;
                var sy = group.scaleY;
                var alpha = group.alpha;
                group.scaleX = sx * 0.5;
                group.scaleY = sy * 0.5;
                group.alpha = 0;
                tw = egret.Tween.get(group).to({ alpha: alpha, scaleX: sx, scaleY: sy }, 150);
            }
            if (callback) {
                if (tw) {
                    tw.call(function () {
                        callback();
                        egret.Tween.removeTweens(rect);
                        egret.Tween.removeTweens(rect);
                    });
                }
                else {
                    callback();
                }
            }
        };
        BoxAnimation.prototype.hide = function (c, callback) {
            var rect = c.getView('rect');
            var group = c.getView('group');
            var tw = null;
            if (rect) {
                tw = egret.Tween.get(rect).to({ alpha: 0 }, 100);
            }
            if (group) {
                var sx = group.scaleX * 0.5;
                var sy = group.scaleY * 0.5;
                tw = egret.Tween.get(group).to({ alpha: 0, scaleX: sx, scaleY: sy }, 100);
            }
            if (callback) {
                if (tw) {
                    tw.call(function () {
                        callback();
                        egret.Tween.removeTweens(rect);
                        egret.Tween.removeTweens(rect);
                    });
                }
                else {
                    callback();
                }
            }
        };
        return BoxAnimation;
    }());
    __reflect(BoxAnimation.prototype, "BoxAnimation", ["core.IAnimation"]);
})(core || (core = {}));
var GuideSystem = (function () {
    function GuideSystem() {
    }
    return GuideSystem;
}());
__reflect(GuideSystem.prototype, "GuideSystem");
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
         * @param child 子显示对象
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
    var fun = (function () {
        function fun() {
        }
        fun.throttle = function (fn, delay, immediate, debounce) {
            if (immediate === void 0) { immediate = false; }
            var curr = +new Date(), //当前事件
            last_call = 0, last_exec = 0, timer = null, diff, //时间差
            context, //上下文
            args, exec = function () {
                last_exec = curr;
                fn.apply(context, args);
            };
            return function () {
                curr = +new Date();
                context = this,
                    args = arguments,
                    diff = curr - (debounce ? last_call : last_exec) - delay;
                clearTimeout(timer);
                if (debounce) {
                    if (immediate) {
                        timer = setTimeout(exec, this, delay);
                    }
                    else if (diff >= 0) {
                        exec();
                    }
                }
                else {
                    if (diff >= 0) {
                        exec();
                    }
                    else if (immediate) {
                        timer = setTimeout(exec, this, -diff);
                    }
                }
                last_call = curr;
            };
        };
        ;
        return fun;
    }());
    core.fun = fun;
    __reflect(fun.prototype, "core.fun");
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
    var obj = (function () {
        function obj() {
        }
        //利用递归来实现深拷贝，如果对象属性的值是引用类型（Array,Object），那么对该属性进行深拷贝，直到遍历到属性的值是基本类型为止。  
        obj.deepClone = function (obj) {
            if (!obj && typeof obj !== 'object') {
                return;
            }
            var newObj = Array.isArray(obj) ? [] : {};
            for (var key in obj) {
                if (obj[key]) {
                    if (obj[key] && typeof obj[key] === 'object') {
                        newObj[key] = Array.isArray(obj[key]) ? [] : {};
                        //递归
                        newObj[key] = this.deepClone(obj[key]);
                    }
                    else {
                        newObj[key] = obj[key];
                    }
                }
            }
            return newObj;
        };
        obj.deepClone2 = function (obj) {
            return JSON.parse(JSON.stringify(obj));
        };
        /**
         * @desc 深拷贝，支持常见类型
         * @param {Any} values
         */
        obj.deepCloneCommon = function (values) {
            var copy;
            // Handle the 3 simple types, and null or undefined
            if (null == values || "object" != typeof values)
                return values;
            // Handle Date
            if (values instanceof Date) {
                copy = new Date();
                copy.setTime(values.getTime());
                return copy;
            }
            // Handle Array
            if (values instanceof Array) {
                copy = [];
                for (var i = 0, len = values.length; i < len; i++) {
                    copy[i] = this.deepCloneCommon(values[i]);
                }
                return copy;
            }
            // Handle Object
            if (values instanceof Object) {
                copy = {};
                for (var attr in values) {
                    if (values.hasOwnProperty(attr))
                        copy[attr] = this.deepCloneCommon(values[attr]);
                }
                return copy;
            }
            throw new Error("Unable to copy values! Its type isn't supported.");
        };
        obj.simpleClone = function (obj) {
            if (typeof obj !== 'object')
                return null;
            var newObj = Array.isArray(obj) ? [] : {};
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    newObj[key] = obj[key];
                }
            }
            // Object.assign(newObj,obj);
            return newObj;
        };
        obj.getValue = function (data, key, defVal) {
            if (defVal === void 0) { defVal = null; }
            if (core.is.falsy(data)) {
                return defVal;
            }
            key = key + "";
            var keyArr = key.split('.');
            var curObj = data;
            for (var i = 0; i < keyArr.length; i++) {
                var key = keyArr[i];
                if (core.is.array(curObj)) {
                    curObj = curObj[parseInt(key)];
                }
                else {
                    if (key == '') {
                        curObj = curObj;
                    }
                    else {
                        curObj = curObj[key];
                    }
                }
                if (!core.is.existy(curObj)) {
                    break;
                }
            }
            if (!core.is.existy(curObj)) {
                return defVal;
            }
            return curObj;
        };
        obj.hasValue = function (data, key) {
            if (!data) {
                return false;
            }
            key = key + "";
            var keyArr = key.split('.');
            var obj = data;
            while (keyArr.length > 0 && obj) {
                var k = keyArr.shift();
                if (!obj.hasOwnProperty(k)) {
                    return false;
                }
                obj = obj[k];
            }
            return true;
        };
        return obj;
    }());
    core.obj = obj;
    __reflect(obj.prototype, "core.obj");
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
    core.ObjectPool = ObjectPool;
    __reflect(ObjectPool.prototype, "core.ObjectPool");
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
    core.pool = pool;
    __reflect(pool.prototype, "core.pool");
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
