const maxChar = 140;

function errorMessage(tweet){
  if (tweet.length > 140){
    $('.error-message').text("Error: Over character limit")
    $("span.counter").css("color","red")
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
  $("textarea").on("input", function(){
    $("span.counter").css("color","blueviolet")
    $("span.counter").text(maxChar-$("textarea").val().length)
  })
})