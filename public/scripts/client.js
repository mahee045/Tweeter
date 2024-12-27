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
const createTweetElement = function (tweet) {
  const $tweet = $(`
    <article class="tweet">
      <header>
        <div class="tweet-user">
          <img src="${tweet.user.avatars}" alt="User Avatar">
          <div class="tweet-user-info">
            <span class="tweet-name">${tweet.user.name}</span>
            <span class="tweet-handle">${tweet.user.handle}</span>
          </div>
        </div>
      </header>
      <p>${tweet.content.text}</p>
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

  return $tweet;
};
// Event Listener and Core Logic
$(function () {
  console.log('✅ Client-side JS is loaded and ready to go!');

  // Event Listener for Form Submission
  $('.new-tweet form').on('submit', function (event) {
    event.preventDefault(); // Prevent default page reload

    // Grab and validate the tweet text
    const $tweetText = $('#tweet-text').val().trim();

    // Validation for Empty Tweet
    if ($tweetText === '') {
      alert('⚠️ Tweet cannot be empty!');
      return;
    }

    // Validation for Tweet Length
    if ($tweetText.length > 140) {
      alert('⚠️ Tweet exceeds 140 characters!');
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
        
        // Reload tweets dynamically without clearing the form
        loadTweets();
      },
      error: function (error) {
        console.error('❌ Error posting tweet:', error);
        alert('🚨 Failed to post the tweet. Please try again later.');
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
        alert('🚨 Failed to fetch tweets. Please try again later.');
      }
    });
  };

  // Initial Load of Tweets on Page Load
  loadTweets();
});