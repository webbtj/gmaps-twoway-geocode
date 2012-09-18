var map;
function initialize() {
  var myOptions = {
    zoom: 8,
    center: new google.maps.LatLng(45.3657733, -63.2869407),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(document.getElementById('map_canvas'),
    myOptions);
}

google.maps.event.addDomListener(window, 'load', initialize);

var marker = new google.maps.Marker();
marker.setMap(map);

(function($) {
    $(document).ready(function() {
		$('#code').click(function(){
			geocoder = new google.maps.Geocoder();
			geocoder.geocode({
				address : $('#address').val()
			}, function(result, status){
				output = '';
				if(status=='OK'){
					lat = result[0].geometry.location.lat();
					lng = result[0].geometry.location.lng();
					latlng = new google.maps.LatLng(lat,lng);
					output = 'Lat:<span id="result_lat">'+lat+'</span> , Lng:<span id="result_lng">'+lng+'</span>';
					$('#get-lat-lng').removeAttr('disabled');
					marker.setPosition(latlng);
					marker.setMap(map);
				}else{
					output = 'Could not geocode address "'+$('#address').val()+'"';
					$('#get-lat-lng').attr('disabled', 'disabled');
				}
				map.setCenter(latlng);
				$('#results').html(output);
			});
		});

		$('#reverse').click(function(){
			geocoder = new google.maps.Geocoder();
			latlng = new google.maps.LatLng($('#lat').val(), $('#lng').val());
			geocoder.geocode({
				location : latlng
			}, function(result, status){
				console.log(result, status);
				output = '';
				if(status=='OK'){
					marker.setPosition(new google.maps.LatLng($('#lat').val(), $('#lng').val()));
					marker.setMap(map);
					for(var i=0; i<result.length; i++){
						console.log(result[i]);
						output += result[i].formatted_address + '<br />';
					}
				}else{
					output = 'Could not find an address at: '+$('#lat').val()+', '+$('#lng').val();
				}
				map.setCenter(latlng);
				$('#get-lat-lng').attr('disabled', 'disabled');
				$('#results').html(output);
			});
		});

		$('#get-lat-lng').click(function(){
			$('#lat').val($('#result_lat').html());
			$('#lng').val($('#result_lng').html());
		});
    });
})(jQuery);