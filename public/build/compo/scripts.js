include.pauseStack();

include.register({
    load: [ {
        id: "/public/view/compo/compo.mask",
        url: "/public/view/compo/compo.mask"
    }, {
        id: "/public/view/compo/tagApi.mask",
        url: "/public/view/compo/tagApi.mask"
    } ],
    js: [ {
        id: "/public/view/compo/compo.js",
        url: "/public/view/compo/compo.js"
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
    id: "/public/view/compo/compo.js",
    namespace: "",
    url: "/public/view/compo/compo.js"
});

include.load("tagApi.mask").done(function(resp) {
    mask.render(resp.load.tagApi);
    var tags = {};
    function doSwitch($current, $next, $container) {
        $current.removeClass("active");
        $next.addClass("active");
        mask.animate($container.parent().get(0), {
            model: "opacity | .3 > 1 | 300ms"
        });
    }
    function load(tag, callback) {
        include.instance().load("/public/view/compo/tags/" + tag + "/" + tag + ".mask::Template").done(function(resp) {
            callback(resp.load.Template);
        });
    }
    mask.registerHandler(":view:compo", Class({
        Base: mask.getHandler(":view:default"),
        compos: {
            $panel: "$: .tabPanel",
            scroller: "compo: scroller"
        },
        section: function(route) {
            var tag = route.category, item = tags[tag];
            if (item) {
                this.show(tag);
                item.update();
            } else this.load(tag);
        },
        showTab: function(tag) {
            var item = tags[tag];
            if (item) this.show(tag); else this.load(tag);
        },
        onRenderStart: function(model, ctx) {
            var that = this, nodes = this.nodes;
            if (ctx.page) {
                Compo.pause(this, ctx);
                load(ctx.page.query.tab, function(template) {
                    jmask(nodes).find(".tabPanel").mask(template);
                    Compo.resume(that, ctx);
                });
            }
        },
        onRenderEndServer: function(elements) {
            var $tag = elements[0].querySelector(".tagItem");
            $tag.attributes["class"] = "active";
        },
        load: function(tag) {
            this.$.parent().css("opacity", ".3");
            var that = this, $container = this.compos.$panel;
            load(tag, function(template) {
                jmask("div").attr("data-tag", tag).mask(template).appendTo($container.get(0));
                tags[tag] = 1;
                that.show(tag);
            });
        },
        show: function(tag) {
            var $current = this.compos.$panel.children(".active"), $next = this.compos.$panel.children("[data-tag=" + tag + "]");
            if ($current.length) doSwitch($current, $next, this.$); else {
                this.$.parent().css("opacity", "1");
                $next.addClass("active");
            }
            return;
        }
    }));
});

include.getResource("/public/view/compo/compo.js", "js").readystatechanged(3);

include.resumeStack();