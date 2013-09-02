
include.exports = atma.server.HttpPage({
    
    onRenderStart: function(req, res){
        
        
        var remoteAddress = req.connection.remoteAddress;
        
        if (remoteAddress == null) {
            // iisnode
            remoteAddress = req
                .headers['x-forwarded-for']
                .replace(/:.+/, '');
        }
        
        
        if (req.method === 'POST'
            && (
                remoteAddress === '127.0.0.1'
                || /^204\.232\.175\./.test(remoteAddress)
                || /^192\.30\.252\./.test(remoteAddress)
            )) {
            
        
            logger.log('<page:fetch> Update');
            require('child_process')
                .exec('tools\\fetch.bat', function(error, stdout, stderror){
                    
                    error =  (error || stderror).toString();
                    if (error) {
                        logger.error('<page:fetch> failed', error);
                        return;
                    }
                    logger.log('<page:fetch> completed'.bold.green);
                });
        
            return;
        }
        
        logger.error('<page:fetch> Access denied [%s] %s', req.method, remoteAddress);
            
        this.ctx.rewrite = '/error/401';
    }
});