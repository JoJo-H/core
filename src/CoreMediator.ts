///<reference path="mvc/Mediator.ts" />
module core {
    
    export class CoreMediator extends core.Mediator implements IMediator{
        static NAME:string = 'CoreMediator';
        constructor()
		{
            super(CoreMediator.NAME);
		}

		listNotificationInterests():string[]
		{
            let arr = [RequestNotice.REQUEST_FAIL,RequestNotice.RESPONSE_ERROR,
                RequestNotice.RESPONSE_SUCCEED,RequestNotice.TIME_OUT];
			return arr.concat(super.listNotificationInterests());
		}

		handleNotification( notification:INotification ):void
		{
            switch(notification.getName()) {
                case RequestNotice.REQUEST_FAIL:
                    break;
                case RequestNotice.RESPONSE_ERROR:
                    break;
                case RequestNotice.RESPONSE_SUCCEED:
                    break;
                case RequestNotice.TIME_OUT:
                    break;
            }
		}

		onRegister():void
		{

        }
        
        onRemove():void
		{

		}
    }
}