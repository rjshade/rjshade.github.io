function FlickrLargePhotoSet( container ){
    //SET API CALL BASED ON INPUT
    var apiCall = "http://api.flickr.com/services/rest/?format=json&method=flickr.photosets.getList&api_key=4eaa99860024d250ecb33c899f0c9956&user_id=89466603@N00&jsoncallback=?";

    //PRINT API CALL (DEBUG)    
    //$("<span>").html(apiCall+"<br>").appendTo("body");

    //SEND API CALL AND RETURN RESULTS TO A FUNCTION    
    $.getJSON(apiCall, function(data){
        //$("<br/><span>").html(data+"<br>").appendTo("body");

        //LOOP THROUGH DATA
        $.each(data.photosets.photoset, function(i,photoset){
            //$("<br/><span>").html(photoset+"<br>").appendTo("body");
            // + "m.jpg" for small, + "z.jpg" for medium
            var img_src = "http://farm" + photoset.farm + ".static.flickr.com/" + photoset.server + "/" + photoset.primary + "_" + photoset.secret + "_" + "m.jpg";

            var a_href = "http://www.flickr.com/photos/rjshade/sets/" + photoset.id + "/";
            $("<img class=\"flickr_photoset_thumb\"/>").attr("src", img_src).appendTo(container)
            .wrap(("<div class='flickr_photoset_third_width'></div>"))
            .wrap(("<a class=\"no_border\" href='" + a_href + "'></a>"))
        });
    });
};

function GetAllImagesFromSet( setID, container ) {
    //SET API CALL BASED ON INPUT

    var apiCall = "http://api.flickr.com/services/rest/?format=json&method=flickr.photosets.getPhotos&photoset_id=" + setID + "&per_page=500&page=1&api_key=4eaa99860024d250ecb33c899f0c9956&user_id=89466603@N00&jsoncallback=?";
    //PRINT API CALL (DEBUG)    
    //$("<span>").html(apiCall+"<br>").appendTo("body");

    //SEND API CALL AND RETURN RESULTS TO A FUNCTION    
    $.getJSON(apiCall, function(data){
        //$("<br/><span>").html(data+"<br>").appendTo("body");

        //LOOP THROUGH DATA
        for (var i=0; i < data.photoset.photo.length; i++) {
          photo = data.photoset.photo[i];
          var img_src = "http://farm" + photo.farm + ".static.flickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + "_" + "s.jpg";

          var a_href = "http://www.flickr.com/photos/rjshade/" + photo.id + "/lightbox/";
          $("<img class=\"flickr_photoset_thumb\"/>").attr("src", img_src).appendTo(container)
          //.wrap(("<div class='flickr_photoset_third_width'></div>"))
          .wrap(("<a class='no_border' href='" + a_href + "'></a>"))
        }
    });
}

function GetRandomImagesFromFlickrPhotoset( setID, numImages, container ) {
    //TODO: If numImages > number of photos in seddtID then we will enter infinite loop...

    //SET API CALL BASED ON INPUT
    var apiCall = "http://api.flickr.com/services/rest/?format=json&method=flickr.photosets.getPhotos&photoset_id=" + setID + "&per_page=500&page=1&api_key=4eaa99860024d250ecb33c899f0c9956&user_id=89466603@N00&jsoncallback=?";

    //PRINT API CALL (DEBUG)    
    //$("<span>").html(apiCall+"<br>").appendTo("body");

    //SEND API CALL AND RETURN RESULTS TO A FUNCTION    
    $.getJSON(apiCall, function(data){
        //$("<br/><span>").html(data+"<br>").appendTo("body");

        //LOOP THROUGH DATA
        var idxs=[];
        for (var i=0; i < numImages; i++) {
          // make sure we don't 
          var idx = Math.floor(Math.random() * data.photoset.photo.length);
          while( $.inArray(idx, idxs) != -1 ) {
            idx = Math.floor(Math.random() * data.photoset.photo.length);
          }

          idxs.push(idx);
          photo = data.photoset.photo[idx];
          var img_src = "http://farm" + photo.farm + ".static.flickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + "_" + "s.jpg";

          var a_href = "http://www.flickr.com/photos/rjshade/" + photo.id + "/lightbox/";
          $("<img class=\"flickr_photoset_thumb\"/>").attr("src", img_src).appendTo(container)
          //.wrap(("<div class='flickr_photoset_third_width'></div>"))
          .wrap(("<a class='no_border' href='" + a_href + "'></a>"))
        }
    });
}


function FlickrPhotoSet( container ){

    //SET API CALL BASED ON INPUT
    var apiCall = "http://api.flickr.com/services/rest/?format=json&method=flickr.photosets.getPhotos&photoset_id=72157625498825085&per_page=10&page=1&api_key=4eaa99860024d250ecb33c899f0c9956&jsoncallback=?";

    //PRINT API CALL (DEBUG)    
    //$("<span>").html(apiCall+"<br>").appendTo("body");

    //SEND API CALL AND RETURN RESULTS TO A FUNCTION    
    $.getJSON(apiCall, function(data){

        //LOOP THROUGH DATA
        $.each(data.photoset.photo, function(i,photo){

        //LINK TO IMAGE SOURCE
        var img_src = "http://farm" + photo.farm + ".static.flickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + "_" + "s.jpg";

        //LINK TO IMAGE PAGE (REQUIRED BY FLICKR TOS)
        var a_href = "http://www.flickr.com/photos/" + data.photoset.owner + "/" + photo.id + "/";

        //PLACE IMAGE IN IMAGE TAG AND APPEND TO IMAGES DIV 
        $("<img/>").attr("src", img_src).appendTo(container)

        //WRAP IN LINK
        .wrap(("<a href='" + a_href + "'></a>"))
      });

    });
};


