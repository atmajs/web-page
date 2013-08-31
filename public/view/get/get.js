(function() {

	
	mask.registerHandler(':view:get', Class({
		Base: mask.getHandler(':view:default'),
		
		Override: {
			showTab: function(name) {
				if (name === 'download') 
					this.find(':downloader').initialize();
				
				this.super(name);
			},
			
			activate: function(){
				
				//window.compos.menu.blur();
			},
			
			deactivate: function(){
				
				//window.compos.menu.focus();
			}
		},
		load: function(tag) {
		
		},
		show: function(tag) {
			//window.compos.menu.blur();
		}
	}));


}());
