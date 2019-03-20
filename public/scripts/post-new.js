function addTweet(content){
  var button = document.querySelector('input[value=Tweet]');
  var text = document.querySelector('textarea');
  var counter = document.querySelector('span[class=counter]')
  var counterNum = Number(counter.outerText);
  
  var list = document.querySelector('article');
  var text = document.createTextNode(content);
  var item = document.createElement('article');
  item.appendChild(text);
  list.appendChild(item);
}


$(document).ready(function() {

  button.addEventListener('click',function(){
    event.preventDefault();
    addTweet(text.value); })

}