jQuery(document).ready(function($){

    // Settings
    var userID             = "100330718735291173642",
        getAblumList       = "https://picasaweb.google.com/data/feed/base/user/:userid?alt=json&fields=entry(id,title,link,media:group(media:thumbnail))",
        getPhtotList       = "https://picasaweb.google.com/data/feed/api/user/:userid/albumid/:albumid?alt=json&fields=title,link,entry(summary,media:group(media:thumbnail))",
        albumPerRow        = 2,
        fullFramPhotoWidth = "1200"; // px
    $.ajaxSetup({ cache: false }); // cache option

    // Rewrite API links
    getAblumList = getAblumList.replace(/:userid/, userID);
    getPhtotList = getPhtotList.replace(/:userid/, userID);

    // List all albums, only runs on home page
    if( $("body").has("span#home").length != 0 ){
      var albumID     = "",
          title       = "",
          altLink     = "",
          altArray    = [],
          altName     = "", // unique name
          thumbURL    = "",
          albumArray  = [],
          divBlock    = "";

      $.getJSON( getAblumList, function(data){
        albumArray = data.feed.entry;
        console.log(albumArray);

        var i = 0;
        $.each( albumArray, function(key,val){
          albumID  = val.id.$t.match(/albumid\/(.*)\?/i)[1];
          title    = val.title.$t;
          altLink  = val.link[1].href;
          altArray = altLink.split('/');
          altName  = altArray[altArray.length - 1];
          thumbURL   = val.media$group.media$thumbnail[0].url;

          if( i % albumPerRow == 0 ){
            $("#main").append("<div class='row albumRow'><div>");
          };

          divBlock = '<div id="'+altName+'" class="large-6 columns albumDiv"> \
                        <a href="/album?albid='+albumID+'&"> \
                          <img src="'+thumbURL+'" /> \
                        </a> \
                      </div>';
          $(".albumRow").last().append(divBlock);

          i += 1;
        });  
      });
    };

    // List all photos in one album, only runs on album page
    if( $("body").has("span#album").length != 0 ){
      var albumID      = "",
          title        = "",
          caption      = "",
          thumbURL     = "",
          linkArray    = "",
          fullFrameURL = "",
          photoArray   = [],
          divBlock     = "";

      albumID = document.URL.match(/albid=(.*)&/i)[1];
      getPhtotList = getPhtotList.replace(/:albumid/, albumID);
      console.log(getPhtotList);

      $.getJSON( getPhtotList, function(data){
        photoArray = data.feed.entry;
        console.log(photoArray);
        title   = data.feed.title.$t;

        var i = 0;
        $.each( photoArray, function(key,val){
          caption   = val.summary.$t;
          thumbURL  = val.media$group.media$thumbnail[2].url;
          linkArray = thumbURL.split('/'); // split URL
          linkArray[linkArray.length-2] += "-c"; // rewrite thumb URL with crop
          thumbURL = linkArray.join('/'); // reconstruct thumb frame URL
          linkArray[linkArray.length-2] = "s"+fullFramPhotoWidth; // rewrite image size for full frame URL
          fullFrameURL = linkArray.join('/'); // reconstruct full frame URL

          console.log(caption);

          divBlock = '<div class="large-4 columns photoThumb">\
                        <a class="fancybox" rel="group" href="'+fullFrameURL+'" title="'+caption+'"> \
                          <img src="'+thumbURL+'"> \
                        </a> \
                      </div>';
          $("#main").append(divBlock);            

          i += 1;
        });
      });
    };

});


//======================
// FancyBox 
//======================
// Code from http://fancyapps.com/ under Creative Commons Attribution-NonCommercial 3.0 license.

(function ($, F) {
  F.transitions.resizeIn = function() {
    var previous = F.previous,
        current  = F.current,
        startPos = previous.wrap.stop(true).position(),
        endPos   = $.extend({opacity : 1}, current.pos);

    startPos.width  = previous.wrap.width();
    startPos.height = previous.wrap.height();

    previous.wrap.stop(true).trigger('onReset').remove();

    delete endPos.position;

    current.inner.hide();

    current.wrap.css(startPos).animate(endPos, {
      duration : current.nextSpeed,
      easing   : current.nextEasing,
      step     : F.transitions.step,
      complete : function() {
        F._afterZoomIn();

        current.inner.fadeIn("fast");
      }
    });
  };

}(jQuery, jQuery.fancybox));

// Settings
$(".fancybox")
  .attr('rel', 'gallery')
  .fancybox({
    nextMethod : 'resizeIn',
    nextSpeed  : 250,
    padding : 4,
    mouseWheel: false,
    
    prevMethod : false,
    
    helpers : {
      title : {
        type : 'over'
      }
    }
});


   