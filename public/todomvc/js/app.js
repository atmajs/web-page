"use strict";

include

	.routes({
		model: 'model/{0}.js',
		cntrl: 'cntrl/{0}.js',
		compo: 'compo/{0}/{1}.js'
	})
	
	.cfg('lockedToFolder', true)
	
	.js({
		// lib
		model: 'Tasks',
		cntrl: 'input',
		compo: ['todoList', 'filter']
	})
	
	.css('/css/cntrl.css')
	
	.ready(function (resp) {
	
		var tasks = resp.Tasks.fetch();
		
		mask.registerHandler(':app', Compo({
			template: '#layout',
			action: '',
			slots: {
				appAction: function(sender, action){
					this.action = action;
				},
				newTask: function(event, label){
					this.model.create(label);
				},
			
				removeAllCompleted: function () {
							
					jmask(this)
						.find(':todoTask')
						.each(function (task){
							if (task.model.completed) {
								task.remove();
							
								this.model.del(task.model);
							}
						}, this);
					
				}
			}
		}));
	
		window.app = Compo.initialize(':app', tasks, document.body);
	});
