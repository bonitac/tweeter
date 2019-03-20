const maxChar = 140;

$(document).ready(function() {
  $(":input").change(function(){
    $("span.counter").text(maxChar-$(":input").val().length)
  })
  
})