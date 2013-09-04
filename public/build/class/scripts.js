include.pauseStack();

include.register({
    load: [ {
        id: "/public/view/class/class.mask",
        url: "/public/view/class/class.mask"
    }, {
        id: "/public/view/class/class.example",
        url: "/public/view/class/class.example"
    } ],
    js: [ {
        id: "/public/view/class/class.js",
        url: "/public/view/class/class.js"
    } ]
});

include.routes({
    "public": "/public/script/{0}.js",
    "public.compo": "/public/compo/{0}/{1}.js",
    atma: "/.reference/libjs/{0}/lib/{1}.js",
    "atma.compos": "/.reference/libjs/compos/{0}/lib/{1}.js",
    view: "/public/view/{0}/{1}.js"
});

include.setCurrent({
    id: "/public/view/class/class.js",
    namespace: "",
    url: "/public/view/class/class.js"
});

include.load("class.example::Examples").done(function(resp) {
    mask.registerHandler(":view:class", Class({
        Base: mask.getHandler(":view:default"),
        compos: {
            tabsexamples: "compo: #tabs-examples"
        },
        resource: include,
        Override: {
            onRenderStart: function() {
                var examples = resp.load.Examples;
                this.model = {
                    examples: examples,
                    sideMenu: [ {
                        name: "examples",
                        list: ruqq.arr.select(examples, [ "name", "title" ])
                    } ]
                };
                this.super(arguments);
            }
        }
    }));
});

include.getResource("/public/view/class/class.js", "js").readystatechanged(3);

include.resumeStack();