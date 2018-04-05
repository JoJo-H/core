
module core {
    export interface IAttributeHost {
        updateAttribute(attribute:Attribute):void;
    }

    export class Attribute extends eui.Component {
        private _name:string;
        private _value:string;
        private _type:any;

        constructor() {
            super();
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.add, this);
        }

        get name():string {
            return this._name;
        }

        set name(value:string) {
            this._name = value;
        }

        get type():any {
            return this._type;
        }

        set type(value:any) {
            this._type = value;
        }

        get value():any {
            if (this._value == 'true' || this._value == 'false') {
                return this._value == 'true';
            }
            return this._value;
        }

        set value(value:any) {
            this._value = value;
            this.onUpdate();
        }

        onUpdate():void {
            if (this.parent && (<any>this.parent).updateAttribute) {
                var host:IAttributeHost = <any>this.parent;
                host.updateAttribute(this);
            }
        }

        add():void {
            this.onUpdate();
        }
    }
}