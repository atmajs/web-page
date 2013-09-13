include
    .js({
        bootstrap: 'dropdown'
    })
    .done(function() {
        
        // @reference viewer.mask for usage example
        
        mask.registerHandler(':bs:dropdown', Compo({
            
            onRenderStart: function(model, ctx, container){
                
                $(container)
                    .addClass('dropdown');
                
                jmask(this)
                    .children('a')
                    .attr({
                        'role': 'button',
                        'data-toggle': 'dropdown'
                    })
                    .end()
                    .end()
                    
                    .children('@select')
                    .tag('ul')
                    .addClass('dropdown-menu')
                    .attr('role', 'menu')
                    
                    .children()
                    .attr('role', 'menuitem')
                    .wrap('li;')
                    ;
                    
            },
            onRenderEnd: function(){
                
                this.$.filter('a').dropdown();
            }
        }));

    });