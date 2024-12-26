

$(document).ready(function() {
  console.log("✅ composer-char-counter.js is successfully loaded!");

  // Select the textarea
  const $textarea = $('.new-tweet textarea');
  const maxChars = 140; // Character limit

  // Register the input event
  $textarea.on('input', function() {
    const currentLength = $(this).val().length; // Get the length of textarea value
    const remainingChars = maxChars - currentLength; // Calculate remaining characters

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