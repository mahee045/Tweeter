//define max word limit
const maxChars = 140;

// Function to Render Multiple Tweets
const renderTweets = function (tweets) {
  const $container = $('.tweets-container'); // Ensure this selector matches the one in your HTML
  $container.empty(); // Optional: Clear existing tweets first
  tweets.forEach((tweet) => {
    const $tweetElement = createTweetElement(tweet);
    $container.prepend($tweetElement); // Add the newest tweet at the top
  });
};

//  Function to Create a Single Tweet Element
// Function to Create a Tweet Element
const createTweetElement = function (tweet) {
  const $tweet = $(`
    <article class="tweet">
      <header>
        <div class="tweet-user">
          <img src="${tweet.user.avatars}" alt="User Avatar">
          <div class="tweet-user-info"></div>
        </div>
      </header>
      <div class="tweet-content"></div>
      <footer>
        <span>${timeago.format(tweet.created_at)}</span>
        <div>
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
      </footer>
    </article>
  `);

  // Securely append user name and handle
  $tweet.find('.tweet-user-info').append(
    $('<span>').addClass('tweet-name').text(tweet.user.name),
    $('<span>').addClass('tweet-handle').text(tweet.user.handle)
  );

  // Securely set tweet content
  $tweet.find('.tweet-content').append(
    $('<p>').text(tweet.content.text)
  );

  return $tweet;
};

//140 limit and empty tweet validation 
const isTweetValid = function (tweetText) {
  if (tweetText.trim() === '') {
    showError(' Tweet cannot be empty!');
    return false;
  }

  if (tweetText.length > maxChars) {
    showError(` Tweet exceeds ${maxChars} characters!`);
    return false;
  }

  return true;
};


// Function to Display Validation Errors
const showError = function (message) {
  const $errorContainer = $('.tweet-error');
  const $errorMessage = $errorContainer.find('.error-message');

  $errorMessage.text(message); // Set the error message
  $errorContainer.slideDown(); // Animate the error container into view
};

// Function to Hide Validation Errors
const hideError = function () {
  $('.tweet-error').slideUp(); // Animate the error container out of view
};

// Event Listener for Form Submission
$(function () {
  console.log('✅ Client-side JS is loaded and ready to go!');

  $('.new-tweet form').on('submit', function (event) {
    event.preventDefault(); // Prevent default page reload

    // Hide previous errors before validation
    hideError();

    // Grab and validate the tweet text
    const $tweetText = $('#tweet-text').val().trim();

    // Validation for Empty Tweet
    if ($tweetText === '') {
      showError(' Tweet cannot be empty!');
      return;
    }

    // Validation for Tweet Length
    if ($tweetText.length > maxChars) {
      showError(' Tweet exceeds 140 characters!');
      return;
    }

    // Serialize the form data
    const formData = $(this).serialize();

    console.log('📝 Serialized Form Data:', formData);

    // AJAX POST Request to Submit a Tweet
    $.ajax({
      type: 'POST',
      url: '/tweets',
      data: formData,
      success: function () {
        console.log('✅ Tweet successfully posted!');
        
        // Clear textarea and reset counter dynamically
        $('#tweet-text').val('');
        $('.counter').text(maxChars);

        // Hide error messages if any are visible
        hideError();

        // Reload tweets dynamically
        loadTweets();
      },
      error: function (error) {
        console.error('❌ Error posting tweet:', error);
        showError('🚨 Failed to post the tweet. Please try again later.');
      }
    });
  });

  // Function to Fetch and Render Tweets Dynamically
  const loadTweets = function () {
    $.ajax({
      type: 'GET',
      url: '/tweets',
      dataType: 'json',
      success: function (tweets) {
        console.log('✅ Tweets fetched successfully:', tweets);
        renderTweets(tweets);
      },
      error: function (error) {
        console.error('❌ Error fetching tweets:', error);
        showError('🚨 Failed to fetch tweets. Please try again later.');
      }
    });
  };

  // Initial Load of Tweets on Page Load
  loadTweets();
});
