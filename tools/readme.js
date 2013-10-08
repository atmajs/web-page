
var SOURCE = '../',
	TARGET = 'public/view/'

include.exports = {
	
	process: function(){
		var readmes = {
			'node/io/': 'atma-io/',
			'node/logger/': 'atma-logger/',
			'node/server/': 'atma-server/',
			'utest/' : 'utest/',
			'atma-tool/' : 'atma-tool/'
		};
		
		
		for(var key in readmes){
			
			var source = net.Uri.combine(SOURCE, key, 'README.md'),
				target = net.Uri.combine(TARGET, readmes[key], 'README.md');
				
			new io.File(source).copyTo(target);
		}
		
	}
	
};