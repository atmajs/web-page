include 
	.load('editor.mask::Template') 
	.js({ model: 'model' })
	.done(function(resp){

		mask.registerHandler(':editor', Compo({
			template: resp.load.Template,

			mode: 'server:all',
			
	        onRenderStart: function(model, ctx, container){
	            this.model = {};
				
				var id = ctx.page.query.id,
					that = this;
					
				
				if (ctx.req.method === 'POST') {
					
					var body = ctx.req.body;
					
					Compo.pause(this, ctx);
					
					if (body.btnSubmit) {
						this.upsert(id, body.text, function(message) {
							if (message) 
								that.model.message = message;
							
							Compo.resume(that, ctx);
						})
					}
					if (body.btnDelete) {
						this.remove(id, function(error){
							if (error) 
								that.model.message = error;
							else
								ctx.res.redirect('/');
							
							Compo.resume(that, ctx);
						});
					}
					return;
				}
				
				if (id) {
					Compo.pause(this, ctx);
					
					resp
						.model
						.Note
						.fetch({_id: id})
						.done(function(note){
							that.model = note;
							
							Compo.resume(that, ctx);
						});
				}
				
	        },
			
			upsert: function(id, text, callback){
				var note = new resp.model.Note({
					_id: id,
					text: text
				});
				
				var error = Class.validate(note);
				if (error) 
					return callback(error);
				
				note
					.save()
					.done(function(){
						callback('Saved!')
					})
					.fail(callback)
					;
			},
			
			remove: function(id, callback){
				
				new resp
					.model
					.Note({
						_id: id
					})
					.del()
					.done(function(){
						callback()
					})
					.fail(callback)
			}
		}));


	});
