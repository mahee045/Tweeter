// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

// Function to render multiple tweets
const renderTweets = function(tweets) {
  const $container = $('.tweets-container'); // Ensure this selector matches the one in your HTML
  $container.empty(); // Optional: Clear existing tweets first
  tweets.forEach(tweet => {
    const $tweetElement = createTweetElement(tweet);
    $container.prepend($tweetElement);
  });
}


// Function to create a tweet element
const createTweetElement = function(tweet) {
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
        <span>${new Date(tweet.created_at).toLocaleString()}</span>
        <div>
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
      </footer>
    </article>
  `);

  return $tweet; // Return the tweet element
};

renderTweets(data);

//Event listener
$(function () {
  console.log('✅ Client-side JS is loaded and ready to go!');

  // Event listener for form submission
  $('.new-tweet form').on('submit', function (event) {
    event.preventDefault(); // Prevent default page reload

    //Serialize the form data
    const formData = $(this).serialize(); // Converts form data to a query string

    console.log('📝 Serialized Form Data:', formData);

    // Send an AJAX POST request
    $.ajax({
      type: 'POST', 
      url: '/tweets', 
      data: formData, 
      success: function (response) {
        console.log('✅ Tweet successfully posted!', response);

        // Clear the form after submission
        $('#tweet-text').val('');
        $('.counter').text(140); // Reset character counter

        // Optionally, fetch and re-render the tweets
        loadTweets();
      },
      error: function (error) {
        console.error('❌ Error posting tweet:', error);
      }
    });
  });

  // Function to fetch and render tweets (optional for this step)
  const loadTweets = function () {
    $.ajax({
      type: 'GET',
      url: '/tweets',
      success: function (tweets) {
        console.log('✅ Tweets fetched successfully:', tweets);
        renderTweets(tweets); 
      },
      error: function (error) {
        console.error('❌ Error fetching tweets:', error);
      }
    });
  };
});


