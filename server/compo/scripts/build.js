var dir = '/public/build/';

include
	.load(
		'build.mask',
		net.Uri.combine(dir, 'pages.json')
	)
	
	.done(function(resp){
		
		
		include.exports = Compo({
			mode: 'server:all',
			template: resp.load.build,
			cache: {
				byProperty: 'ctx.page.id'
			},
			onRenderStart: function(model, ctx){
				
				var pageData = ctx.page.data,
					id = pageData.id,
					that = this;
					
				if (id === 'index') 
					id = '';
					
			
				
				this.model = {
					page: id
				};
				
				//Compo.pause(this, ctx);
				//
				//
				//include
				//	.load(net.Uri.combine(dir, id, 'load.html'))
				//	.done(function(resp){
				//		
				//		that.model.load = resp.load.load;
				//		
				//		
				//		Compo.resume(that, ctx);
				//	});
				
			}
		});	
	})
