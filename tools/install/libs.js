include
	.load('libs.yml')
	.done(function(resp){
		
		var libs = {};
		for (var key in resp.load.libs) {
			libs['../' + key] = 'public/libs/' + resp.load.libs[key];
		}
		
		
		
		include.exports = {
			process: function(config, done){
				
				app
					.run([
						{
							action: 'copy',
							files: libs
						},
						{
							action: 'custom',
							script: {
								process: libs_minify
							}
						}
					]);
			}
		};
		
		
		function libs_isCopied(filename, paths) {
			filename = filename.toLowerCase();
			
			return ruqq.arr.any(paths, function(x){
				return x.substring(x.length - filename.length).toLowerCase() === filename;
			});
		}
		
		function libs_minify(config, done) {
			var copied = Object.keys(libs),
				files = new io.Directory('public/libs/').readFiles('*/**.js').files;
			
			files = files.filter(function(file){
				if (~file.uri.file.indexOf('.min.')){
					return false;
				}
				
				var _file = file.uri.file.replace('.js', '.min.js');
				
				
				return !libs_isCopied(_file, copied);
			});
			
			global.test = true;
			files.forEach(function(file){
				file.read();
				
				logger.log('> minify: ', file.uri.file.green);
				
				io
					.File
					.middleware
					.uglify(file, { minify: true });
				
				file.uri.file = file.uri.file.replace('.js', '.min.js');
				file.write(file.content);
			});
		}
	
	});