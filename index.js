

require('atma-libs/globals-dev');
require('atma-logger');
require('atma-io');
require('atma-server');


global.app = atma

	.server
	.Application()
	.done(function(app) {
		
		
		mask.cfg('allowCache', false);
	
		var connect = require('connect'),
			passport = require('passport'),
			redirect = require('connect-redirection'),
			port = 5777;
	
	
		connect()
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
		
		logger.log('Listen %s'.green.bold, port);
	});	


