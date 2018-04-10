
module core {
    export interface IUIAnimation {
        box?: IAnimation;
        panel?: IAnimation;
        scene?: IAnimation;
        button?: IAnimation;
    }
    export interface ITooltipStyle {
        skinName?: string;
        textColor?: number;
        textSize?: number;
        textFont?: string;
    }
    export interface IButtonStyle {
        tapLight?: boolean;
    }
    export interface IConfirmStyle {
        skinName?: string;
        yes?: string;
        no?: string;
        defaultShowClose?: boolean;
        title?: string;
    }
    export interface IStyle {
        animation: IUIAnimation;
        tooltip: ITooltipStyle;
        button: IButtonStyle;
        confirm: IConfirmStyle;
    }
    export var style: IStyle;
}