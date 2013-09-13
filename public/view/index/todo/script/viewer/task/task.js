include 
	.load('task.mask::Template') 
	.css('task.less') 
	.done(function(resp){

		mask.registerHandler(':viewer:item', Compo({
			template: resp.load.Template,

			slots: {
                taskRemove: function(){
                    this.animate('task-remove');
                }
			}
		}));
	});
