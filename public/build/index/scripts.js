include.pauseStack();

include.register({
    css: [ {
        id: "/public/view/index/index.less",
        url: "/public/view/index/index.less"
    } ],
    load: [ {
        id: "/public/view/index/index.mask",
        url: "/public/view/index/index.mask"
    }, {
        id: "/public/view/index/demos.mask",
        url: "/public/view/index/demos.mask"
    } ],
    js: [ {
        id: "/public/view/index/index.js",
        url: "/public/view/index/index.js"
    } ]
});

include.routes({
    "public": "/public/script/{0}.js",
    "public.compo": "/public/compo/{0}/{1}.js",
    atma: "/.reference/atma/{0}/lib/{1}.js",
    "atma.compos": "/.reference/atma/compos/{0}/lib/{1}.js",
    view: "/public/view/{0}/{1}.js"
});

include.setCurrent({
    id: "/public/view/index/index.js",
    namespace: "",
    url: "/public/view/index/index.js"
});

include.load("demos.mask").done(function(resp) {
    mask.registerHandler(":view:index", Class({
        Base: mask.getHandler(":view:default"),
        compos: {
            overlay: "compo: :overlay",
            tmpl: "compo: #demo-task-tracker"
        },
        slots: {
            demoTaskTracker: function() {
                this.compos.overlay.show("task-tracker", resp.load.demos);
            }
        },
        Override: {
            activate: function() {
                app.compos.navigation.blur();
            },
            deactivate: function() {}
        },
        resource: include,
        onRenderStart: function() {
            this.model = {
                family: [ {
                    id: "class",
                    caption: "Business Logic Layer",
                    description: "Class-model implementation with remote or local serialization/deserialization"
                }, {
                    id: "mask",
                    caption: "HMVC",
                    description: "Component-based templates with newer css/less alike syntax"
                }, {
                    id: "include",
                    caption: "Resource Loader",
                    description: "Loads components, moduls, styles, templates. Optimized for debugging, and compress for production"
                }, {
                    id: "utest",
                    caption: "Test Driven Development",
                    description: "Easily creats unit tests"
                }, {
                    id: "toolkit",
                    href: "atma-tool",
                    caption: "Development",
                    description: "Application builder, web server, live reload and much more"
                }, {
                    id: "animation",
                    href: "mask-animation",
                    caption: "CSS3 Animation Models",
                    description: "Not animatable properties could be included in the animation model"
                } ],
                destiny: [ {
                    device: "server",
                    list: [ "Server Application", "Web Page", "CMS", "Blog" ]
                }, {
                    device: "phone",
                    list: [ "Browser", "PhoneGap", "Widgets (iBook Author)" ]
                }, {
                    device: "laptop",
                    list: [ "Browser", "Node.Webkit" ]
                } ]
            };
        },
        load: function(tag) {},
        show: function(tag) {},
        onRenderEnd: function() {}
    }));
});

include.getResource("/public/view/index/index.js", "js").readystatechanged(3);

include.resumeStack();