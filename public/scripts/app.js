/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

function renderTweets(tweets) {
  let tweetContainer = $('.tweets-container')
  tweets.forEach(function(tweet){
    tweetContainer.prepend(createTweetElement(tweet));
  });
  return tweetContainer;
}

function compose(){
  $('.compose').slideToggle('fast');
  $('textarea').focus();
}


function createTweetElement(tweet) {
  let $tweet = $('<article>').addClass('tweets');
  let $header = $('<header>').addClass('user-info');
  let $time = $("<footer>").addClass('time').text(new Date(tweet.created_at).toLocaleString());
  $tweet.append($header);
  $header.append($('<img>').addClass('avatar').attr("src", tweet.user.avatars.small));
  $header.append($('<h4>').addClass('handle').text(tweet.user.handle));
  $header.append($('<h3>').addClass('name').text(tweet.user.name));
  $tweet.append($('<h5>').addClass('tweet-content').text(tweet.content.text));
  $tweet.append($time);
  return $tweet;
}

function loadTweets(){
  $('.tweets-container').empty()
  $.ajax('/tweets', { method: 'GET' })
   .then((response) => {
     renderTweets(response);
    });
}

function errorMessage(tweet){
  if (tweet.length > 140){
    $('.error-message').text("Error: Over character limit")
    return false;
  } else if (tweet === ""){
    $('.error-message').text("Please enter your tweet")
    return false;
  } else{
    $('.error-message').text("")
    return true;
  }
}

$(document).ready(function() {
  loadTweets();
  $('#new-tweet').submit(function (e){
    e.preventDefault();
    let serializedTweet = $(this).serialize();    
    if (errorMessage($('textarea').val())){
    $.post('/tweets',serializedTweet,(res)=>{
        loadTweets();
        $('#new-tweet textarea').val("");
      })
    }
  })
})