include
    .css('spinner.less')
    .done(function() {
        
    var animation = {
        c1: 'transform | rotate(0deg) > rotate(360deg) | 9s linear',
        c2: 'transform | rotate(0deg) > rotate(-360deg) | 6s linear',
        c3: 'transform | rotate(0deg) > rotate(360deg) | 8s linear',
    }

    mask.registerHandler(':spinner', Compo({
        tagName: 'div',
        template: '._01;._02;._03',
        attr: {
            'class': '-spinner'
        },
        compos: {
            c1: '$: ._01',
            c2: '$: ._02',
            c3: '$: ._03'
        },
        
        onRenderEnd: function() {
            
            if (this.attr.autostart) 
                this.start();
        },
        
        start: function(){
            for (var key in animation) {
                var fn = restartDelegate(this, key);
                
                fn();
            }
        }
    }));
    
    
    function restartDelegate(spinner, key) {
        
        return function(){
            mask.animate(spinner.compos[key].get(0), animation[key], restartDelegate(spinner, key));   
        }
        
    }

});