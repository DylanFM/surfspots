jQuery(document).ready(function()
{
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
	  GEvent.addListener(map, 'dblclick', function(overlay, latlng)
		{
      // Print coords
      $('#pos_latitude').text(latlng.lat());
  	  $('#pos_longitude').text(latlng.lng());
		  
      // Place a marker
      // jQuery('#map1').jmap('AddMarker', {
      //        'pointLatLng': [latlng.lat(), latlng.lng()],
      //        'pointIsRemovable':true
      //      });
			
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

