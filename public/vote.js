$(document).ready(function() {

  $('.answer-button').on('click', function () {
    let _id = $(this).parent().attr("id");
    let question_vote = $(this).attr('id') + "_votes";
    let answer = $(this).attr('id');
    let user = $('#user').text()
    console.log(user);
    fetch('submitVote', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        '_id': _id,
        'questionToUpdate': question_vote,
        'user': user,
        'answer': answer
      })
    }).then(res => {
      if (res.ok) {
        window.location.reload()
      } else {
        alert("You have already voted for that")
      }
    })
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

})
