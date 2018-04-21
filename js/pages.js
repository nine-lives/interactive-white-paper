function Pages(container) {
    var that = this;
    this.wrapper = $("<div></div>");
    this.container = $(container);
    this.pages = this.container.find("> section");
    this.current = 0;

    this.wrapper.insertAfter(this.container);
    this.wrapper.append(this.container);
    this.wrapper.css({"overflow": "hidden"});
    this.container.css({
        "overflow-x": "scroll",
        "overflow-y": "hidden",
        "white-space": "nowrap"
    });

    this.container.contents().filter(
        function() { return (this.nodeType === 3 && !/\S/.test(this.nodeValue)); })
        .remove();

    this.findMaxPageHeight = function() {
        var height = 0;
        for (var i = 0; i < this.pages.length; ++i) {
            height = Math.max(height, $(this.pages[i]).height());
        }
        return height;
    };

    this.resize = function() {
        var height = that.container.hasClass("pages-full-screen") ? $( window ).height() : that.findMaxPageHeight();
        that.wrapper.css({height: height + "px"});
        for (var i = 0; i < that.pages.length; ++i) {
            $(that.pages[i]).css({height: (height + 17) + "px"});
        }

        // We need to set height before width to avoid y scroll bar affecting the size
        var width = that.container.width();
        that.wrapper.css({height: height + "px"});
        for (var i = 0; i < that.pages.length; ++i) {
            $(that.pages[i]).css({width: width});
        }
    };

    this.redraw = function() {
        for (var i = 0; i < that.pages.length; ++i) {
            $(that.pages[i]).css({
                "display": "inline-block",
                "overflow-x": "hidden",
                "white-space": "normal",
                "vertical-align": "top"
            });
        }
    };

    this.container.scrollsnap({
        snaps: 'section',
        direction: "x",
        easing : 'easeInCubic',
        onSnap: function($matchingEl) {
            $(".page-next").toggle($matchingEl.prev().length !== 0 && $matchingEl.next().length !== 0);
            $(".page-prev").toggle($matchingEl.prev().length !== 0);

            that.container.find("[data-animation]").each(function () {
                $(this).removeClass("animated");
                $(this).removeClass($(this).data("animation"));
            });

            $matchingEl.find("[data-animation]").each(function () {
                $(this).addClass("animated " + $(this).data("animation"));
            });
        }
    });

    var first = $(that.container.find('section')[0]);
    $(".page-next").toggle(first.prev().length  !== 0 && first.next().length !== 0);
    $(".page-prev").toggle(first.prev().length !== 0);

    that.container.find("section:first-of-type [data-animation]").each(function () {
        $(this).addClass("animated " + $(this).data("animation"));
    });


    this.redraw();
    this.resize();
    $(window).resize(function() {
        waitForFinalEvent(function(){
            setTimeout(that.resize, 250);
        }, 200, "pages");
    });
}


$(function() {
    $(".pages").each(function() {
       var pages = new Pages(this);
    });
}());