include.register({
    load: [ {
        id: "/public/view/get/get.mask",
        url: "/public/view/get/get.mask"
    } ],
    js: [ {
        id: "/public/view/get/get.js",
        url: "/public/view/get/get.js"
    } ]
});

include.routes({
    "public": "/public/script/{0}.js",
    "public.compo": "/public/compo/{0}/{1}.js",
    atma: "/.reference/libjs/{0}/lib/{1}.js",
    "atma.compos": "/.reference/libjs/compos/{0}/lib/{1}.js",
    view: "/public/view/{0}/{1}.js"
});

(function() {
    mask.registerHandler(":view:get", Class({
        Base: mask.getHandler(":view:default"),
        Override: {
            showTab: function(name) {
                if ("download" === name) this.find(":downloader").initialize();
                this.super(name);
            },
            activate: function() {},
            deactivate: function() {}
        },
        load: function(tag) {},
        show: function(tag) {}
    }));
})();