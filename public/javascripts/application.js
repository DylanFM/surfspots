$(document).ready(function() {
  // Setup ajaxy form love
  var options = {
                  success: showResponse,
                  type: 'POST',
                  resetForm: true
                };
  $('form.remote').ajaxForm(options);  //Remote forms go ajax style plz
});

function showResponse (responseText, statusText)
{
  $('form.remote fieldset').prepend('<div class="success">Surf spot created.</div>');
}
