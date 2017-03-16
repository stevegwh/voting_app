$(document).ready(function(){
  $('#tweetIt').click(function(){
    let tweetText = $('#tweetText').html();
    window.open("https://twitter.com/intent/tweet?text=" + encodeURIComponent(tweetText));
  })

})
