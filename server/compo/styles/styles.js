
var	isDebugMode = app.args.debug || app.config.app.debug;
	


mask.registerHandler(':styles', Style);

function Style() {}

var T = "% each='.' > link type='text/css' rel='stylesheet' href='~[.]';";

Style.prototype = {
	mode: 'server:all',
	nodes: mask.parse(T),
	renderStart: function(model, ctx){
		
		if (isDebugMode) {
			this.model = ctx.page.getStyles();
			return;
		}
		
		
		
		var pageData = ctx.page.data,
			id = pageData.id,
			data = app.config.build[id],
			version = app.config.buildVersion;
			
		this.model = ['/public/build/styles.css?v=' + version];
		
		if (data.styles) {
			this
				.model
				.push('/public/build/' + id  + '/styles.css?v=' + version);
		}
		
		
	}
};