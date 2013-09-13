include 
	.load('editor.mask::Template') 
	.done(function(resp){

		mask.registerHandler(':task:editor', Compo({
			template: resp.load.Template,

			slots: {
				taskSave: function(){
					// override additional arguments of the signal
					// @see main.js (App.slots.taskSave)
					return [this.model.task];
				}
			},
	        onRenderStart: function(model, cntx, container){
	            this.model = {
					task: new Task,
					timings: model.timings
				};
	        },
	        
			edit: function(task){
				
				this.model.task = task;
			}
		}));


	});
