const maxChar = 140;

$(document).ready(function() {
  $("textarea").on("input", function(){
    $("span.counter").text(maxChar-$("textarea").val().length)
  })
})