---
layout: post
title: Google Maps autocomplete with jQuery UI
---

<div class="img_shadow">
<a href="http://rjshade.github.com/gmaps-autocomplete/">
<img class="page_width" src="/blog/files/2012/03/27/gmaps_autocomplete.png" />
</a>
</div>

# Adding an autocompleting address search to Google Maps

Do you want to add an auto-completing Google Maps search box to your site? Do you want to be able to do reverse geocoding (user clicks map, find closest address)? So did I.

**Demo here**: [rjshade.github.com/gmaps-autocomplete](http://rjshade.github.com/gmaps-autocomplete/)

**Source here**: [github.com/rjshade/gmaps-autocomplete](https://github.com/rjshade/gmaps-autocomplete/)

It's pretty simple. First you need some javascript:

{% highlight html %}
  <!-- google maps -->
  <script type="text/javascript"
          src="http://maps.google.com/maps/api/js?sensor=false">
  </script>

  <!-- jquery -->
  <script type="text/javascript"
          src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js">
  </script>

  <!-- jquery UI -->
  <script type="text/javascript"
          src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.18/jquery-ui.min.js">
  </script>

  <!-- our javascript -->
  <script type="text/javascript" src="js/gmaps.js"></script>
{% endhighlight %}

And you need some HTML containers:

{% highlight html %}
  <body>
   <div id='input'>
      <input id='gmaps-input-address' 
             placeholder='Start typing a place name...'
             type='text' />
      <br/>
      <br/>
      Latitude: <span id='gmaps-output-latitude'></span>
      <br/>
      Longitude: <span id='gmaps-output-longitude'></span>
      <br/>

      <div id='gmaps-error'></div>
    </div>

    <div id='gmaps-canvas'></div>
  </body>
{% endhighlight %}

The magic happens in [js/gmaps.js](https://github.com/rjshade/gmaps-autocomplete/blob/master/js/gmaps.js). There are four use cases:

* A user types an address in the search box and presses enter
  - query the geocoder object with the search string
  - update the map and marker if a result is found
  - otherwise display an error
* A user starts typing an address and then clicks an autocompleted option
  - we know this is a valid address as Google suggested it
  - update the map and marker
* A user clicks a point on the map
  - reverse lookup based on latitude and longitude
  - if address is found then display it
  - otherwise display a warning
* A user clicks and drags an existing marker on the map
  - same as previous use case

The key function is `geocode_lookup( type, value, update )` which talks to the geocoder object. `type` can be `"address"` or `"latlng"` depending on the type of lookup needed. `value` is the search query. `update` is a boolean which triggers centering and updating of the map if true.

{% highlight javascript %}
  var geocoder;
  var map;
  var marker;
  
  // initialise the google maps objects, and add listeners
  function gmaps_init(){
  
    // center of the universe
    var latlng = new google.maps.LatLng(51.751724,-1.255284);
  
    var options = {
      zoom: 2,
      center: latlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
  
    // create our map object
    map = new google.maps.Map(document.getElementById("gmaps-canvas"), options);
  
    // the geocoder object allows us to do latlng lookup based on address
    geocoder = new google.maps.Geocoder();
  
    // the marker shows us the position of the latest address
    marker = new google.maps.Marker({
      map: map,
      draggable: true
    });
  
    // event triggered when marker is dragged and dropped
    google.maps.event.addListener(marker, 'dragend', function() {
      geocode_lookup( 'latLng', marker.getPosition() );
    });
  
    // event triggered when map is clicked
    google.maps.event.addListener(map, 'click', function(event) {
      marker.setPosition(event.latLng)
      geocode_lookup( 'latLng', event.latLng  );
    });
  }
  
  // move the marker to a new position, and center the map on it
  function update_map( geometry ) {
    map.fitBounds( geometry.viewport )
    marker.setPosition( geometry.location )
  }
  
  // fill in the UI elements with new position data
  function update_ui( address, latLng ) {
    $('#gmaps-input-address').autocomplete("close");
    $('#gmaps-input-address').val(address);
    $('#gmaps-output-latitude').html(latLng.lat());
    $('#gmaps-output-longitude').html(latLng.lng());
  }
  
  // Query the Google geocode object
  //
  // type: 'address' for search by address
  //       'latLng'  for search by latLng (reverse lookup)
  //
  // value: search query
  //
  // update: should we update the map (center map and position marker)?
  function geocode_lookup( type, value, update ) {
    // default value: update = false
    update = typeof update !== 'undefined' ? update : false;
  
    request = {};
    request[type] = value;
  
    geocoder.geocode(request, function(results, status) {
      $('#gmaps-error').html('');
      if (status == google.maps.GeocoderStatus.OK) {
        // Google geocoding has succeeded!
        if (results[0]) {
          // Always update the UI elements with new location data
          update_ui( results[0].formatted_address,
                     results[0].geometry.location )
  
          // Only update the map (position marker and center map) if requested
          if( update ) { update_map( results[0].geometry ) }
        } else {
          // Geocoder status ok but no results!?
          $('#gmaps-error').html("Sorry, something went wrong. Try again!");
        }
      } else {
        // Google Geocoding has failed. Two common reasons:
        //   * Address not recognised (e.g. search for 'zxxzcxczxcx')
        //   * Location doesn't map to address (e.g. click in middle of Atlantic)
  
        if( type == 'address' ) {
          // User has typed in an address which we can't geocode to a location
          $('#gmaps-error').html("Sorry! We couldn't find " + value + \
                                 ". Try a different search term, or click the map." );
        } else {
          // User has clicked or dragged marker to somewhere that Google can't do a
          // reverse lookup for. In this case we display a warning.
          $('#gmaps-error').html("Woah... that's pretty remote!\ 
                                 You're going to have to manually enter a place name." );
          update_ui('', value)
        }
      };
    });
  };
  
  // initialise the jqueryUI autocomplete element
  function autocomplete_init() {
    $("#gmaps-input-address").autocomplete({
  
      // source is the list of input options shown in the autocomplete dropdown.
      // see documentation: http://jqueryui.com/demos/autocomplete/
      source: function(request,response) {
  
        // the geocode method takes an address or LatLng to search for
        // and a callback function which should process the results into
        // a format accepted by jqueryUI autocomplete
        geocoder.geocode( {'address': request.term }, function(results, status) {
          response($.map(results, function(item) {
            return {
              label: item.formatted_address, // appears in dropdown box
              value: item.formatted_address, // inserted into input element when selected
              geocode: item                  // all geocode data
            }
          }));
        })
      },
  
      // event triggered when drop-down option selected
      select: function(event,ui){
        update_ui(  ui.item.value, ui.item.geocode.geometry.location )
        update_map( ui.item.geocode.geometry )
      }
    });
  
    // triggered when user presses a key in the address box
    $("#gmaps-input-address").bind('keydown', function(event) {
      if(event.keyCode == 13) {
        geocode_lookup( 'address', $('#gmaps-input-address').val(), true );
  
        // ensures dropdown disappears when enter is pressed
        $('#gmaps-input-address').autocomplete("disable")
      } else {
        // re-enable if previously disabled above
        $('#gmaps-input-address').autocomplete("enable")
      }
    });
  }; // autocomplete_init
  
  $(document).ready(function() { 
    if( $('#gmaps-canvas').length  ) {
      gmaps_init();
      autocomplete_init();
    }; 
  });
{% endhighlight %}

Get it here:

* **Source**: [github.com/rjshade/gmaps-autocomplete](https://github.com/rjshade/gmaps-autocomplete)
* **Demo**: [rjshade.github.com/gmaps-autocomplete](http://rjshade.github.com/gmaps-autocomplete/)
