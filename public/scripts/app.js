/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

function renderTweets(tweets) {
  let tweetContainer = $('.tweets-container')
  tweets.forEach(function(tweet){
    tweetContainer.append(createTweetElement(tweet));
  });
}


function createTweetElement(tweet) {
  let $tweet = $('<article>').addClass('tweets');
  let $header = $('<header>').addClass('user-info');
  // let $avatar = ;
  // let $name = ;
  // let $handle = ;
  let $tweetContent = $('<h5>').addClass('tweet-content').text(tweet.content.text);
  let $time = $("<footer>").addClass('time').text(tweet.created_at)
  $tweet.append($header);
  $header.append($('<img>').addClass('avatar').attr("src", tweet.user.avatars.small));
  $header.append($('<h4>').addClass('handle').text(tweet.user.handle));
  $header.append($('<h3>').addClass('name').text(tweet.user.name));
  $tweet.append($tweetContent);
  $tweet.append($time); //need to convert time
  return $tweet;
}

function loadTweets(){
  $('.tweets-container').empty()
  $.ajax('http://localhost:8080/tweets', { method: 'GET' })
   .then((response) => {
     renderTweets(response);
    });
}

$(document).ready(function() {
  loadTweets();
  $('#new-tweet').submit(function (e){
    e.preventDefault();
    const serializedTweet = $(this).serialize();
    $.post('/tweets',serializedTweet,(res)=>{
      createTweetElement(serializedTweet);
    })
    tweets.push($(':input').val())
    renderTweets(tweets);
  })
})