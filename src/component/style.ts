
module core {
    interface IUIAnimation {
        box?: IAnimation;
        panel?: IAnimation;
        scene?: IAnimation;
        button?: IAnimation;
    }
    interface ITooltipStyle {
        skinName?: string;
        textColor?: number;
        textSize?: number;
        textFont?: string;
    }
    interface IButtonStyle {
        tapLight?: boolean;
    }
    interface IConfirmStyle {
        skinName?: string;
        yes?: string;
        no?: string;
        defaultShowClose?: boolean;
        title?: string;
    }
    interface IStyle {
        animation: IUIAnimation;
        tooltip: ITooltipStyle;
        button: IButtonStyle;
        confirm: IConfirmStyle;
    }
    var style: IStyle;
}