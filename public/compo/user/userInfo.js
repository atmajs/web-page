
include
	.load('userInfo.mask')
	.done(function(resp){
		
	
		
	mask.registerHandler(':userInfo', Compo({
		
		template: resp.load.userInfo,
		
		onRenderStart: function(model, ctx){
			
			
			var user = ctx.req.user
			
			this.model = {	
				username: user && user.username
			};
		}
	}));
							 
});