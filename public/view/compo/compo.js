include
	.load('tagApi.mask')
	.done(function(resp) {
	
	mask.render(resp.load.tagApi);
	
	var tags = {};
	
	function doSwitch($current, $next, $container) {

		$current.removeClass('active');
		$next.addClass('active');

		mask.animate($container.parent().get(0), {
			model: 'opacity | .3 > 1 | 300ms' 
		});

	}
	
	function load(tag, callback) {
		include
				.instance()
				.load('/public/view/compo/tags/' + tag + '/' + tag + '.mask::Template')
				.done(function(resp) {
					callback(resp.load.Template);
				});
	}

	mask.registerHandler(':view:compo', Class({
		Base: mask.getHandler(':view:default'),
		compos: {
			'$panel': '$: .tabPanel',
			'scroller': 'compo: scroller'
		},
		section: function(route) {
			
			
			var tag = route.category,
                item = tags[tag];

			if (item) {
				this.show(tag);
				item.update();
			} else {
				this.load(tag);
			}
		},
		showTab: function(tag){
			var item = tags[tag];

			if (item) {
				this.show(tag);
			} else {
				this.load(tag);
			}
		},
		onRenderStart: function(model, ctx){
			Compo.pause(this, ctx);
			
			var that = this,
				nodes = this.nodes;
			load(ctx.page.query.tab, function(template){
				
				jmask(nodes)
					.find('.tabPanel')
					.mask(template);
				
				Compo.resume(that, ctx);
			})
		},
		onRenderEndServer: function(elements){
			var $tag = elements[0].querySelector('.tagItem');
			
			$tag.attributes['class'] = 'active';
		},
		load: function(tag) {
			this
				.$
				.parent()
				.css('opacity', '.3')
				;
				
			var that = this,
				$container = this.compos.$panel;
				
			load(tag, function(template){
				
				jmask('div')
					.attr('data-tag', tag)
					.mask(template)
					.appendTo($container.get(0));
				
				tags[tag] = 1;
				that.show(tag);	
			});
		},
		show: function(tag) {

			var $current = this.compos.$panel.children('.active'),
				$next = this.compos.$panel.children('[data-tag=' + tag + ']');


			if ($current.length) {
				doSwitch($current, $next, this.$);
			} else {
				this.$.parent().css('opacity', '1');
				$next.addClass('active');
			}
			return;
		}
	}));

});
