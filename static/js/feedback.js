$(function feedback() {
  function updateFeedback(data) {
    const render = [];
    $.each(data, function createHtml(key, item) {
      render.push(`
        <div class="feedback-item item-list media-list">
          <div class="feedback-item media">
            <div class="feedback-info media-body">
              <div class="feedback-head">
                <div class="feedback-title">${item.title}</div>
                <small>by ${item.name}</small>
              </div>
              <div class="feedback-message">
                ${item.message}
              </div>
            </div>
          </div>
        </div>
      `);
    });
    $('.feedback-items').html(render.split('\n'));
  }

  $('.feedback-form').submit(function submitFeedback(e) {
    e.preventDefault();
    $.post(
      '/feedback/api',
      {
        name: $('#feedback-form-name').val(),
        email: $('#feedback-form-email').val(),
        title: $('#feedback-form-title').val(),
        message: $('#feedback-form-message').val(),
      },
      updateFeedback
    );
  });
});
