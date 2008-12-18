jQuery(document).ready(function()
{
  // Setup copy links
  $('a#copy-all-pos-info').click(cpAll);
  $('#pos_coords').click(cpCoords);
  $('#pos_name').click(cpName);
  $('#pos_town').click(cpTown);
  $('#pos_region').click(cpRegion);
  $('#pos_postcode').click(cpPostcode);
  $('#pos_state').click(cpState);
  
  // Mappy stuff
	jQuery('#map1').jmap('init',{
		'mapType':'hybrid',
		'mapCenter':[-28.459033019728043,136.23046875],
		'mapZoom':4,
		'mapEnableType':true,
		'mapEnableGoogleBar':true,
		'mapDisableDoubleClickZoom':true,
		'mapShowjMapsIcon':false,
	},
	function (map, element, options)
	{
    // Search on double-click
	  GEvent.addListener(map, 'dblclick', function(overlay, latlng)
		{
      // Print coords
      $('#pos_latitude').text(latlng.lat());
  	  $('#pos_longitude').text(latlng.lng());
			
      // Search for info on coords
			jQuery('#map1').jmap('SearchAddress', {
				'query': new GLatLng(latlng.lat(), latlng.lng()),
				'returnType':'getLocations'
			}, function(result, options)
			{
        // Display coord's info
				displayThereInfo(result, options);
			});
		});
		
    // Add markers of existing surf spots
    $.getJSON('/surfspots.json', function(data) 
    {
      jQuery('#map1').jmap('CreateMarkerManager', {'markerManager':'MarkerManager'});
      for (var i=0; i < data.length; i++) 
      {
        var spot = data[i];
        jQuery('#map1').jmap('AddMarker', {'pointLatLng': [spot.latitude,spot.longitude]});
      }
    });
	});
});

function displayThereInfo (result, options)
{
	var valid = Mapifies.SearchCode(result.Status.code);
	if (valid.success) {
	  var info = result.Placemark[0].AddressDetails.Country;
    // console.log(info);
	  $('#pos_state').text(info.AdministrativeArea.AdministrativeAreaName);
	  $('#pos_town').text(info.AdministrativeArea.Locality.LocalityName);
	  $('#pos_postcode').text(info.AdministrativeArea.Locality.PostalCode.PostalCodeNumber);
	  $('#pos_name').text(info.AdministrativeArea.AddressLine);
	}
}

// Functions for copying
function cpAll ()
{
  cpCoords();
  // cpName();
  cpTown();
  // cpRegion();
  cpPostcode();
  cpState();
  return false;
}
function cpCoords ()
{
  var lat = $('#pos_longitude').text().slice(0,10);
  var lng = $('#pos_latitude').text().slice(0,10);
  $('#surfspot_longitude').attr('value',lat);
  $('#surfspot_latitude').attr('value',lng);
}
function cpName ()
{
  $('#surfspot_name').attr('value',$('#pos_name').text());
}
function cpTown ()
{
  $('#surfspot_town').attr('value',$('#pos_town').text());
}
function cpRegion ()
{
  $('#surfspot_region').attr('value',$('#pos_region').text());
}
function cpPostcode ()
{
  $('#surfspot_postcode').attr('value',$('#pos_postcode').text());
}
function cpState ()
{
  $('#surfspot_state').attr('value',$('#pos_state').text());
}