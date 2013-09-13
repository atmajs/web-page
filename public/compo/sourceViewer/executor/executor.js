include 
	.load('executor.mask::Template') 
	.css('executor.less') //
	.done(function(resp){

		mask.registerHandler(':executor', Compo({
			template: resp.load.Template,

			show: function(){
				this.$.addClass('__show');
			},
			hide: function(){
				this.$.removeClass('__show');
			},
			toggle: function(){
				return this
					.$
					.toggleClass('__show')
					.hasClass('__show');
			},
	        onRenderStart: function(model, cntx, container){
	            // ..
	        },
	        onRenderEnd: function(elements, cntx, container){
	            // ..
	        }
		}));


	});
