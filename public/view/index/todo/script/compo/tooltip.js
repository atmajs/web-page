include
    .js({
        bootstrap: 'tooltip'
    })
    .done(function() {
        
        mask.registerAttrHandler('x-tooltip', function(node, attrValue, model, ctx, tag){
            
            $(tag)
                .attr('title', attrValue)
                .tooltip();
        });

    });