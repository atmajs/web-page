include 
	.load('filter.mask::Template') 
	.done(function (resp){
	
		mask.registerHandler(':filter', Compo({
			template: resp.load.Template,
	
			onRenderStart: function () {
				ruta
					// (RutaJS) defaults router is the History API,
					// but for this example use hashes
					.setRouterType('hash')
					.add('/?:action', this.applyFilter.bind(this))
					;
					
				
				this.model = [{
					title: 'All',
					action: ''
				}, {
					title: 'Active',
					action: 'active'
				}, {
					title: 'Completed',
					action: 'completed'
				}];

				this.applyFilter(ruta.current());
			},
			
			applyFilter: function (current) {
	
				this.action = _updateSelected(current, this.model);
				this.emitOut('appAction', this.action);
			}
		}));
	
		
		function _updateSelected(route, filters) {
			var action = route.current.params.action || '';
	
			ruqq.arr.each(filters, function (filter) {
				filter.selected = action === filter.action ? 'selected' : '';
			});
			
			return action;
		}
	
	});
