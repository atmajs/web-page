(function() {

	
	mask.registerHandler(':view:index', Class({
		Base: mask.getHandler(':view:default'),
		
		Override: {
			
			activate: function(){
				
				app.compos.navigation.blur();
			},
			
			deactivate: function(){
				
				//app.compos.navigation.focus();
			}
		},
		
		onRenderStart: function(){
			
			this.model = {
				family: [{
					id: 'class',
					caption: 'Business Logic Layer',
					description: 'Class-model implementation with remote or local serialization/deserialization'
				},{
					id: 'mask',
					caption: 'HMVC',
					description: 'Component-based templates with newer css/less alike syntax'
				},{
					id: 'include',
					caption: 'Resource Loader',
					description: 'Loads components, moduls, styles, templates. Optimized for debugging, and compress for production'
				},{
					id: 'utest',
					caption: 'Test Driven Development',
					description: 'Easily creats unit tests'
				},{
					id: 'toolkit',
					caption: 'Development',
					description: 'Application builder, web server, live reload and much more'
				},{
					id: 'animation',
					caption: 'CSS3 Animation Models',
					description: 'Not animatable properties could be included in the animation model'
				}],
				
				destiny: [
					{
						device: 'server',
						list: [
							'Server Application',
							'Web Page',
							'CMS',
							'Blog'
						]
					},
					{
						device: 'phone',
						list: [
							'Browser',
							'PhoneGap',
							'Widgets (iBook Author)'
						]
					},{
						device: 'laptop',
						list: [
							'Browser',
							'Node.Webkit'
						]
					}
				]
			};
			
		},
		
		load: function(tag) {
		
		},
		show: function(tag) {
			//window.compos.menu.blur();
		}
	}));


}());
