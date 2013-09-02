// Atma.js )

require('atma-libs/globals-dev');


mask.cfg('allowCache', false);

require('atma-logger');
require('atma-io');
require('atma-server');


global.app = atma

	.server
	.Application()
	.done(function(app) {
		
	
		var connect = require('connect'),
			passport = require('passport'),
			redirect = require('connect-redirection'),
			port = process.env.PORT || 5777;
	
	
		var server = connect()
			.use(connect.favicon())
			
			.use(connect.query())
			.use(connect.cookieParser())
			.use(connect.session({ secret: 'ksdADw92laxda932mdsjAK83nD9' }))
			.use(redirect())
			.use(passport.initialize())
			.use(passport.session())
			.use(app.responder())
			.use(connect.static(__dirname))
			.listen(port);
		
		
		if (app.args.debug) {
			app.autoreload(server);
		}
		
		logger.log('Listen %s'.green.bold, port);
	});	


