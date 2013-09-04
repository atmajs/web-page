include.pauseStack();

include.register({
    load: [ {
        id: "/public/view/mask/mask.mask",
        url: "/public/view/mask/mask.mask"
    }, {
        id: "/public/view/mask/mask.example",
        url: "/public/view/mask/mask.example"
    } ],
    js: [ {
        id: "/public/view/mask/mask.js",
        url: "/public/view/mask/mask.js"
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
    id: "/public/view/mask/mask.js",
    namespace: "",
    url: "/public/view/mask/mask.js"
});

include.load("mask.example::Examples").done(function(resp) {
    var Default = mask.getHandler(":view:default");
    mask.registerHandler(":view:mask", Class({
        Base: Default,
        compos: {
            tabsexamples: "compo: #tabs-examples",
            tabssyntax: "compo: #tabs-syntax"
        },
        slots: {
            runExample: function(event) {
                var $button = $(event.currentTarget), $ex = $button.closest(".example"), template = $ex.children(".template").text(), javascript = $ex.children(".javascript").text();
                var result;
                try {
                    result = eval(javascript);
                } catch (error) {
                    alert(error);
                }
                $ex.children(".result").append(result);
                $button.remove();
            }
        },
        Override: {
            onRenderStart: function() {
                var examples = resp.load.Examples;
                this.model = {
                    examples: examples,
                    sideMenu: [ {
                        name: "examples",
                        route: "/-/examples/simple",
                        list: ruqq.arr.select(examples, [ "name", "title" ])
                    } ]
                };
                this.super();
            }
        }
    }));
});

include.getResource("/public/view/mask/mask.js", "js").readystatechanged(3);

include.resumeStack();