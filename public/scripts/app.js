/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


let tweets = [{
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
}];


function renderTweets(tweets) {
//   // loops through tweets
//   // calls createTweetElement for each tweet
//   // takes return value and appends it to the tweets container
//   for (let i = 0; i < tweets.length; i++){
//     if tweets[i]
//   } 
  // tweets.forEach(tweet => {
    $('#tweets-container').append(createTweetElement(tweets));
  // });
   // to add it to the page so we can make sure it's got all the right elements, classes, etc.
}


function createTweetElement(tweets) {
  const newTweet = $("#tweets-container").append($("<article>").text());
  $('newTweet').append($("<h3>").text(tweets[0].user.name));
  $('newTweet').append($("<img>").text(tweets[0].user.avatars.small));
  $('newTweet').append($("<h4>").text(tweets[0].user.handle));
  $('newTweet').append($("<h5>").text(tweets[0].user.content));
  $('newTweet').append($("<footer>").text(tweets[0].created_at));

  // let $tweet = $('<article>').addClass('tweet');
  // $tweet.append(<'header'>).text(tweets[[0]])
  //   .addClass('')
  // // ...
  // return $tweet;
}

// renderTweets(data);
$(document).ready(function() {

  renderTweets(createTweetElement(tweets));
  
})

