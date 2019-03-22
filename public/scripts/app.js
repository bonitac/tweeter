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
  let $footer = $("<footer>").addClass('tweet-footer')
  $footer.append($('<h5>')).addClass('time').text(timeSince(new Date(tweet.created_at)).toLocaleString());
  // $footer.append($(<'img'>)).addClass('flag').attr("src", "/images/flag.png");

  // <img class="retweet" src="/images/heart.png">
  // <img class="like" src="/images/retweet.png">

  $tweet.append($header);
  $header.append($('<img>').addClass('avatar').attr("src", tweet.user.avatars.small));
  $header.append($('<h4>').addClass('handle').text(tweet.user.handle));
  $header.append($('<h3>').addClass('name').text(tweet.user.name));
  $tweet.append($('<h5>').addClass('tweet-content').text(tweet.content.text));
  $tweet.append($footer);

  return $tweet;
}

function timeSince(timeStamp) {
  var now = new Date(),
    secondsPast = (now.getTime() - timeStamp.getTime()) / 1000;
  if(secondsPast < 60){
    return parseInt(secondsPast) + 's';
  }
  if(secondsPast < 3600){
    return parseInt(secondsPast/60) + 'm';
  }
  if(secondsPast <= 86400){
    return parseInt(secondsPast/3600) + 'h';
  }
  if(secondsPast > 86400){
      day = timeStamp.getDate();
      month = timeStamp.toDateString().match(/ [a-zA-Z]*/)[0].replace(" ","");
      year = timeStamp.getFullYear() == now.getFullYear() ? "" :  " "+timeStamp.getFullYear();
      return day + " " + month + year;
  }
}

function loadTweets(){
  $('.tweets-container').empty()
  $.ajax('/tweets', { method: 'GET' })
   .then((response) => {
     renderTweets(response);
    });
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
        $('span.counter').text(140);
      })
    }
  })
})