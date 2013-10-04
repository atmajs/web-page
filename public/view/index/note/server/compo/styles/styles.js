
var	isDebugMode = app.args.debug || app.config.app.debug;
	
	
mask.registerHandler(':styles', Compo({
	mode: 'server:all',
	template: "% each='.' > link type='text/css' rel='stylesheet' href='~[.]';",
	
	cache: {
		byProperty: 'ctx.req.url'
	},
	
	onRenderStart: function(model, ctx){
		
		if (isDebugMode) {
			this.model = ctx.page.getStyles();
			return;
		}
		
		this.model = ['/public/build/styles.css'];
		
		var pageData = ctx.page.data,
			id = pageData.id,
			data = app.config.build[id];
			
					
		if (data.styles) {
			this
				.model
				.push('/public/build/' + id  + '/styles.css');
		}
		
		
	}
}));
