include
	.load('mask.example::Examples')
	.done(function(resp) {

	var Default = mask.getHandler(':view:default');
	
	
	mask.registerHandler(':view:mask', Class({
		Base: Default,
		
		compos : {
			tabsexamples: 'compo: #tabs-examples',
			tabssyntax: 'compo: #tabs-syntax',
		},
		
		slots: {
			runExample: function(event){
				
				var $button = $(event.currentTarget),
					$ex = $button.closest('.example'),
					template = $ex
						.children('.template')
						.text(),
					javascript  = $ex
						.children('.javascript')
						.text();
					
				var result;
					
				try {
					result = eval(javascript);
				} catch(error) {
					alert(error);
				}
			
				$ex
					.children('.result')
					.append(result);
				
				
				$button.remove();
			}
		},
		
		Override: {
			onRenderStart: function(){
				
				var examples = resp.load.Examples;
				
				
				this.model = {
					examples: examples,
					sideMenu: [{
						name: 'examples',
						route: '/-/examples/simple',
						list: ruqq.arr.select(examples, ['name', 'title'])
					}]
				}
				
				this.super();
			}
		}
	}));
	
});
