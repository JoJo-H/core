module core {

    export enum UIType {
        SCENE,
        COMMON,
        PANEL,
        MENU,
        BOX,
        GUIDE,
        TOOLTIP
    }

    /**
     * 游戏UI界面控制器
     * 目前支持的容器(层级从下往上):场景层、公共UI层、面板层、菜单层、弹框层、新手引导层、浮动层
     */
    export class UI extends eui.UILayer {
        private _tooltip: eui.UILayer;
        private _guide: eui.UILayer;
        private _box: eui.UILayer;
        private _common: eui.UILayer;
        private _panel: eui.UILayer;
        private _menu: eui.UILayer;
        private _scene: eui.UILayer;
        private _topScene: eui.UILayer;

        private _containerArr: eui.UILayer[];

        constructor() {
            super();

            this.touchEnabled = false;

            this._scene = new eui.UILayer();
            this._scene.touchEnabled = false;
            this.addChild(this._scene);

            this._common = new eui.UILayer();
            this._common.touchEnabled = false;
            this.addChild(this._common);

            this._panel = new eui.UILayer();
            this._panel.touchEnabled = false;
            this.addChild(this._panel);

            this._menu = new eui.UILayer();
            this._menu.touchEnabled = false;
            this.addChild(this._menu);

            this._topScene = new eui.UILayer();
            this._topScene.touchEnabled = false;
            this.addChild(this._topScene);

            this._box = new eui.UILayer();
            this._box.touchEnabled = false;
            this.addChild(this._box);

            this._guide = new eui.UILayer();
            this._guide.touchEnabled = false;
            this.addChild(this._guide);

            this._tooltip = new eui.UILayer();
            this._tooltip.touchEnabled = false;
            this.addChild(this._tooltip);

            this._containerArr = [this._scene, this._topScene, this._menu, this._panel, this._common, this._box, this._guide, this._tooltip];
        }

        // private showAnimation(component:BaseComponent):void {
        //     egret.callLater(() => {
        //         component.animation.show(() => {});
        //     }, this);
        // }

        // private onEnter(component:BaseComponent):void {
        //     if (component.animation) {
        //         component.visible = true;
        //         if (component.stage) {
        //             this.showAnimation(component);
        //         } else {
        //             component.once(egret.Event.ADDED_TO_STAGE, () => {
        //                 this.showAnimation(component);
        //             }, this);
        //         }
        //     }
        // }

        // clearBox():void {
        //     this.boxHistory.clear();
        //     var count = this._box.numChildren;
        //     while (count > 0) {
        //         var box = this._box.getChildAt(0);
        //         meru.UI.remove(box, false);
        //         count--;
        //     }
        // }

        // private onExit(component:BaseComponent, remove:boolean):void {
        //     if (component.animation) {
        //         component.animation.close(() => {
        //             component.visible = false;
        //             if (remove) {
        //                 component.destoryData();
        //                 display.removeFromParent(component, true);
        //             }
        //         })
        //     } else {
        //         if (remove) {
        //             component.destoryData();
        //             display.removeFromParent(component, true);
        //         }
        //     }
        // }

        // private setAnimation(animationName:string, instanceObj:any):void {
        //     if (!instanceObj.animation && animationName)  {
        //         var animType = egret.getDefinitionByName(animationName);
        //         if (animType) {
        //             var animInstance = new animType();
        //             instanceObj.animation = animInstance;
        //         }
        //     }
        // }


        // private onRemoveBox(boxDisplay:any):void {
        //     var group = boxDisplay['__box_group__'];
        //     if (group) {
        //         var arr = this._sequenceBoxMap[group];
        //         if (arr) {
        //             var idx = arr.indexOf(boxDisplay);
        //             if (idx > -1) {
        //                 arr.splice(idx, 1);
        //             }

        //             if (arr.length == 0) {
        //                 delete this._sequenceBoxMap[group];
        //                 this.dispatchEvent(new UIEvent(UIEvent.CLEAR_SEQUENCE_BOX, null, group));
        //             } else {
        //                 var top = arr.shift();
        //                 this.runSeqBox(arr, group, top);
        //             }
        //         }
        //     }
        // }

        // private getTypeInst(type: any, animation:string, args: any[], uiType:UIType): BaseComponent {
        //     var inst = null;

        //     var skinName;
        //     if (typeof type == 'string') {
        //         skinName = type;
        //         if (uiType == UIType.BOX) {
        //             type = meru.getDefinitionType(getSetting().BoxClass, meru.BaseComponent);
        //         } else {
        //             type = meru.BaseComponent;
        //         }
        //     }
        //     if (type.constructor.name == "Function") {
        //         inst = new type(...args);
        //     } else {
        //         inst = type;
        //         if (inst.setManual) {
        //             inst.setManual(true);
        //         }
        //         if (inst.setArgs) {
        //             inst.setArgs(args);
        //         }
        //     }
        //     if (skinName) {
        //         inst.skinName = skinName;
        //     }

        //     if (egret.is(inst, 'meru.BaseComponent')) {
        //         inst.setType(uiType);
        //     }

        //     this.setAnimation(animation, inst);
        //     this.onEnter(inst);
        //     if (inst.hasOwnProperty('removeing')) {
        //         delete inst.removeing;
        //     }
        //     return inst;
        // }

        // private _addPanel(panelType:any, args):BaseComponent {
        //     this.hidePanel(this._currentPanel);
        //     var panelInst = this.getTypeInst(panelType, getSetting().PanelAnimation, args, UIType.PANEL);
        //     display.setFullDisplay(panelInst);

        //     this._panel.addChild(panelInst);

        //     this._currentPanel = panelInst;

        //     this.dispatchEvent(new UIEvent(UIEvent.SHOW_PANEL, panelInst));

        //     return panelInst;
        // }

        // addBox(boxType: any, args): BaseComponent {
        //     var boxInst = this.getTypeInst(boxType, getSetting().BoxAnimation, args, UIType.BOX);
        //     display.setFullDisplay(boxInst);

        //     this._box.addChild(boxInst);

        //     this.dispatchEvent(new UIEvent(UIEvent.ADD_BOX, boxInst));
        //     this.dispatchEvent(new UIEvent(UIEvent.ADD_COMPONENT, boxInst));

        //     return boxInst;
        // }

        // private checkHistory(gotoHistory: boolean, history: UIHistory, gotoBackFun: Function): void {
        //     if (!history) {
        //         return;
        //     }
        //     if (gotoHistory) {
        //         if (history.hasHistory()) {
        //             history.popHistory();
        //             var item = history.popHistory();
        //             if (item) {
        //                 gotoBackFun(item);
        //             }
        //         }
        //     } else {
        //         history.clear();
        //     }
        // }

        // remove(displayObj: any, isHistory: boolean = null, checkHistory:boolean = true): void {
        //     if (displayObj.removeing === true) {
        //         return;
        //     }

        //     displayObj.removeing = true;

        //     var gotoHistory = isHistory;

        //     if (isHistory == null && displayObj.isHistoryComponent()) {
        //         gotoHistory = true;
        //     }

        //     if (displayObj.isType(UIType.BOX) === true) {
        //         this.onExit(displayObj, true);
        //         if (checkHistory) {
        //             this.checkHistory(gotoHistory, this.boxHistory, (item) =>
        //                 this.addHistoryBox(item.type, item.args)
        //             );
        //         }
        //     } else if (displayObj.isType(UIType.SCENE) === true) {
        //         this.onExit(displayObj, true);
        //         if (checkHistory) {
        //             this.checkHistory(gotoHistory, this.sceneHistory, (item) =>
        //                 this.addScene(item.type, item.isUnder, item.args)
        //             );
        //         }
        //     } else if (displayObj.isType(UIType.PANEL) === true) {
        //         this.hidePanel(displayObj);
        //         if (checkHistory) {
        //             this.checkHistory(gotoHistory, this.panelHistory, (item) => {
        //                 this.restoreHookList(this.showHistoryPanel(item.type, item.args), item.hookList);
        //             });
        //         }
        //     } else {
        //         this.onExit(displayObj, true);
        //     }

        //     if (displayObj.isType(UIType.BOX) === true) {
        //         this.dispatchEvent(new UIEvent(UIEvent.REMOVE_BOX, displayObj));
        //         this.dispatchEvent(new UIEvent(UIEvent.REMOVE_COMPONENT, displayObj));
        //         this.onRemoveBox(displayObj);
        //     } else if (displayObj.isType(UIType.SCENE) === true) {
        //         this.dispatchEvent(new UIEvent(UIEvent.REMOVE_SCENE, displayObj));
        //         this.dispatchEvent(new UIEvent(UIEvent.REMOVE_COMPONENT, displayObj));
        //     } else if (displayObj.isType(UIType.MENU) === true) {
        //         this.dispatchEvent(new UIEvent(UIEvent.REMOVE_MENU, displayObj));
        //         this.dispatchEvent(new UIEvent(UIEvent.REMOVE_COMPONENT, displayObj));
        //     } else if (displayObj.isType(UIType.GUIDE) === true) {
        //         this.dispatchEvent(new UIEvent(UIEvent.REMOVE_GUIDE, displayObj));
        //         this.dispatchEvent(new UIEvent(UIEvent.REMOVE_COMPONENT, displayObj));
        //     } else if (displayObj.isType(UIType.TOOLTIP) === true) {
        //         this.dispatchEvent(new UIEvent(UIEvent.REMOVE_TOOLTIP, displayObj));
        //         this.dispatchEvent(new UIEvent(UIEvent.REMOVE_COMPONENT, displayObj));
        //     } else if (displayObj.isType(UIType.COMMON) === true) {
        //         this.dispatchEvent(new UIEvent(UIEvent.REMOVE_COMMON, displayObj));
        //         this.dispatchEvent(new UIEvent(UIEvent.REMOVE_COMPONENT, displayObj));
        //     }
        // }

        // private restoreHookList(panel, hookList:any[]):void {
        //     for (var i = 0; i < hookList.length; i ++) {
        //         var item = hookList[i];
        //         if (item.action == 'setData') {
        //             panel.setData(item.data, item.type);
        //         } else if (item.action == 'addOperate') {
        //             var data = item.data;
        //             item.operate.unserialize(data);
        //             panel.addOperate(item.operate);
        //         }
        //     }
        // }

        // private _sceneInst: BaseComponent;

        // get sceneHistory():UIHistory {
        //     return typeSingleton('__UI_SCENE__', UIHistory);
        // }

        // runScene(sceneType: any, args): meru.BaseComponent {
        //     if (is.truthy(this._sceneInst)) {
        //         this.remove(this._sceneInst, null, false);
        //     }
        //     var ret = this.addScene(sceneType, true, args);
        //     return ret;
        // }

        // runTopScene(sceneType: any, args): meru.BaseComponent {
        //     if (is.truthy(this._sceneInst)) {
        //         this.remove(this._sceneInst, null, false);
        //     }
        //     var ret = this.addScene(sceneType, false, args);
        //     return ret;
        // }

        // private addScene(sceneType, isUnderScene:boolean, args): meru.BaseComponent {
        //     this.sceneHistory.pushHistory(sceneType, args, isUnderScene);
        //     var sceneInst = this.getTypeInst(sceneType, getSetting().SceneAnimation, args, UIType.SCENE);
        //     display.setFullDisplay(sceneInst);
        //     this._sceneInst = sceneInst;
        //     if (isUnderScene) {
        //         this._scene.addChild(sceneInst);
        //     } else {
        //         this._topScene.addChild(sceneInst);
        //     }
        //     this._sceneInst.setHistoryComponent(true);
        //     this._menu.visible = isUnderScene;
        //     this.dispatchEvent(new UIEvent(UIEvent.RUN_SCENE, this._sceneInst));
        //     this.dispatchEvent(new UIEvent(UIEvent.ADD_COMPONENT, this._sceneInst));
        //     return sceneInst;
        // }

        // addCommon(commonType: any, args): meru.BaseComponent {
        //     var commonInst = this.getTypeInst(commonType, null, args, UIType.COMMON);
        //     display.setFullDisplay(commonInst);
        //     this._common.addChild(commonInst);
        //     this.dispatchEvent(new UIEvent(UIEvent.ADD_COMMON, commonInst));
        //     this.dispatchEvent(new UIEvent(UIEvent.ADD_COMPONENT, commonInst));
        //     return commonInst;
        // }

        // addTooltip(tooltipType:any, args):meru.BaseComponent {
        //     var tooltipInst = this.getTypeInst(tooltipType, null, args, UIType.TOOLTIP);
        //     display.setFullDisplay(tooltipInst);
        //     this._tooltip.addChild(tooltipInst);
        //     if (egret.is(tooltipInst, 'meru.BaseComponent')) {
        //         this.dispatchEvent(new UIEvent(UIEvent.ADD_TOOLTIP, tooltipInst));
        //         this.dispatchEvent(new UIEvent(UIEvent.ADD_COMPONENT, tooltipInst));
        //     }
        //     return tooltipInst;
        // }

        // addGuide(guideType:any, args):any {
        //     var guideInst = this.getTypeInst(guideType, null, args, UIType.GUIDE);
        //     display.setFullDisplay(guideInst);
        //     this._guide.addChild(guideInst);
        //     this.dispatchEvent(new UIEvent(UIEvent.ADD_GUIDE, guideInst));
        //     this.dispatchEvent(new UIEvent(UIEvent.ADD_COMPONENT, guideInst));
        //     return guideInst;
        // }

        getContainerByType(type:UIType) {
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
        }

        hasPanel():boolean {
            var panel = this._panel;
            var num = panel.numChildren;
            for (var i = 0; i < num; i ++) {
                var child = panel.getChildAt(i);
                if (child.visible) {
                    return true;
                }
            }
            return false;
        }

        // static hasPanel():boolean {
        //     return meru.singleton(UI).hasPanel();
        // }

        private getComponentByName(name: string, container: egret.DisplayObjectContainer): BaseComponent {
            var num = container.numChildren;
            for (var i = 0; i < num; i++) {
                var child: BaseComponent = <BaseComponent>container.getChildAt(i);
                if (child.componentName == name) {
                    return child;
                }
            }
            return null;
        }

        // getComponent(name: string): IComponent {
        //     var pullComponent = <any>meru.pullObject(k.GetComponent, name);
        //     if (pullComponent != null && pullComponent != name) {
        //         return pullComponent;
        //     }

        //     for (var i = 0; i < this._containerArr.length; i++) {
        //         var container = this._containerArr[i];

        //         var component = this.getComponentByName(name, container);

        //         if (component) {
        //             return component;
        //         }
        //     }
        //     return null;
        // }

        // private isSingleContainer(component: any): boolean {
        //     if (component.isType(UIType.SCENE) &&
        //         component.isType(UIType.MENU)) {
        //         return true;
        //     }
        //     return false;
        // }

        // removeComponent(name: string): void {
        //     var obj: any = this.getComponent(name);
        //     if (egret.is(obj, 'meru.BaseComponent')) {
        //         if (!this.isSingleContainer(obj)) {
        //             this.remove(obj);
        //         }
        //     }
        // }

        // private _menuInst: any;

        // setMenu(menuType: any, args): void {
        //     if (this._menuInst != null) {
        //         this.remove(this._menuInst);
        //     }

        //     var menuInst = this.getTypeInst(menuType, null, args, UIType.MENU);
        //     display.setFullDisplay(menuInst);
        //     this._menuInst = menuInst;
        //     this._menuInst.bottom = 0;
        //     this._menu.addChild(this._menuInst);
        //     this.dispatchEvent(new UIEvent(UIEvent.SET_MENU, menuInst));
        //     this.dispatchEvent(new UIEvent(UIEvent.ADD_COMPONENT, menuInst));
        // }

        // setRoot(container: egret.DisplayObjectContainer): void {
        //     if (container) {
        //         container.addChild(this);
        //     }
        // }

        // static runTopScene(sceneType:any, ...args): core.BaseComponent {
        //     return singleton(UI).runTopScene(sceneType, args);
        // }

        // static runScene(sceneType: any, ...args): core.BaseComponent {
        //     return singleton(UI).runScene(sceneType, args);
        // }

        // static setMenu(menuType: any, ...args): void {
        //     singleton(UI).setMenu(menuType, args);
        // }

        // static addCommon(commonType: any, ...args): core.BaseComponent {
        //     return singleton(UI).addCommon(commonType, args);
        // }

        // static injectionPanel(name: string, type: any, ...args): void {
        //     args.unshift(name);
        //     singleton(UI).injectionPanel(name, type, args);
        // }

        // static panelIsVisible(name:string):boolean {
        //     return singleton(UI).panelIsDisplay(name);
        // }

        // showPanel(name:any, args:any[]):BaseComponent {
        //     if ((is.string(name) && name.indexOf('Skin') > -1) || !is.string(name)) {
        //         return this._addPanel(name, args);
        //     } else {
        //         return this._showPanel(name, args);
        //     }
        // }

        // static showPanel(name: any, ...args): BaseComponent {
        //     return singleton(UI).showPanel(name, args);
        // }

        // static getComponent<T extends IComponent>(name:string): T;
        // static getComponent(name: string): IComponent {
        //     return singleton(UI).getComponent(name);
        // }

        // static addBox(type: any, ...args): BaseComponent {
        //     return singleton(UI).addBox(type, args);
        // }

        // static addSequenceBox(type: any, ...args):void {
        //     singleton(UI).addSequnceBox(type, '_normal_', -99999, args);
        // }

        // static getSequenceCount(group:string):number {
        //     return singleton(UI).getSequnceCount(group);
        // }

        // static runGroupSequenceBox(group:string):void {
        //     singleton(UI).runSequnceBox(group);
        // }

        // static addGroupSequenceBox(type:any, group:string, priority:number, ...args):void {
        //     singleton(UI).addSequnceBox(type, group, priority, args);
        // }

        // static addGroupSequenceFun(fun:(callback:Function) => void, group:string, priority:number):void {
        //     singleton(UI).addSequnceBox(null, group, priority, [fun], 'fun');
        // }

        // static addHistoryBox(type: any, ...args): void {
        //     singleton(UI).addHistoryBox(type, args);
        // }

        // static showHistoryPanel(type: any, ...args):meru.BaseComponent {
        //     return singleton(UI).showHistoryPanel(type, args)
        // }

        // static addGuide(type:any, ...args):core.BaseComponent {
        //     return singleton(UI).addGuide(type, args);
        // }

        // static addEventListener(type:string, func:Function, context?:Object):void {
        //     singleton(UI).addEventListener(type, func, context);
        // }

        // static once(type:string, func:Function, context?:Object):void {
        //     singleton(UI).once(type, func, context);
        // }

        // static removeEventListener(type:string, func:Function, context?:Object):void {
        //     singleton(UI).removeEventListener(type, func, context);
        // }

        // static addTooltip(type:any, ...args):core.BaseComponent {
        //     return singleton(UI).addTooltip(type, args);
        // }

        // static remove(inst: any, gotoHistory: boolean = null): void {
        //     singleton(UI).remove(inst, gotoHistory);
        // }

        // static clearBox():void {
        //     singleton(UI).clearBox();
        // }

        // static getMenu():any {
        //     var ui = singleton(UI)._menuInst;
        //     return ui;
        // }

        // static getScene():any {
        //     var ui = singleton(UI)._sceneInst;
        //     return ui;
        // }

        // static getContainerByType(type:UIType):egret.DisplayObjectContainer {
        //     return singleton(UI).getContainerByType(type);
        // }

        // // static hidePanel(panel?: any): void {
        // //     singleton(UI).hidePanel(panel);
        // // }

        // static removeByName(name: string): void {
        //     singleton(UI).removeComponent(name);
        // }

        // static get panelHistory():UIHistory {
        //     return singleton(UI).panelHistory;
        // }

        // static setBoxVisible(visible:boolean, without:BaseComponent = null):void {
        //     var u = singleton(UI);
        //     for (var i = 0, len = u._box.numChildren; i < len ; i ++) {
        //         if (u._box.getChildAt(i) != without) {
        //             u._box.getChildAt(i).visible = visible;
        //         }
        //     }
        // }

        // static get boxHistory():UIHistory {
        //     return singleton(UI).boxHistory;
        // }

        // static get sceneHistory():UIHistory {
        //     return singleton(UI).sceneHistory;
        // }

        // static setRoot(container: egret.DisplayObjectContainer): void {
        //     singleton(UI).setRoot(container);
        // }
    }
}