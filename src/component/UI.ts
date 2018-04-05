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
class UI extends eui.UILayer{

    private _menuInst: BaseComponent;
    private _sceneInst: BaseComponent;

    private _scene : eui.UILayer;
    private _common : eui.UILayer;
    private _panel : eui.UILayer;
    private _menu : eui.UILayer;
    private _box : eui.UILayer;
    private _guide : eui.UILayer;
    private _tooltip : eui.UILayer;

    private _containerArr : any[] ;
    constructor(){
        super();
        this.touchEnabled = false;

        this._scene = new eui.UILayer();
        this._scene.touchEnabled = false;
        this.addChild(this._scene);
        this._common = new eui.UILayer();
        this._common.touchEnabled = false;
        this.addChild(this._common);
        this._panel = new eui.UILayer();
        this.addChild(this._panel);
        this._panel.touchEnabled = false;
        this._menu = new eui.UILayer();
        this.addChild(this._menu);
        this._menu.touchEnabled = false;
        this._box = new eui.UILayer();
        this.addChild(this._box);
        this._box.touchEnabled = false;
        this._guide = new eui.UILayer();
        this.addChild(this._guide);
        this._guide.touchEnabled = false;
        this._tooltip = new eui.UILayer();
        this.addChild(this._tooltip);
        this._tooltip.touchEnabled = false;

        this._containerArr = [this._scene,this._common,this._panel,this._menu,this._box,this._guide,this._tooltip];
    }

    setRoot(container:egret.DisplayObjectContainer):void {
        if(container) {
            container.addChild(this);
        }
    }

    setMenu(menuType: any, ...args): void {
        if (this._menuInst != null) {
            this.remove(this._menuInst);
        }
        let menuInst = this.getTypeInst(menuType, args, UIType.MENU);
        display.setFullDisplay(menuInst);
        this._menuInst = menuInst;
        this._menuInst.bottom = 0;
        this._menuInst.horizontalCenter = 0;
        this._menu.addChild(this._menuInst);
    }

    runScene(sceneType: any, ...args): BaseComponent {
        if (this._sceneInst) {
            this.remove(this._sceneInst);
        }
        let ret = this.addScene(sceneType, args);
        return ret;
    }

    private addScene(sceneType, ...args): BaseComponent {
        let sceneInst = this.getTypeInst(sceneType, args, UIType.SCENE);
        display.setFullDisplay(sceneInst);
        this._sceneInst = sceneInst;
        this._scene.addChild(sceneInst);
        return sceneInst;
    }

    addBox(boxType:any,...args):BaseComponent {
        let boxInst = this.getTypeInst(boxType,args,UIType.BOX);
        display.setFullDisplay(boxInst);
        this._box.addChild(boxInst);
        return boxInst;
    }

    addPanel(panelType:any, ...args):BaseComponent {
        let panelInst = this.getTypeInst(panelType, args, UIType.PANEL);
        display.setFullDisplay(panelInst);
        this._panel.addChild(panelInst);
        return panelInst;
    }

    addCommon(commonType: any, ...args): any {
        let commonInst = this.getTypeInst(commonType, args, UIType.COMMON);
        display.setFullDisplay(commonInst);
        this._common.addChild(commonInst);
        return commonInst;
    }

    addTooltip(tooltipType:any, ...args):BaseComponent {
        var tooltipInst = this.getTypeInst(tooltipType, args, UIType.TOOLTIP);
        display.setFullDisplay(tooltipInst);
        this._tooltip.addChild(tooltipInst);
        return tooltipInst;
    }

    private getTypeInst(type,arg,uiType):any {
        let inst : BaseComponent = null;
        let skinName ;
        if( typeof(type) == "string" ) {
            skinName = type;
            type = BaseComponent;
        }
        if( type.constructor.name == "Function") {
            inst = new type(...arg);
        }else {
            inst = type;
            inst.setArgs(arg);
            if(skinName) {
                inst.skinName = skinName;
            }
        }
        return inst;
    }

    removeComponent(name: string): void {
        let obj: any = this.getComponent(name);
        if (egret.is(obj, 'BaseComponent')) {
            if (!this.isSingleContainer(obj)) {
                this.remove(obj);
            }
        }
    }

    getComponent(name:string):BaseComponent {
        for (let i : number = 0 ; i < this._containerArr.length ; i++ ) {
            let container = this._containerArr[i];
            let component = this.getComponentByName(name,container);
            if(component) {
                return component;
            }
        }
        return null;
    }

    private getComponentByName(name:string,container:egret.DisplayObjectContainer):BaseComponent {
        let num = container.numChildren;
        for ( let i : number = 0 ; i < num ; i++ ) {
            let child : BaseComponent = <BaseComponent>container.getChildAt(i);
            if(child.componentName == name) {
                return child;
            }
        }
        return null;
    }

    private isSingleContainer(component: any): boolean {
        if (component.isType(UIType.SCENE) &&
            component.isType(UIType.MENU)) {
            return true;
        }
        return false;
    }

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

    remove(component:BaseComponent):void {
        if(!component) return;
        // component.dispose();
        display.removeFromParent(component);
    }
}
}