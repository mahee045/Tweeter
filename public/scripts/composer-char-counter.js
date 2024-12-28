$(function () {
  //console.log("composer-char-counter.js is ready to gooo!");

  // Select the textarea
  const $textarea = $('.new-tweet textarea');
  const maxChars = 140; 

  // Register the input event
  $textarea.on('input', function () {
    const currentLength = $(this).val().length;
    const remainingChars = maxChars - currentLength; 

    // Traverse the DOM to find the associated counter
    const $counter = $(this).closest('form').find('.counter');

    // Update the counter text
    $counter.text(remainingChars);

    // Add or remove the 'counter-exceeded' class based on remainingChars
    if (remainingChars < 0) {
      $counter.addClass('counter-exceeded');
    } else {
      $counter.removeClass('counter-exceeded');
    }
  });
});
