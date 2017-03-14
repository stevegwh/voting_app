$(document).ready(function() {



  $('.answer-button').on('click', function () {
    let _id = $(this).parent().attr("id");
    let question_vote = $(this).attr('id') + "_votes";

    fetch('submitVote', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        '_id': _id,
        'questionToUpdate': question_vote
      })
    }).then(res => {
      if (res.ok) return res.json()
    }) .then(data => {
        window.location.reload()
      })

  })

})
