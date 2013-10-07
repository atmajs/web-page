/*
 *	Role -
 *		Task Create/Edit
 *
 *	Public events -
 *		cancel: input interrupted
 *		enter : input succefully validated and completed
 */

include
	.js({
		model: 'Tasks'
	})
	.done(function (response){

	var key_ENTER = 13;
	var key_ESCAPE = 27;
	var Task = response.Tasks.Task;
	
	mask.registerHandler('todo:input', Compo({
		tagName: 'input',
		attr: {
			type: 'text',
			value: '~[label]'
		},
		events: {
			'keydown': function(event){
				
				switch (event.which) {
					case key_ENTER:
						var value = this.format();
						
						var result = this.compos.validator.validate(value);
						if (result === false){
							return;
						}
						
						
						this.$.trigger('enter', value);
						this.afterEdit();
						return;
					case key_ESCAPE:
						this.cancel();
						return;
				}
			},
			'blur': 'cancel'
		},
		compos: {
			validator: 'compo: input:validate'
		},
		onRenderStart: function(model){
			if (model instanceof Task === false) {
				this.model = new Task;
			}
			
			jmask(this).prepend('input:validate value=label');
		},
		
		onRenderEnd: function(){
			this.compos.validator.before = this.format;
		},
		
		format: function(str){
			return (str || this.$.val()).trim();
		},
		
		focus: function(){
			this.$.focus();
		},
		
		cancel: function(){
			this.$.trigger('cancel');
			this.afterEdit();
		},
		
		afterEdit: function(){
			this.$.val(this.attr.preserve ? this.model.label : '');
		}
		
	}));
	
	
	mask.registerHandler('input:validate', Class({
		Base: mask.getHandler(':validate'),
		Override: {
			notifyInvalid: function(){
				
				var $element = this.super(arguments);
				
				mask.animate($element.get(0), {
					
					model: {
						model: ['display | > block',
								'opacity | 0 > 1 | 200ms ease-out',
								'transform | translateY(-20px) > translateY(0px) | 200ms ease-in',
								],
						next: {
							model: 'transform | translateY(0px) > translateY(-50px) | 1s ease-in',
							next: 'opacity | 1 > 0 | 500ms'
						}
					},
					next: {
						model: 'display | > none '
					}
					
				});
				
			}
		}
	}))
	
});
