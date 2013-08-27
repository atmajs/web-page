
require('atma-server');

var Builder,
	Stats = {};

include
	.js({
		atma: 'builder'
	})
	
	.done(function(resp){
		
		Builder = resp.builder;
		
		include
			.cfg({
				path: 'file:///' + process.cwd().replace(/\\/g, '/') + '/'
			})
			
			initialize();
			
	});
	
	
function initialize() {
	
	
	
	atma
		.server
		.Application()
		.done(function(app) {
			
			var cfg = app.config,
				include = cfg.page.getInclude(),
				scripts = cfg.page.getScripts(),
				styles = cfg.page.getStyles();
				
			
			
			tasks = new BuildTaskCollection();
			
			tasks.push({
				resources: arr_combine(
					res(include.src),
					res({ content: incl_toCode(include) }),
					res(scripts),
					res(styles, 'css')
				),
				
				config: {
					outputSources: 'public/build/',
					outputMain: 'public/build/script.js'
				},
				
				id: '/'
			});
			
			
			var pages = cfg.pages;
			
			for (var id in pages) {
				scripts = cfg
					.page
					.getScriptsForPageOnly(id) || [];
				styles = cfg
					.page
					.getStylesForPageOnly(id) || [];
					
				include = cfg
					.page
					.getIncludeForPageOnly(id);
				
				
				if (!(scripts.length || styles.length)) 
					continue;
				
				tasks.push({
					resources: arr_combine(
						res({content: incl_toCode(include)}),
						res(scripts),
						res(styles, 'css')
					),
					config: {
						outputSources: 'public/build/' + id + '/',
						outputMain: 'public/build/' + id + '/script.js'
					},
					id: id
				});
				
			}
			
			tasks
				.process()
				.done(function(){
					
					new io
						.File('public/build/stats.json')
						.write(JSON.stringify(Stats, null, 4));
					
					console.log('DONE'.green.bold);
				})
			
		});
	
}

var BuildTask = Class({
	Extends: Class.Deferred,
	Construct: function(data) {
		this.resources = data.resources;
		this.config = data.config;
		this.id = data.id;
		
	},
	process: function(){
		new(Builder)()
			.process(this.resources, this.config)
			.done(this.complete);
	},
	Self: {
		complete: function(solution){
			
			var output = this.config.outputSources,
				path_scripts = net.Uri.combine(output, 'scripts.js'),
				path_styles = net.Uri.combine(output, 'styles.css'),
				path_load = net.Uri.combine(output, 'load.html');
				
			var js = solution.output.js;
			if (js){
				new io
					.File(path_scripts)
					.write(js);
			}
			
			var css = solution.output.css;
			if (css){
				new io
					.File(path_styles)
					.write(css);
			}
			
			var load = solution.output.load,
				lazy = solution.output.lazy;
			if (lazy || load){
				new io
					.File(path_load)
					.write((load || '') + (lazy || ''));
			}
					
			
			Stats[this.id] = {
				scripts: !!js,
				styles : !!css,
				load   : !!(load || lazy)
			};
			
			this.resolve();
		}
	}
});
	
var BuildTaskCollection = Class.Collection(BuildTask, {
	Extends: Class.Deferred,
	Construct: function(){
		this.index = -1
	},
	Self:{
		process: function(){
			if (++this.index > this.length - 1) {
				this.resolve();
				return;
			}
			
			console.log('Processing %d/%d', this.index + 1, this.length);
			this[this.index]
				.done(this.complete)
				.process();
				
			return this;
		},
		complete: function(){
			
			this.process();
		}
	}
});


function incl_toCode(include) {
	var str = 'include';
	
	if (include.cfg) {
		str += '.cfg('
			+ JSON.stringify(include.cfg)
			+ ')';
	}
	
	if (include.routes) {
		str += '.routes('
			+ JSON.stringify(include.routes)
			+ ')';
	}
	
	return str === 'include'
		? ''
		: str + ';';
}

function arr_combine() {
	var array = [],
		args = arguments,
		imax = args.length,
		i = 0,
		x;
	
	for (; i < imax; i++) {
		x = args[i];
		if (x == null) 
			continue;
		
		if (typeof x === 'object' && typeof x.length === 'number') {
			array = array.concat(x);
			continue;
		}
		
		array.push(x);
	}
	
	return array;
}

function res(mix, type) {
	if (type == null) 
		type = 'js';
		
	if (typeof mix === 'string') {
		return {
			url: mix,
			type: type
		};
	}
	
	if (mix.forEach) {
		mix.forEach(function(x, index){
			mix[index] = res(x, type);
		});
		
		return mix;
	}
	
	mix.type = type;
	
	return mix;
}
