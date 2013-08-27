
include.exports = Class({
	Extends: atma.server.IHttpHandler,
	
	//match: /\.less/,
	
	process: function(req, res, callback){
		
		var path = req.url,
			that = this;
		
		var scripts = app
			.config
			.page
			.getScripts(req.query.page);
	
		that.resolve(scripts.join('\n'), 200, 'text/javascript');
		
		
		return this;
	}
});


function build(scripts, idfr) {
	var builder = require('atma/builder');
	
	builder.build(scripts, function(js){
		idfr.resolve(js, 200, 'text/javascript');
	});;
}