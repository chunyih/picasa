jQuery(document).ready(function($){
    
    var userid = "100330718735291173642";

    var getAblum = "http://picasaweb.google.com/data/feed/base/user/:userid?alt=json&fields=entry(title,link,media:group(media:thumbnail))";
    getAblum = getAblum.replace(/:userid/, userid);

    $.getJSON( getAblum, function(data){

      console.log(data.feed.entry[0].title.$t);
      console.log(data.feed.entry);

      var albums = data.feed.entry;

      
    });



});


   