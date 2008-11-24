$(document).ready(function() {
  // Setup ajaxy form love
  var options = {
                  beforeSubmit: removeMessages,
                  success: showResponse,
                  type: 'POST',
                  resetForm: true,
                  dataType: 'json'
                };
  $('form.remote').ajaxForm(options);  //Remote forms go ajax style plz
});

function removeMessages ()
{
  $('form.remote .message').remove();
}

function showResponse (data)
{
  $('form.remote fieldset').prepend(buildNoticesDisplay(data));
}

function buildNoticesDisplay (data)
{
  // Takes json object
  var markup = '';
  if (data.notice) 
  {
    // - .notice => put in a success div
    markup += '<div class="success message">'+data.notice+'</div>';
  }
  if (data.error && data.error[0] != 'undefined')
  {
    // - .error => contains an array. [0] => title msg, [1] => n error messages
    markup += '<div class="error message">'+data.error[0];
    if (data.error[1] != 'undefined' && data.error[1].length > 0) 
    {
      markup += '<ul>';
      for (var i=0; i < data.error[1].length; i++) 
      {
        markup += '<li>'+data.error[1][i]+'</li>';
      }
      markup += '</ul>';
    }
    markup += '</div>';
  }
  return markup;
}
