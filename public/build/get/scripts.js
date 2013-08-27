(function() {
    mask.registerHandler(":view:get", Class({
        Base: mask.getHandler(":view:default"),
        Override: {
            section: function(route) {
                if ("download" === route.category) this.find(":downloader").initialize();
                this.super(route);
            },
            activate: function() {},
            deactivate: function() {}
        },
        load: function(tag) {},
        show: function(tag) {}
    }));
})();