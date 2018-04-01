
module core {

    export interface IMediator
	{
		getMediatorName():string;
		listNotificationInterests( ):string[];
		handleNotification( notification:INotification ):void;
		onRegister():void;
		onRemove():void;
    }
    
    export class Mediator implements IMediator
	{
		/**
		 * The name of the <code>Mediator</code>.
		 */
		mediatorName:string = null;
		constructor( mediatorName:string=null)
		{
			this.mediatorName = (mediatorName != null) ? mediatorName : Mediator.NAME;
		}

		getMediatorName():string
		{	
			return this.mediatorName;
		}

		/**
		 * List the <code>INotification</code> names this <code>IMediator</code> is interested in
		 * being notified of.
		 * @return The list of notifications names in which is interested the <code>Mediator</code>.
		 */
		listNotificationInterests():string[]
		{
			return [];
		}

		/**
		 * Handle <code>INotification</code>s.
		 * Typically this will be handled in a switch statement, with one 'case' entry per
		 * <code>INotification</code> the <code>Mediator</code> is interested in.
		 * @param notification The notification instance to be handled.
		 */ 
		handleNotification( notification:INotification ):void
		{

		}

		/**
		 * Called by the View when the Mediator is registered. This method has to be overridden
		 * by the subclass to know when the instance is registered.
		 */ 
		onRegister():void
		{

		}

		/**
		 * Called by the View when the Mediator is removed. This method has to be overridden
		 * by the subclass to know when the instance is removed.
		 */ 
		onRemove():void
		{

		}

		/**
		 * Default name of the <code>Mediator</code>.
		 * @constant
		 */
		static NAME:string = 'Mediator';
    }
    
}