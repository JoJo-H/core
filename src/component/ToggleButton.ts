
module core {
    export class ToggleButton extends eui.ToggleButton {
        private _data:any;
        get data():any {
            return this._data;
        }

        set data(value:any) {
            this._data = value;
        }

        private _notice:string;
        get notice():string {
            return this._notice;
        }

        set notice(value:string) {
            this._notice = value;
        }

        constructor() {
            super();
        }

        getButton(name:string) {
            if (this.name == name) {
                return this;
            }
        }

        protected getCurrentState():string {
            var state = this.skin.currentState;
            if (this.selected) {
                if (this.skin.hasState(state + 'AndSelected')) {
                    return state + 'AndSelected';
                }
            } else {
                if (state.indexOf('AndSelected') > -1) {
                    return state.replace('AndSelected', '');
                }
            }
            return super.getCurrentState();
        }

        protected buttonReleased():void {
            if (is.truthy(this._notice)) {
                var data = this.data;
                if (!data) {
                    var host = core.getHostComponent(this);
                    if (host) {
                        data = host.data;
                    }
                }
                core.sendNotification(this._notice,{ date:data ,host:host ,button:this });
            } else {
                super.buttonReleased();
                if (this.name) {
                    core.sendNotification(core.k.CLICK_BUTTON, this.name, this);
                }
            }
        }
    }
}