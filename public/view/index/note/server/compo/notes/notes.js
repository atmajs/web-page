include 
	.load('notes.mask::Template') 
	.js({ model: 'model' })
	
	.done(function(resp){

		mask.registerHandler(':notes', Compo({
			template: resp.load.Template,
			
			mode: 'server:all',
			
	        onRenderStart: function(model, ctx, container){
				
				/*
				 * 'Pause' only this Mask.Node till mongodb response
				 */
				
				Compo.pause(this, ctx);
				
				var that = this;
				
	            this.model = {
					notes: resp
						.model
						.Notes
						.fetch()
						.done(function(){
							
							Compo.resume(that, ctx);
						})
				};
	        }
		}));


	});
