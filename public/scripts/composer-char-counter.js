const maxChar = 140;

$(document).ready(function() {
  $("textarea").change(function(){
    $("span.counter").text(maxChar-$("textarea").val().length)
  })
})