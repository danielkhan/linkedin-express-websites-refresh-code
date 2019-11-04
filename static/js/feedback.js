$(function() {
  $.getJSON('api', updateFeedback);

  $('.feedback-form').submit(function(e) {
    e.preventDefault();
    $.post(
      'api',
      {
        name: $('#feedback-form-name').val(),
        title: $('#feedback-form-title').val(),
        message: $('#feedback-form-message').val(),
      },
      updateFeedback
    );
  });

  $('.feedback-messages').on('click', function(e) {
    if (e.target.className == 'glyphicon glyphicon-remove') {
      $.ajax({
        url: `api/${  e.target.id}`,
        type: 'DELETE',
        success: updateFeedback,
      }); // ajax
    } // the target is a delete button
  }); // feedback messages

  function updateFeedback(data) {
    $('.feedback-items').html(output);
  }
});
