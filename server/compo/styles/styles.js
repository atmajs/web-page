
var	isDebugMode = app.args.debug || app.config.app.debug;
	
function Style() {}

mask.registerHandler(':styles', Style);


var T = "% each='.' > link type='text/css' rel='stylesheet' href='~[.]';";

Style.prototype = {
	mode: 'server:all',
	nodes: mask.parse(T),
	renderStart: function(model, ctx){
		
		if (isDebugMode) {
			this.model = ctx.page.getStyles(app.config.env);
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
};