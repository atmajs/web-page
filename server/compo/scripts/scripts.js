
var handler = app.args.debug
	? './dev.js'
	: './build.js';


include
	.js(handler + '::Handler')
	.done(function(resp){
		
		mask.registerHandler(':scripts', resp.Handler);
		
		
	});
	
