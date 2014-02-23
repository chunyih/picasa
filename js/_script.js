(function($) {
  $.picasa = {
    albums: function(user, callback) {
      var url = "http://picasaweb.google.com/data/feed/base/user/:user_id?alt=json&kind=album&hl=en_US&access=visible&fields=entry(id,media:group(media:content,media:description,media:keywords,media:title))"
      url = url.replace(/:user_id/, user);
      $.getJSON(url, function(data) {
        console.log(data);
      });
    },

    images: function(user, album, callback) {
      var url = "http://picasaweb.google.com/data/feed/base/user/:user_id/albumid/:album_id?alt=json&kind=photo&hl=en_US&fields=entry(title,gphoto:numphotos,media:group(media:content,media:thumbnail))";
      url = url.replace(/:user_id/, user).replace(/:album_id/, album);
      var image = null;
      var images = [];
      $.getJSON(url, function(data) {
        console.log(data);
      });
    }
  };

  $.fn.picasaAlbums = function(user, callback) {
    $.picasa.albums(user, function(images) {
      if (callback) {
        callback(images);
      }
    });
  };

  $.fn.picasaGallery = function(user, album, callback) {
    var scope = $(this);
    $.picasa.images(user, album, function(images) {
      if (callback) {
        callback.apply(scope, images);
      } else {
        var picasaAlbum = "<ul class='picasa-album'>\n";
        $.each(images, function(i, element) {
          picasaAlbum += " <li class='picasa-image'>\n";
          picasaAlbum += " <a class='picasa-image-large' href='" + element.url + "'>\n";
          picasaAlbum += " <img class='picasa-image-thumb' src='" + element.thumbs[1].url + "'/>\n";
          picasaAlbum += " </a>\n";
          picasaAlbum += " </li>\n";
        });
        picasaAlbum += "</ul>";
        scope.append(picasaAlbum);
      }
    });
  }

  var user = "100330718735291173642";
  var album = "5983318595673728481";

  $("#picasa-gallery").picasaGallery("114736267714313794052", "5508004555121989537");

  // adds a gallery of album covers
  $("#picasa-albums").picasaAlbums("114736267714313794052");

  // use the raw image data
  $.picasa.images(user, album, function(images) {
    var picasaAlbum = "<ul class='picasa-album'>\n";
    $.each(images, function(i, element) {
      picasaAlbum += " <li class='picasa-image'>\n";
      picasaAlbum += " <a class='picasa-image-large' href='" + element.url + "'>\n";
      picasaAlbum += " <img class='picasa-image-thumb' src='" + element.thumbs[1].url + "'/>\n";
      picasaAlbum += " </a>\n";
      picasaAlbum += " </li>\n";
    });
    picasaAlbum += "</ul>";
    $("body").prepend(picasaAlbum);
  });

  // use the raw album data
  $.picasa.albums("114736267714313794052", function(albums) {
    $.each(albums, function(index, album) {
      album.images(function(images) {
        
      });
    });
  });

})(jQuery);