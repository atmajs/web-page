
/**
 *	Todos List View
 */

include
	.load('todoList.mask')
	.js('todoTask/todoTask.js')
	.done(function (response) {
	'use strict';
	

	mask.registerHandler(':todoList', Compo({
		template: response.load.todoList,
		
		slots: {
			
			toggleAll: function (event) {

				this
					.model
					.each(function (task){
						task.completed = event.currentTarget.checked;
					})
					.save();
			},
			
			taskChanged: function (){
				this.model.save();
			},
			
			taskRemoved: function (event){
				this.model.del($(event.currentTarget).model());
			}
		}
	}));

});
