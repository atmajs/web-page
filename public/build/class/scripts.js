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