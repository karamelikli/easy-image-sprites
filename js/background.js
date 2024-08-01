/**
 * Jquery based of easy image sprites
 */
(function ($) {
    /**
     * 
     * @param {*} option Get options 
     * @returns 
     */
    $.fn.bgyer = function (option) {
        /**
         * Meging existed options
         */
        var option = $.extend({
            preview: false
        }, option || {});
        /**
         * saving parent object to use it inside childeren functions
         */
        var that = this;
        var s = {};
        var CSSprop = {}; // for saving related css properties
        var $dragging = null;
        var $dragging2 = false;
        this.corpbuild = function (budiv) {
            var genelId = budiv.attr("id");
            /* budiv.wrap("<div class='corpEnUst' />");*/
            if (!genelId) genelId = "a" + Math.ceil(Math.random() * 1000);
            var imgi = $("img", budiv);
            budiv.css({ width: imgi.outerWidth, height: imgi.outerHeight })
            imgi.wrap('<div class="cropmain" />');
            imgi.after('<div id="ortu" class="corpOrtu" />');
            budiv.append('<div id="gi_' + genelId + '"   class="cropic"><div class="cropdot" style="left:0;top:0"></div></div>');
            $(".cropic").css({
                "left": 0, "top": 0, width: $("#divW").val(), height: $("#divH").val(),
                'background-image': 'url(' + imgi.attr("src") + ')'
            });
            $dragging = $(".cropic", $(this));
            that.makechange(imgi, genelId);
            /**
             * Activating keyboard right,left, top and down keys.
             */
            $("body").keydown(function (e) {
                var bh = e.keyCode;
                var w = parseInt($("#divx").val()); var y = parseInt($("#divy").val());
                if (bh == 37) { // left
                    w = w - 1;
                }
                else if (bh == 39) { // right
                    w = w + 1;
                } else if (bh == 38) { // up
                    y = y - 1;
                } else if (bh == 40) { // down
                    y = y + 1;
                } else {
                    return;
                }
                $("#divx").val(w); $("#divy").val(y);
                that.uygula($(".cropmain"), w + 'px', y + 'px');
                return false;
            });
        }
        var $dragging2 = false;
        this.mdown = function (bu, ee) {
            $dragging2 = bu.attr("class");
            var poz = bu.position();//position();
            s.l = poz.left;
            s.t = poz.top;
            s.x = ee.pageX - s.l;
            s.y = ee.pageY - s.t;
            $(this).bind("mousemove", function (e) {
                //  $("#test").html(e.pageX );
                if ($dragging2) {
                    var sw = e.pageX - s.x;
                    var sh = e.pageY - s.y;
                    that.uygula(bu, sw, sh); return false;       // return false may be removed          
                }
            });
        }
        this.uygula = function (bu, sw, sh) {
              $.extend(CSSprop, {
                "width": $("#divW").val(),
                "height": $("#divH").val(),
                'background-color': $("#fc").val(),
                'background-image': 'url(' + $("#sorc").val() + ')',
                'background-repeat': $("#fr").val(),
                'background-attachment': $("#fa").val(),
                'background-position-x': $("#divx").val() + 'px',
                'background-position-y': $("#divy").val() + 'px',
                'transform': 'scale(' + $("#fzVal").val() / 100 + ')'
            })
            var hmm = parseInt(sw) + "px " + parseInt(sh) + "px ";
            bu.css({ top: sh, left: sw });
            CSSprop["background-position-x"] = parseInt(sw) + "px ";
            CSSprop["background-position-y"] = parseInt(sh) + "px ";
            let CSScontent = '<div style="overflow: hidden;width:' + CSSprop["width"] + 'px; height: ' + CSSprop["height"] + 'px"><div style="width:inherit;height:inherit ;background:';
            CSScontent += CSSprop["background-color"] + " " + CSSprop["background-image"] + "  " + CSSprop["background-repeat"] +
                " " + CSSprop["background-attachment"] + " " + CSSprop["background-position-x"] + " " + CSSprop["background-position-y"] + "; transform:" + CSSprop["transform"];
            CSScontent += '" /></div>';
            $("#Codes").val(CSScontent);
            $("#test").css(CSSprop);
            $("#containerIcon").css({ width: CSSprop["width"] + 'px', height: CSSprop["height"] + 'px' })

            $dragging.css("backgroundPosition", hmm);
            $("#test").css("backgroundPosition", hmm);
            $("#testDivId").html(hmm);
            $(".cropic").css("backgroundPosition", hmm);           
            $(".cropic").css({ 'background-repeat': "no-repeat"  });                 
         
            $("#divy").val(parseInt(sh)); $("#divx").val(parseInt(sw));
           
        }

        this.makechange = function (budiv, genelId) {
            s.w = budiv.innerWidth();
            s.h = budiv.innerHeight();
            $("#" + genelId).css({
                width: s.w,
                height: s.h
            }); $("#ortu").css({
                width: s.w,
                height: s.h, top: 0
            });
            $(".cropmain").css({
                cursor: "move",
                height: s.h,
                top: 0, left: 0, width: s.w
            }).bind("mousedown", function (e) {
                that.mdown($(this), e)
            }).bind("mouseup", function () {//s={};
                $dragging2 = false;
                $(this).bind('mousemove', function () { });
            }).on("load", function () { that.uygula($(this), $("#divx").val(), $("#divy").val()) });
            $dragging = $(".cropic");
            that.uygula($(".cropmain"), $("#divx").val() + 'px', $("#divy").val() + 'px');
            setTimeout(function () { }, 800);
        }
        return this.each(function () {
            var ff = $(this);
            /**
             * to preventing reinsertion of image while resizing
             */
          if ($("img", ff).length == 0) {
                ff.html("<img src='" + $("#sorc").val() + "' />")
                 var imgi = $("img", ff);
                 imgi.on("load", function () {
                /*    ff.css({"background-image":"url("+$("#sorc").val()+")",width:imgi.width(),height:imgi.height()})
                       imgi.remove();  */
                that.corpbuild(ff)
            })
          }else{
            $dragging =ff;
            that.uygula($(".cropmain"), $("#divx").val() + 'px', $("#divy").val() + 'px');
          }

           
            
        })

    }
})(jQuery);