
/**
 *	Role -
 *		Single Task Representation __ View / Edit
 *
 *	Public signals -
 *		taskChanged: Task State/Description was changed
 *		taskRemoved: Task was removed
 *		
 */

include
	.load('todoTask.mask')
	.done(function (response) {
	'use strict';

	var state_VIEW = '';
	var state_EDIT = 'editing';
	
	mask.registerHandler(':todoTask', Compo({
		template: response.load.todoTask,
		state: state_VIEW,
		
		slots: {
			inputCanceled: 'editEnd',
			
			taskChanged: 'editEnd',
			taskRemoved: function (){
				this.animate('remove', this.remove.bind(this));
			},
			
			edit: function (){
				this.state = state_EDIT;
				this.compos.input.focus();
				
				return false;
			}
			
		},
		compos: {
			input: 'compo: todo:input'
		},
		
		editEnd: function (){
			this.state = state_VIEW;
		},

		isVisible: function(completed, action){
			if ('completed' === action && !completed) {
				return false;
			}
	
			if ('active' === action && completed) {
				return false;
			}
	
			return true;
		}
	}));


});
