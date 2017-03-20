$(document).ready(function() {
  var pathname = window.location.pathname;
  if(pathname !== "/my_matches") {
  $(function(){
   $(document).attr("title", "Grudge Match! " + $('.facebook-share').children(":first").text());
  });
  }


  $(document).on("click touchstart", ".answer-button", function () {
    if(pathname !== "/my_matches") {
      let _id = $(this).parent().attr("id");
      let votedFor = $(this).attr('id');
      votedFor = votedFor.match(/\d+/)[0]
      fetch('submitVote', {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          '_id': _id,
          'votedFor': votedFor
        })
      }).then(function(res) {
        if (res.ok) {
          window.location.reload()
        } else {
          alert("You have already voted on this poll")
        }
      })
    }

  });

$(document).on("click touchstart", ".tweetIt", function () {
  let tweetText = $(this).children().text();
  window.open("https://twitter.com/intent/tweet?text=" + encodeURIComponent(tweetText));

});

  $(document).on("click touchstart", ".deleteMatch", function () {

      let _id = $(this).parent().attr("id");

      fetch('deleteMatch', {
        method: 'delete',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          '_id': _id,
        })
      }).then(function(res) {
        if (res.ok) return res.json()
      }) .then(function(data) {
          window.location.reload()
        })
    });


  $(document).on("click touchstart", ".get-stats", function () {
    let _id = $(this).parent().attr("id");
    window.location.assign("/match" + _id);
  });

  $(document).on("click touchstart", ".facebook-share", function () {
    let url = $(this).children(":last").text();
    let facebook_url =  encodeURI("https://www.facebook.com/sharer/sharer.php?u="+ url +"&t=");
    window.open(facebook_url, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');
  });

  $(document).on("click touchstart", ".edit-match", function () {
    let _id = $(this).parent().attr("id");
    window.location.assign("/edit_match" + _id);
  });



})
