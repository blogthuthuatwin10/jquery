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
    		var msg = alert("Không thể sao chép!");
  		}
  		document.body.removeChild(textArea);
	}
	function CopyLink() {
		copyTextToClipboard(location.href);
	}

  $(function(){
 			new Clipboard('.copy-text');
		});

	function Facebook() {
    	mywindow = window.open('https://www.facebook.com/sharer.php?u='+location.href, '', 'width=590,height=430');
    	mywindow.moveTo(0, 0);
	}
	function Twitter() {
    	mywindow = window.open('https://twitter.com/share?url='+location.href, '', 'width=590,height=430');
    	mywindow.moveTo(0, 0);
	}
	function Google() {
    	mywindow = window.open('https://plus.google.com/share?url='+location.href, '', 'width=590,height=430');
    	mywindow.moveTo(0, 0);
	}

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
		$("#MD-StoTop").scrollToTop();
});

function removeHtmlTag(strx, chop) {
	if (strx.indexOf("<") != -1) {
		var s = strx.split("<");
		for (var i = 0; i < s.length; i++) {
			if (s[i].indexOf(">") != -1) {
				s[i] = s[i].substring(s[i].indexOf(">") + 1, s[i].length)
			}
		}
		strx = s.join("")
	}
	chop = (chop < strx.length - 1) ? chop: strx.length - 2;
	while (strx.charAt(chop - 1) != ' ' && strx.indexOf(' ', chop) != -1) chop++;
	strx = strx.substring(0, chop - 1);
	return strx + ''
}
function masSummaryAndThumb(mas1, mas2) {
	var div = document.getElementById(mas1);
	var imgtag = "";
	var img = div.getElementsByTagName("img");
	var summ = 0;
	if (img.length >= 1) {
		imgtag = '<a href="' + mas2 + '"><span style="float:left;"><span class="play-button"></span><img src="' + img[0].src + '"/></span></a>';
		summ = 0
	}
	var summary = imgtag + '<div class="entry"></div>';
	div.innerHTML = summary
}

var relatedTitles = new Array();
var relatedTitlesNum = 0;
var relatedUrls = new Array();
var thumburl = new Array();

function related_results_labels_thumbs(json) {
	for (var i = 0; i < json["feed"]["entry"]["length"]; i++) {
		var entry = json["feed"]["entry"][i];
		relatedTitles[relatedTitlesNum] = entry["title"]["$t"];
		try {
			thumburl[relatedTitlesNum] = entry["gform_foot"]["url"]
		} catch(error) {
			s = entry["content"]["$t"];
			a = s["indexOf"]("<img");
			b = s["indexOf"]("src=\"", a);
			c = s["indexOf"]("\"", b + 5);
			d = s["substr"](b + 5, c - b - 5);
			if ((a != -1) && (b != -1) && (c != -1) && (d != "")) {
				thumburl[relatedTitlesNum] = d
			} else {
				thumburl[relatedTitlesNum] = "http://2.bp.blogspot.com/-lSRuR7ejzn4/VIT-2xVy2rI/AAAAAAAADNU/rdp-AdY0ThQ/s1600/no+image.jpg"
			}
		};
		if (relatedTitles[relatedTitlesNum]["length"] > 35) {
			relatedTitles[relatedTitlesNum] = relatedTitles[relatedTitlesNum]["substring"](0, 35) + "..."
		};
		for (var k = 0; k < entry["link"]["length"]; k++) {
			if (entry["link"][k]["rel"] == "alternate") {
				relatedUrls[relatedTitlesNum] = entry["link"][k]["href"];
				relatedTitlesNum++
			}
		}
	}
};
function removeRelatedDuplicates_thumbs() {
	var tmp = new Array(0);
	var tmp2 = new Array(0);
	var tmp3 = new Array(0);
	for (var i = 0; i < relatedUrls["length"]; i++) {
		if (!contains_thumbs(tmp, relatedUrls[i])) {
			tmp["length"] += 1;
			tmp[tmp["length"] - 1] = relatedUrls[i];
			tmp2["length"] += 1;
			tmp3["length"] += 1;
			tmp2[tmp2["length"] - 1] = relatedTitles[i];
			tmp3[tmp3["length"] - 1] = thumburl[i]
		}
	};
	relatedTitles = tmp2;
	relatedUrls = tmp;
	thumburl = tmp3
};
function contains_thumbs(a, e) {
	for (var j = 0; j < a["length"]; j++) {
		if (a[j] == e) {
			return true
		}
	};
	return false
};
function printRelatedLabels_thumbs() {
	for (var i = 0; i < relatedUrls["length"]; i++) {
		if ((relatedUrls[i] == currentposturl) || (!(relatedTitles[i]))) {
			relatedUrls["splice"](i, 1);
			relatedTitles["splice"](i, 1);
			thumburl["splice"](i, 1);
			i--
		}
	};
	var r = Math["floor"]((relatedTitles["length"] - 1) * Math["random"]());
	var i = 0;
	if (relatedTitles["length"] > 0) {
		document["write"]("<h3>" + relatedpoststitle + "</h3>")
	};
	document["write"]("<div style=\"clear: both;\"/>");
	while (i < relatedTitles["length"] && i < 20 && i < maxresults) {
		document["write"]("<a style=\"text-decoration:none;margin:0 0px 0px 0;float:left;border:none;");
		if (i != 0) {
			document["write"]("border:none;\"")
		} else {
			document["write"]("\"")
		};
		document["write"](" href=\"" + relatedUrls[r] + "\"><div class=\"arrow-but\"><img class=\"mugs-in\" src=\"" + thumburl[r] + "\"/><br/></div><div class=\"delate-post\">" + relatedTitles[r] + "</div></a>");
		if (r < relatedTitles["length"] - 1) {
			r++
		} else {
			r = 0
		};
		i++
	};
	document["write"]("</div>");
	relatedUrls["splice"](0, relatedUrls["length"]);
	thumburl["splice"](0, thumburl["length"]);
	relatedTitles["splice"](0, relatedTitles["length"])
};