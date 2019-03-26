//Client-side JS logic goes here

function createTweetElement(tweet) {
  let $tweet = $('<article>').addClass('tweets');
  let $header = $('<header>').addClass('user-info');
  let $footer = $('<footer>').addClass('tweet-footer');
  let $span = $('<span>').addClass('icons');
  //Appending header to Tweet and appending other elements to header
  $tweet.append($header);
  $header.append($('<img>').addClass('avatar').attr("src", tweet.user.avatars.small));
  $header.append($('<h4>').addClass('handle').text(tweet.user.handle));
  $header.append($('<h3>').addClass('name').text(tweet.user.name));
  //Appending Tweet Content to Tweet
  $tweet.append($('<h5>').addClass('tweet-content').text(tweet.content.text));
  //Appending footer to Tweet and apending other elements to footer
  $tweet.append($footer);
  $footer.append($('<h5>').addClass('time').text(timeSince(new Date(tweet.created_at)).toLocaleString()));
  $footer.append($span);
  $span.append($('<img>').addClass('flag').attr("src", "/images/flag.png"));
  $span.append($('<img>').addClass('heart').attr("src", "/images/heart.png"));
  $span.append($('<img>').addClass('retweet').attr("src", "/images/retweet.png"));

  return $tweet;
}

function renderTweets(tweets) {
  let tweetContainer = $('.tweets-container')
  tweets.forEach(function(tweet){
    tweetContainer.prepend(createTweetElement(tweet));
  });
  return tweetContainer;
}

function loadTweets(){
  $('.tweets-container').empty()
  $.ajax('/tweets', { method: 'GET' })
   .then((response) => {
     renderTweets(response);
    });
}

function compose(){
  $('.compose').slideToggle('fast');
  $('textarea').focus();
}

function timeSince(timeStamp) {
  var now = new Date();
  secondsPast = (now.getTime() - timeStamp.getTime()) / 1000;
  if(secondsPast < 60){
    return parseInt(secondsPast) + 's';
  }
  //calculate mins since post if greater than 60 seconds
  if(secondsPast < 3600){
    return parseInt(secondsPast/60) + 'm';
  }
  //calculates hours since post if greater than 60min
  if(secondsPast <= 86400){
    return parseInt(secondsPast/3600) + 'h';
  }
  //if time past 24 hrs display regular date
  if(secondsPast > 86400){
      day = timeStamp.getDate();
      month = timeStamp.toDateString().match(/ [a-zA-Z]*/)[0].replace(" ","");
      year = timeStamp.getFullYear() == now.getFullYear() ? "" :  " "+timeStamp.getFullYear();
      return day + " " + month + year;
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
        $('span.counter').text(140);
      })
    }
  })
})