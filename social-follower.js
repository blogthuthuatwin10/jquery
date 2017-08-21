//<![CDATA[
	var facebookid = 'blogthuthuatwin10';
	var facebookapikey = '583598571819746|QGelpiF0wKJQzRPEruS0GIEIhyA';
	var twitterapikey = 'dc82abddebdc9ab9b8685a89eaa3ad4a';
     	var twitterid = '2807492197';
   	var profileid = '107358436079093222807';
	var channelid = 'UCuEpSc3yitS2Gyz2XdMlSPg';
	var googleapikey = 'AIzaSyCq9CqSDi0u5LsqljWc2tGHk0NQtrFLFHo';
				
	var url = 'https://graph.facebook.com/'+facebookid+'?fields=fan_count&access_token='+facebookapikey;
	$.ajax({
		type: 'GET',
        	dataType: 'json',
        	url: url,
        	success: function(data) {   
          	var facebookfancount = data.fan_count;
          		$('.facebookfancount').html(' ('+facebookfancount+')');
        	} 
      	}); 

	var url = 'http://api.twittercounter.com/?apikey='+twitterapikey+'&twitter_id='+twitterid+'&output=jsonp&callback=myCallbackMethod';
    	$.ajax({
        	type: "GET",
        	dataType: "jsonp",
		url: url,
        	success: function (data) {
        	var twitterfollowcount = data.followers_current;
            		$(".twitterfollowcount").html('('+twitterfollowcount+')');
        	}
	});	

	var url = 'https://www.googleapis.com/plus/v1/people/'+profileid+'?key='+googleapikey;
	$.ajax({
    		type: "GET",
    		dataType: "json",
    		url: url,
    		success: function (data) {
        	var googlefollowcount = data.circledByCount;
        		$(".googlefollowercount").html(' ('+googlefollowcount+')');
    		}
	});

	var url = 'https://www.googleapis.com/youtube/v3/channels?part=statistics&id='+channelid+'&key='+googleapikey+'';
	$.ajax({
    		type: "GET",
    		dataType: "json",
    		url: url,
    		success: function (data) {
        	var youtubesubscribercount = data.items[0].statistics.subscriberCount;
        		$(".youtubesubscribercount").html(' ('+youtubesubscribercount+')');
    		}
	});			
//]]>