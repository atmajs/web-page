include 
	.load('overlay.mask::Template') 
	.css('overlay.less') //
	.done(function(resp){

		mask.registerHandler(':overlay', Compo({
			template: resp.load.Template,
			
			slots: {
				close: function(){
					this.hide();
				}
			},
	        onRenderStart: function(model, cntx, container){
	            // ..
	        },
	        onRenderEnd: function(elements, cntx, container){
	            // ..
	        },
			
			show: function(id, template){
				
				var $container = this.$.children('.-overlay-content'),
					$children = $container
						.children()
						.hide();
					
				
				var $div = $children.filter('[name="' + id + '"]');
				
				if ($div.length === 0) {
						
					var ctx = {},
						fragment = jmask(template)
							.attr('name', id)
							.render({}, ctx);
					
					
					$container
						.append(fragment);
					
					if (ctx.async) {
						compos.pageActivity.show();
						ctx.done(function(){
							compos.pageActivity.hide();
						});
					}
					
					
					$div = $(fragment);
				} else {
					
					$div.show();
				}
				
				this.animate('show');
				
			},
			
			hide: function(){
				this.animate('hide');
			}
		}));


	});
