$(document).ready(function() {

  $('.answer-button').on('click', function () {
    var pathname = window.location.pathname;
    if(pathname !== "/my_matches") {
      let _id = $(this).parent().attr("id");
      let votedFor = $(this).attr('id');
      fetch('submitVote', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          '_id': _id,
          'votedFor': votedFor
        })
      }).then(res => {
        if (res.ok) {
          window.location.reload()
        } else {
          alert("You have already voted on this poll")
        }
      })
    }
  })

  $('.tweetIt').click(function(){
    let tweetText = $(this).children().text();
    window.open("https://twitter.com/intent/tweet?text=" + encodeURIComponent(tweetText));
  })

  $('.deleteMatch').on('click', function () {
    let _id = $(this).parent().attr("id");

    fetch('deleteMatch', {
      method: 'delete',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        '_id': _id,
      })
    }).then(res => {
      if (res.ok) return res.json()
    }) .then(data => {
        window.location.reload()
      })

  })

  $('.get-stats').on('click', function(){
    let _id = $(this).parent().attr("id");
    window.location.assign("/match" + _id);
  })

})
