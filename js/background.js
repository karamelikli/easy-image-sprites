
(function( $ ){ 
    $.fn.bgyer=function(option){
        var option = $.extend({
            preview:false
        },option||{});
        var that=this;
        var s={};
        var simg;
        var $dragging = null;
        var $dragging2=false;
        var ortudiv={}
        this.corpbuild=function(budiv){            
            var genelId=budiv.attr("id");
            if(!genelId)genelId= "a"+Math.ceil(Math.random()*1000);
            var imgi=$("img",budiv);
            budiv.css({width:imgi.outerWidth,height:imgi.outerHeight})
            imgi.wrap('<div class="cropmain" />');        
            imgi.after( '<div id="ortu" class="corpOrtu" />');
            budiv.append( '<div id="gi_'+genelId+'"   class="cropic"><div class="cropdot" style="left:0;top:0"></div></div>');
            $(".cropic,.cropic2").css({"left":0,"top":0,width:$("#divW").val(),height:$("#divH").val(),
            'background-image':'url('+imgi.attr("src")+')'});
            $dragging=$(".cropic",$(this));
            $(".spw").html($("#divW").val());$(".sph").html($("#divH").val());
            $("#ur").html($("#fr").val());
            $("#ua").html($("#fa").val());
            $("#ui").html("url("+$("#sorc").val()+")");
            $("#uc,#bc").html($("#fc").val());
            $(".cropic2").css({'background-color':$("#fc").val()});
            if($("#sorc").val()){
                $("#bi").html("url("+$("#sorc").val()+")");
            }
            if($("#fr").val()!="repeat"){
                $("#br").html($("#fr").val());
            }else{
                $("#br").html("");
            }
            $(".cropic2,.cropic").css({'background-repeat':$("#fr").val()});
            if($("#fa").val()!="scroll"){
                $("#ba").html($("#fa").val());
            }else{
                $("#ba").html("");
            }
            $(".cropic2").css({'background-attachment':$("#fa").val()});
            
            that.makechange(imgi,genelId );
            $("body").keydown(function(e) {
                var bh=   e.keyCode; 
                var w=parseInt( $("#divx").val());var y=parseInt( $("#divy").val());
                if(bh == 37) { // left
                    w=w-1;
                }
                else if(bh == 39) { // right
                    w=w+1;
                }else if(bh == 38) { // up
                    y=y-1;
                }else if(bh == 40) { // down
                    y=y+1;
                }else{
                    return;
                }
                $("#divx").val(w); $("#divy").val(y);
                that.uygula($(".cropmain")   ,w + 'px' ,y + 'px' );
                return false;
            });
        }
        var $dragging2=false;
        this.mdown=function(bu,ee){
            $dragging2=bu.attr("class");
            var poz =   bu.position();//position();
            s.l= poz.left;
            s.t= poz.top; 
            s.x=ee.pageX-s.l;
            s.y=ee.pageY-s.t;     
            $(this).bind("mousemove",function(e) {
                //  $("#test").html(e.pageX );
                if ($dragging2) {
                    var sw=e.pageX - s.x ;
                    var sh=e.pageY -s.y ; 
                    that.uygula(bu,sw,sh);     return false;       // return false may be removed          
                }
            });           
        }
        this.uygula=function(bu,sw,sh){
            var hmm=parseInt(sw)+"px "+parseInt(sh)+"px ";
            bu.css( { top: sh,left: sw});
            $dragging.css("backgroundPosition",hmm);
            $("#testDivId").html(hmm);
            $(".cropic2").css("backgroundPosition",hmm);
            $("#divy").val(parseInt(sh)); $("#divx").val(parseInt(sw));
            $("#up,#bp").html(hmm);
        }
        
        var gw,gh,ii,iw,ih,cl,ct;
        this.makechange=function( budiv,genelId){
            s.w=gw=budiv.innerWidth();
            s.h=gh=budiv.innerHeight();
            $("#"+genelId).css({
                width:s.w,
                height:s.h
            });$("#ortu").css({
                width:s.w,
                height:s.h,top:0
            });
            $(".cropmain").css({
                cursor:"move",
                height:s.h,
                top:0,left:0,width:s.w
            }).bind("mousedown",   function(e) {
                that.mdown($(this),e)
            }).bind("mouseup",  function( ) {//s={};
                $dragging2=false; $(this).bind('mousemove',function(){});
            }).on("load",function(){   that.uygula($(this)  ,$("#divx").val() , $("#divy").val() ) });
            $dragging=$(".cropic" );
            that.uygula($(".cropmain")   ,$("#divx").val() + 'px' , $("#divy").val() + 'px' ); 
            setTimeout(function(){   }, 800);
        }
        return this.each(function(){
            var ff=$(this);            
            ff.html("<img src='"+$("#sorc").val()+"' />")
            var imgi=$("img", ff);
            imgi.on("load",function(){that.corpbuild(ff)}) 
        })
        
    }
})( jQuery );