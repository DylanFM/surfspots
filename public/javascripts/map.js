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
      // Display coords
			jQuery('.position-value').text(latlng.lat() + ',' + latlng.lng());
			
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
        // Display coords info
				displayThereInfo(result, options);
			});
		});
	});
});

function displayThereInfo (result, options)
{
	var valid = Mapifies.SearchCode(result.Status.code);
	if (valid.success) {
		var output = ['<ul>'];
		jQuery.each(result.Placemark, function(i, point){
			output.push('<li>' + point.address + '</li>');
		});
		output.push('</ul>');
		jQuery('.address-value').html(output.join(''));
	}
}