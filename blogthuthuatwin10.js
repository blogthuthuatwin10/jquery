//<![CDATA[

$(document).ready(function () {
	var w = 726;
	var h = 290;
		$('.bukshan,.bukshan img').find('img').each(function (n, image) {
	var image = $(image);
		image.attr({
		src: image.attr('src').replace(/s\B\d{2,4}/, 'w' + w + '-h' + h + '-c')
	});
		image.attr('width', w);
		image.attr('height', h);
	});
});

	$(document).ready(function()
	{
	$(".with-ul").click(function()
	{
	var X=$(this).attr('id');
		if(X==1)
	{
			$(".sub-menu").hide();
			$(this).attr('id', '0');
	}
		else
	{
	$(".sub-menu").show();
	$(this).attr('id', '1');
	}
	});
		$(".sub-menu").mouseup(function()
	{
		return false
	});

		$(".with-ul").mouseup(function()
	{
		return false
	});

		$(document).mouseup(function()
	{
		$(".sub-menu").hide();
		$(".with-ul").attr('id', '');
	});
	});

$(document).ready(function(){

  $('.dropdown').each(function() {
    var $dropdown = $(this);

    $(".dropdown-link", $dropdown).click(function(e) {
      e.preventDefault();
      $div = $(".dropdown-container", $dropdown);
      $div.toggle();
      $(".dropdown-container").not($div).hide();
      return false;
    });

});
    
  $('html').click(function(){
    $(".dropdown-container").hide();
  });
     
});

$(document).ready(function () {
	var touch = $('#duled');
	var menu = $('.menu');
	$(touch).on('click', function (e) {
		e.preventDefault();
		menu.slideToggle();
	});
	$(window).resize(function () {
		var w = $(window).width();
		if (w > 800 && menu.is(':hidden')) {
			menu.removeAttr('style');
		}
	});
});
$(document).ready(function () {
	var touch = $('#duled1');
	var menu = $('.Pagemenu');
	$(touch).on('click', function (e) {
		e.preventDefault();
		menu.slideToggle();
	});
	$(window).resize(function () {
		var w = $(window).width();
		if (w > 800 && menu.is(':hidden')) {
			menu.removeAttr('style');
		}
	});
});

$(function() {
	$.fn.scrollToTop = function() {
	$(this).hide().removeAttr("href"); 
	if ($(window).scrollTop() != "0") {       
	$(this).fadeIn("slow")} 
	
	var scrollDiv = $(this); 
	$(window).scroll(function() { 
	if ($(window).scrollTop() == "0") {       
		$(scrollDiv).fadeOut("slow") 
	} else { $(scrollDiv).fadeIn("slow") } }); 
		$(this).click(function() { 
		$("html, body").animate({ scrollTop: 0 }, "slow") 
		}) 
	} 
}); 

$(function() {
	$("#MD-StoTop").scrollToTop();});

var lastScroll = 0;
	jQuery(document).ready(function($) {
    $(".backer").addClass("default23");
    	$(window).scroll(function(){
        	var scroll = $(window).scrollTop();
        	if (scroll > lastScroll) {
            $(".backer").removeClass("default23").addClass("fixed23");
        	} else if (scroll < lastScroll) {
            $(".backer").addClass("default23").removeClass("fixed23");
        	}
        lastScroll = scroll;
    	});
});

var numpost = 5;
function rcpost(json){var entry=json.feed.entry,posturl;for(var i=0;i<numpost;i++){for(var j=0;j<entry[i].link.length;j++){if(entry[i].link[j].rel=='alternate'){posturl=entry[i].link[j].href;break;}}
var poststitle=entry[i].title.$t;document.write('<li><a href="'+posturl+'" rel="nofollow">'+poststitle+'</a></li>');}}

function av(a){var b=a.entry.author[0];c=b.name.$t;d=b.gd$image.src.replace(/\/s[0-9]+(-*c*)\//,'/s30$1/');document.write('<img alt="'+c+'" class="avatar-author" src="'+d+'" title="'+c+'"/>')}

function copyTextToClipboard(text) {
		var textArea = document.createElement("textarea");
		textArea.style.position = 'fixed';
		textArea.style.top = 0;
		textArea.style.left = 0;
		textArea.style.width = '2em';
		textArea.style.height = '2em';
		textArea.style.padding = 0;
		textArea.style.border = 'none';
		textArea.style.outline = 'none';
		textArea.style.boxShadow = 'none';
		textArea.style.background = 'transparent';
		textArea.value = text;
			document.body.appendChild(textArea);
		textArea.select();
		try {
    		var successful = document.execCommand('copy');
    		var msg = alert("Đã sao chép liên kết!");
    		
  		} catch (err) {
    		var msg = alert("Không thể sao chép liên kết!");
  		}
  		document.body.removeChild(textArea);
	}
	function CopyLink() {
		copyTextToClipboard(location.href);
	}

jQuery(document).ready(function($){
 //open popup
 $('.cd-popup-trigger').on('click', function(event){
  event.preventDefault();
  $('.cd-popup').addClass('is-visible');
 });
 
 //close popup
 $('.cd-popup').on('click', function(event){
  if( $(event.target).is('.cd-popup-close') || $(event.target).is('.cd-popup') ) {
   event.preventDefault();
   $(this).removeClass('is-visible');
  }
 });

 $('.cd-popup').on('click', function(event){
  if( $(event.target).is('.clickbutton') || $(event.target).is('.cd-popup') ) {
   event.preventDefault();
   $(this).removeClass('is-visible');
  }
 });
 //close popup when clicking the esc keyboard button
 $(document).keyup(function(event){
     if(event.which=='27'){
      $('.cd-popup').removeClass('is-visible');
     }
    });
});

//]]>