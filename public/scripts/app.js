/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


let tweets = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
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
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];


function renderTweets(tweets) {
  let tweetContainer = $('.tweets-container')
  tweets.forEach(function(tweet){
    tweetContainer.append(createTweetElement(tweet));
  });
}


function createTweetElement(tweet) {
  let $tweet = $('<article>').addClass('tweets');
  let $header = $('<header>').addClass('user-info');
  let $avatar = $('<img>').addClass('avatar').attr("src", tweet.user.avatars.small);
  let $name = $('<h3>').addClass('name').text(tweet.user.name);
  let $handle = $('<h4>').addClass('handle').text(tweet.user.handle);
  let $tweetContent = $('<h5>').addClass('tweet-content').text(tweet.content.text);
  let $time = $("<footer>").addClass('time').text(tweet.created_at)
  $tweet.append($header);
  $header.append($avatar);
  $header.append($handle);
  $header.append($name);
  $tweet.append($tweetContent);
  $tweet.append($time);
  return $tweet;
}

$(document).ready(function() {
  renderTweets(tweets);
  $.ajax('http://localhost:8080/').then(console.log("ajax"))
  
})

