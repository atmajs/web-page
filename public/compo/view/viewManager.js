(function() {

	var Helper = {
		doSwitch: function($current, $next, callback) {
			$current.removeClass('active');
			$next.addClass('active');

			
			mask.animate($next.get(0), 'opacity | 0 > 1 | 500ms cubic-bezier(.58,1.54,.59,.75)')
			
		}
	};
	
	var currentCompo;

	
	function load_View(data, callback) {
		
		var controllerName = view_getController(data),
			viewName = view_getView(data),
			styleName = view_getStyle(data),
			
			view,
			controller,
			style;
		
		
		if (controllerName !== 'default') {
			controller = '/public/view/'
				+ viewName
				+ '/'
				+ controllerName
				+ '.js';
		}
		
		if (styleName) {
			controller = '/public/view/'
				+ viewName
				+ '/'
				+ styleName
				+ '.less';
		}
		
		view = '/public/view/'
			+ viewName
			+ '/'
			+ viewName
			+ '.mask::View';
		
		
		include
			.instance()
			.load(view)
			.js(controller)
			.css(style)
			.done(function(resp){
			
				callback(viewName, controllerName, resp.load.View);
			});
	}
	
	function view_getView(pageData) {
	
		return pageData.view == null
			? pageData.id
			: pageData.view.template || pageData.view.id || pageData.id || 'index';
	}
	
	function view_getController(pageData) {
		
		return pageData.view && pageData.view.controller
			? pageData.view.controller
			: 'default';
	}
	
	function view_getStyle(pageData) {
		return pageData.view && pageData.view.style;
	}
	

	var ViewManager = Compo({
		
		tagName: 'div',
		attr: {
			id: 'views'
		},
		
		constructor: function(){
			if (typeof window === 'undefined') 
				return;
			
			this.show = this.show.bind(this);
		},
		
		renderStart: function(model, cntx) {
			this.model = app.config.pages;
			
			if (cntx.page) {
				// render
				var that = this;
				
				Compo.pause(this, cntx);
				
				load_View(cntx.page.data, function(viewId, controller, template){
					
					that.nodes = jmask(':view:' + controller)
							.attr('id', viewId)
							.mask(template);
					
					
					
					Compo.resume(that, cntx);
				});
			}
		},
		onRenderEnd: function(){
			var that = this,
				pages = new ruta.Collection;
				
			if (this.model == null) {
				console.error('[:viewManager] page data not defined');
				debugger;
			}
			
			for (var path in this.model) {
				pages.add(path, this.model[path]);
			}
			
			app.compos.viewManager = that;
			
			ruta.add('/?:page/?:tab/?:section', function(route){
				var path = route.current.path,
					page = pages.get(path);
				
				page = page && page.value;
				
				if (page == null) 
					return;
				
				that.show(route.current.params, page);
				
			});
			
			currentCompo = this.components[0];
		},
		
		
		load: function(data, page) {

			var activity = window.app.find(':pageActivity').show();

			load_View(page, function(viewId, controller, template){

				var compoName = ':view:' + controller,
					T = compoName
						+'#'
						+ viewId
						+ '{'
						+ template
						+ '}';

				this.append(T);
				
				activity.hide();


				var compo = this.find('#' + viewId);
				
				
				if (compo == null) {
					console.error('Cannt be loaded', compoName);
					return;
				}
				

				this.performShow(compo, data, page);
			}.bind(this));

		},
		show: function(data, page) {
			
			var $menu = $(document.getElementsByTagName('menu'));

			$menu
				.find('.selected')
				.removeClass('selected')
				.end()
				.find('[data-view="' + page.id + '"]')
				.addClass('selected');

			
			var viewID = page.view && page.view.id || page.id;
			
			var compo = this.find('#' + viewID);
			
			if (compo == null) {
				this
					.$
					.children('.active')
					.removeClass('active');
					
				this.load(data, page);
				return;
			}

			this.performShow(compo, data, page);
		},
		performShow: function(compo, params, page) {
			
			
			compo.tab(params);

			if (compo === currentCompo) 
				return;
			
			
			if (currentCompo)
				currentCompo.deactivate && currentCompo.deactivate();
			
			

			

			if (this.$) 
				Helper.doSwitch(currentCompo.$, compo.$);
			

			if (compo.activate)
				compo.activate();
	
			currentCompo = compo;
			
			if (page.title)
				document.title = page.title;
			
		}
	});

	mask.registerHandler(':viewManager', ViewManager);

}());
