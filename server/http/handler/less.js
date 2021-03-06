
include.exports = Class({
	Extends: atma.server.IHttpHandler,
	
	match: /\.less/,
	
	process: function(req, res, callback){
		
		var path = req.url,
			that = this;
		
		
		include
			.instance()
			.load(path + '::Less')
			.done(function(resp){
				
				that.resolve(resp.load && resp.load.Less || '<error> view log', 200, 'text/css');
			});
		
		return this;
	}
});