include 
	.load('sourceViewer.mask::Template') 
	.css('sourceViewer.less') //
	.js('executor/executor.js')
	.js({
		'atma.compos': 'treeView'
	})
	.done(function(resp){

		mask.registerHandler(':sourceViewer', Compo({
			template: resp.load.Template,

			compos: {
				tree: 'compo: :treeView',
				tabs: 'compo: :tabs',
				executor: 'compo: :executor'
			},
			events: {
				'change: .-treeView-tree': function(event, sender, $node){
					var path = sender.getSelectedPath();
					
					this.compos.tabs.setActive(path);
				}
			},
			slots: {
				toggleCode: function(event){
					
					var visible = this.compos.executor.toggle();
					event.target.textContent = visible
						? 'Hide'
						: 'Run'
						;
				}
			},
	        onRenderStart: function(model, ctx, container){
				
				this.model = model;
				
	            if (this.attr.source) {
					this.model = {
						files: this
							.attr
							.source
							.trim()
							.split(/\s*,\s*/)
					};
				}
				
				this.model.execute = this.attr.execute;
				
	        },
	        onRenderEnd: function(elements, ctx, container){
				var path = this.compos.tree.getSelectedPath();
				
				this.compos.tabs.setActive(path);
	        }
		}));

		mask.registerUtil('langFromFile', function(key, model){
			var ext = model.substring(model.lastIndexOf('.') + 1);
			switch (ext) {
				case 'html':
					return 'markup';
				case 'css':
				case 'less':
					return 'css';
				case 'mask':
					return 'mask';
				
			}
			return 'javascript';
		});
		
	});
