include 
	.load('viewer.mask::Template') 
	.css('viewer.less')
	.js('task/task.js', 'Settings.js')
	.done(function(resp){

		mask.registerHandler(':task:viewer', Compo({
			settings: resp.Settings.fetch(),
			template: resp.load.Template,
			
			slots: {
				taskEdit: function(event){
					this.applyFilter();
					
					var task = $(event.currentTarget).model();
					return [task];
				}
			},
			
			events: {
				'click: .dropdown-menu > li > a': function(event){
					var value = event.target.textContent;
				
					if (value === 'none') 
						value = 'select';
					
					this.settings.time = value;
				}
			},
			
	        onRenderStart: function(model, cntx, container){
				
				this.model = {
					settings: this.settings,
					tasks: model.tasks,
					timings: model.timings
				};
	        },
	        
			applyFilter: function(){
				
				var time = Task.parseTime(this.settings.time),
					timeSort = this.settings.sort.time;
				
				this
					.model
					.tasks
					.each(function(task){
						task._hidden = time < task.getRemainingMinutes();
						
					})
					.sort(function(a, b){
						if (a._hidden && b._hidden === false) 
							return 1;
						
						if (a._hidden === false && b._hidden) 
							return -1;
						
						var aTime = a.getRemainingMinutes(),
							bTime = b.getRemainingMinutes();
						
						if (aTime === bTime) 
							return 0
						
						var index = aTime > bTime ? 1 : -1;
						
						return timeSort === 'asc'
							? index
							: -index;
					});
				
				this.settings.save();
			}
		}));

		

		mask.registerUtil('formatTime', function(key, model){
			
			return Task.formatTime(model);
		});
		
	});
