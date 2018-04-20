module core {

    export type UIType = string | ComponentType | IComponent | { new (): IComponent };
    export enum ComponentType {
        None,
        Scene,
        Panel,
        Menu,
        Box,
        Guide,
        Tooltip
    }
    export function isInstance<T>(type: T): boolean {
        if (type.constructor != Object.constructor) {
            return true;
        }
        return false;
    }
    export function isType<T>(type: T): boolean {
        if (type.constructor == Object.constructor) {
            return true;
        }
        return false;
    }
    export interface ISeqBoxInfo {
        type:UIType;
        group:string;
        priority:number;
        index:number;
        args:any[];
        resolve?:any;
    }

    /**
     * 游戏UI界面控制器
     * 目前支持的容器(层级从下往上):场景层、公共UI层、面板层、菜单层、弹框层、新手引导层、浮动层
     */
    export class UI extends eui.UILayer {
        static SEQ_BOX_KEY:string = "__seq_box__";
        static SEQ_GROUP_KEY:string = "__seq_group__";
        static STACK_BOX_KEY:string = "__stack_box__";
        private _components: IComponent[] = [];

        private _tooltipLayer: eui.UILayer;
        private _guideLayer: eui.UILayer;
        private _boxLayer: eui.UILayer;
        private _commonLayer: eui.UILayer;
        private _panelLayer: eui.UILayer;
        private _menuLayer: eui.UILayer;
        private _sceneLayer: eui.UILayer;

        private _containerArr: eui.UILayer[];

        constructor() {
            super();

            this.touchEnabled = false;

            this._sceneLayer = new eui.UILayer();
            this._sceneLayer.touchEnabled = false;
            this.addChild(this._sceneLayer);

            this._commonLayer = new eui.UILayer();
            this._commonLayer.touchEnabled = false;
            this.addChild(this._commonLayer);

            this._panelLayer = new eui.UILayer();
            this._panelLayer.touchEnabled = false;
            this.addChild(this._panelLayer);

            this._menuLayer = new eui.UILayer();
            this._menuLayer.touchEnabled = false;
            this.addChild(this._menuLayer);

            this._boxLayer = new eui.UILayer();
            this._boxLayer.touchEnabled = false;
            this.addChild(this._boxLayer);

            this._guideLayer = new eui.UILayer();
            this._guideLayer.touchEnabled = false;
            this.addChild(this._guideLayer);

            this._tooltipLayer = new eui.UILayer();
            this._tooltipLayer.touchEnabled = false;
            this.addChild(this._tooltipLayer);

            this._containerArr = [this._sceneLayer, this._menuLayer, this._panelLayer, this._commonLayer, this._boxLayer, this._guideLayer, this._tooltipLayer];
        }

        openBox(type:UIType, args:any[]):core.IComponent {
            let component = this.addUI(type, ComponentType.Box, this._boxLayer, args);
            if (style.animation.box) {
                component.setAnimation(style.animation.box);
            }
            this.onEnter(component, args);
            return component;
        }

        addTooltip(type:UIType, args:any[]):IComponent {
            let component = this.addUI(type, ComponentType.Tooltip, this._tooltipLayer, args);
            this.onEnter(component, args);
            return component;
        }

        addGuide(type:UIType, args:any[]):IComponent {
            let component = this.addUI(type, ComponentType.Guide, this._guideLayer, args);
            this.onEnter(component, args);
            return component;
        }

        runScene(type:UIType, args:any[]):IComponent {
            let oldScene = this.getComponentByType(ComponentType.Scene);
            if (oldScene) {
                this.remove(oldScene);
            }

            let component = this.addUI(type, ComponentType.Scene, this._sceneLayer, args);
            if (style.animation.scene) {
                component.setAnimation(style.animation.scene);
            }
            this.onEnter(component, args);
            return component;
        }

        showPanel(type:UIType, args:any[]):IComponent {
            let component = this.addUI(type, ComponentType.Panel, this._panelLayer, args);
            if (style.animation.panel) {
                component.setAnimation(style.animation.panel);
            }
            this.onEnter(component, args);
            return component;
        }

        private addUI(type:UIType, compType:ComponentType, parent:eui.UILayer, args:any[]):IComponent {
            let component = this.createComponent(type);
            component.setCompType(compType);
            this._components.push(component);
            component.setArgs(args);
            parent.addChild(<any>component);
            return component
        }

        private createComponent(type: UIType): IComponent {
            let newInst:IComponent;
            if (is.string(type)) {
                let component = new BaseComponent();
                component.skinName = type;
                newInst = component;
            } else if (isInstance(type)) {
                newInst = <any>type;
            } else if (isType(type)) {
                let t:any = type;
                newInst = new t();
            }
            // newInst.setFull();
            return newInst;
        }

        private onEnter(component:IComponent, args:any[]):void {
            invokeHook(hooks.ui, 'onAdd', component);
            if (component.animation) {
                component.visible = true;
                if (component.stage) {
                    this.showAnimation(component, args);
                } else {
                    component.once(egret.Event.ADDED_TO_STAGE, () => {
                        this.showAnimation(component, args);
                    }, this);
                }
            } else {
                this.showAnimation(component, args);
            }
        }

        private showAnimation(component:IComponent, args:any[]):void {
            component.onEnter(...args);
            if (component.animation) {
                egret.callLater(() => {
                    component.animation.show(component, () => {});
                }, this);
            }
        }

        private getComponentByType(componentType:ComponentType):IComponent {
            for (let i = 0,len = this._components.length; i < len; i ++) {
                if (this._components[i].getCompType() == componentType) {
                    return this._components[i];
                }
            }
            return null;
        }
        get(type:UIType):IComponent[] {
            let r = [];
            for (let i = 0, len = this._components.length; i < len; i ++) {
                let component = this._components[i];
                if (this.compareType(type, component)) {
                    r.push(component);
                }
            }
            return r;
        }

        remove(type:UIType):boolean {
            let has = false;
            for (let i = this._components.length - 1; i >= 0; i --) {
                let component = this._components[i];
                if (this.compareType(type, component)) {
                    this._components.splice(i, 1);
                    let disObj:any = component;
                    this.onExit(component, true);
                    has = true;
                    //关掉序列栈里面的视图时，需要打开下一个视图
                    if (component[UI.SEQ_BOX_KEY] == true) {
                        this.checkSeqBox(component[UI.SEQ_GROUP_KEY]);
                    }
                    //关掉显示栈中视图时，返回上一个打开的视图
                    if (component[UI.STACK_BOX_KEY] === true) {
                        this.setStackBoxVisible(true);
                    }
                }
            }
            return has;
        }

        private compareType(type: UIType, component: IComponent): boolean {
            if (is.string(type)) {
                return component.name == type;
            } else if (is.number(type)) {
                return component.getCompType() == type;
            } else if (isInstance(type)) {
                return component == type;
            } else if (isType(type)) {
                return component.constructor == type;
            }
            return false;
        }

        private onExit(component:IComponent, forcerRemove:boolean):void {
            invokeHook(hooks.ui, 'onRemove', component);
            component.onExit();
            if (component.animation) {
                component.animation.hide(component, () => {
                    component.visible = false;
                    if (forcerRemove) {
                        display.removeFromParent(component);
                    }
                })
            } else {
                if (forcerRemove) {
                    display.removeFromParent(component);
                }
            }
        }

        private static SeqBoxIndex:number = 1;
        //string做索引
        private _seqBoxStack:{[key:string]:ISeqBoxInfo[]} = {};
        /**
         * 打开序列弹窗，默认组名normal为序列弹窗 -- 只有最优先的弹窗关闭后下一个弹窗才会打开
         * @param type ui类型
         * @param args 参数
         */
        openSeqBox(type:UIType,args:any[]):Promise<IComponent>{
            return this.openSeqBoxWithGroup('normal',type,0,args);
        }
        //分组打开弹窗,暂时只考虑一个组normal
        openSeqBoxWithGroup(group:string, type:UIType, priority:number, args:any[]):Promise<IComponent>{
            let obj : ISeqBoxInfo = {type,args,priority,group,index:UI.SeqBoxIndex++};
            let promise = new Promise<IComponent>((resolve,reject)=>{
                obj.resolve = resolve;
            });
            if(!this._seqBoxStack[group]){
                this._seqBoxStack[group] = [];
            }
            this._seqBoxStack[group].push(obj);
            this._seqBoxStack[group].sort((a,b)=>{
                if (a.priority == b.priority) {
                    return a.index - b.index;
                }
                return a.priority - b.priority;
            });
            if (group == "normal") {
                this.checkSeqBox(group);
            }
            return promise;
        }
        //TODO
        private _showGroupResolve:any = {};
        //检测序列弹窗
        private checkSeqBox(group:string) {
            //是否序列栈中有数据，并且舞台上没有是序列弹窗标识的视图，就添加最优先视图
            if(this._seqBoxStack[group] && this._seqBoxStack[group].length > 0 
                && !this.hasComponent2Key(UI.SEQ_GROUP_KEY,group,UI.SEQ_BOX_KEY,true)){
                let obj = this._seqBoxStack[group].shift();
                let ui = this.openBox(obj.type,obj.args);
                ui[UI.SEQ_BOX_KEY] = true;
                ui[UI.SEQ_GROUP_KEY] = obj.group;
                obj.resolve(ui);
            } else if (this._showGroupResolve.hasOwnProperty(group)) {
                this._showGroupResolve[group]();
                delete this._showGroupResolve[group];
            }
        }
        //额外手动打开序列栈视图
        showSeqBoxWithGroup(group:string) {
            return new Promise((resolve, reject) => {
                if (this._seqBoxStack[group] &&
                    this._seqBoxStack[group].length > 0) {
                    this._showGroupResolve[group] = resolve;
                    this.checkSeqBox(group);
                }
            });
        }

        //打开下一个栈视图，隐藏当前栈视图；关闭时再打开当前视图；返回的效果
        openStackBox(type: UIType, args: any[]):IComponent{
            this.setStackBoxVisible(false);
            let box = this.openBox(type, args);
            box[UI.STACK_BOX_KEY] = true;
            return box;
        }
        private setStackBoxVisible(visible):void{
            let boxLayer = this._boxLayer;
            let num = boxLayer.numChildren;
            let first = true;
            for (let i = num - 1; i >= 0; i --) {
                let box = boxLayer.getChildAt(i);
                if (box[UI.STACK_BOX_KEY] === true) {
                    if (visible) {
                        box.visible = first;
                        first = false;
                    } else {
                        box.visible = false;
                    }
                }
            }
        }

        //是否存在视图 双key
        private hasComponent2Key(key1:string,val1:any,key2:string,val2:any):boolean {
            for (let i = 0, len = this._components.length; i < len; i ++) {
                if (this._components[i][key1] == val1 && this._components[i][key2] == val2) {
                    return true;
                }
            }
            return false;
        }
        //是否存在视图
        private hasComponent(key:string,val:any):boolean {
            for (let i = 0, len = this._components.length; i < len; i ++) {
                if (this._components[i][key] == val) {
                    return true;
                }
            }
            return false;
        }

        clearBox():void {
            for (let i = this._components.length - 1; i >= 0; i --) {
                let component = this._components[i];
                if (component.getCompType() == ComponentType.Box) {
                    this.remove(component);
                }
            }
        }

        static clearBox():void {
            singleton(UI).clearBox();
        }

        static addGuide(type:UIType, args:any[]=[]):IComponent{
            return core.singleton(UI).addGuide(type,args);
        }
    }

}

