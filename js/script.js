jQuery(document).ready(function($){
    
    var userid       = "100330718735291173642";
    var getAblumList = "http://picasaweb.google.com/data/feed/base/user/:userid?alt=json&fields=entry(id,title,link,media:group(media:thumbnail))";
    var albumPerRow  = 2;
    $.ajaxSetup({ cache: false });

    getAblumList = getAblumList.replace(/:userid/, userid);

    // List all albums
    $.getJSON( getAblumList, function(data){
      var albumID     = "";
      var title       = "";
      var altLink     = "";
      var altArray    = [];
      var altName     = ""; // unique name
      var picURL      = "";
      var albumArray  = [];
      var divBlock    = "";

      albumArray = data.feed.entry;
      console.log(albumArray);

      var i = 0;
      $.each( albumArray, function(key,val){
        albumID  = val.id.$t.match(/albumid\/(.*)\?/i)[1];
        title    = val.title.$t;
        altLink  = val.link[1].href;
        altArray = altLink.split('/');
        altName  = altArray[altArray.length - 1];
        picURL   = val.media$group.media$thumbnail[0].url;

        if( i % albumPerRow == 0 ){
          $("#main").append("<div class='row albumRow'><div>");
        };

        divBlock = '<div id="'+altName+'" class="large-6 columns albumDiv"> \
                      <a href="album?id='+albumID+'&title='+title+'"> \
                        <img src="'+picURL+'"> \
                      </a> \
                    </div>';
        $(".albumRow").last().append(divBlock);

        i += 1;
      });  
    });



});


   