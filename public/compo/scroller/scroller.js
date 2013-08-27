(function() {
	
		mask.registerHandler(':scroller', Compo({
			renderStart: function(model, container, cntx) {
				this.animateDismiss = 0;

				jmask(this)
					.tag('div') 
					.addClass('scroller') 
					.children() 
					.wrapAll('.scroller-container');

			},
			
			
			
			onRenderEnd: function() {
				var that = this;
				

				this.scroller = {
					refresh: function() {
						
						that.inserted = true;

						var dfr = that.deferred;
						
						that.deferred = null;
						
						if (dfr) {
							var fn = dfr[0],
								args = dfr[1];

							setTimeout(function(){
								that.scroller[fn].apply(that, args);
							},0);
						}
						
						
					},
					scrollToElement: function(element) {
												
						//if (that.inserted !== true) {
						//	that.deferred = ['scrollToElement', [element]];
						//	return;
						//}
						
						var scrollTo = $(element),
							container = that.$,
							scrollTop = scrollTo.offset().top
								- container.offset().top
								+ container.scrollTop()
								+ (that.attr.dtop << 0);
							
						container.scrollTop(scrollTop);
					},
					scrollTo: function(x, y) {

						that.animateDismiss = 1;
						that.$.scrollTop(y);
						that.$.scrollLeft(x);
					}
				}
			}
		}));
}());
