
module core {
    export class ProgressBar extends eui.ProgressBar {
        private _data:any;
        get data():any {
            return this._data;
        }

        set data(value:any) {
            this._data = value;
            eui.PropertyEvent.dispatchPropertyEvent(this, eui.PropertyEvent.PROPERTY_CHANGE, "data");
        }
    }
}