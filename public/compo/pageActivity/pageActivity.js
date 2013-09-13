include
	.css('pageActivity.less')
	.done(function() {



	mask.registerHandler(':pageActivity', Compo({
		tagName: 'div',
		template: ':spinner speed=fast;',
		attr: {
			'class': '-pageActivity'
		},
		compos: {
			spinner: 'compo: :spinner'
		},
		constructor: function() {
			if (window.compos == null) {
				window.compos = {};
			}
			window.compos.pageActivity = this;
		},
		show: function() {
			this.$.show();
			//this.compos.spinner.start();
			return this;
		},
		hide: function() {
			this.$.hide();
			//this.compos.spinner.hide();
			return this;
		}
	}));

});
