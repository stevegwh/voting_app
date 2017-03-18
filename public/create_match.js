$(document).ready(function(){
  $('#add-option').on('click', function(){
    let options = $('#options').children().length;
    let count = options + 1;
    console.log($('#options').children())
    if(options < 5) {


      $('#options').append('\
      <div>\
        <input class="steve-col" type="text" name="answer'+ count +'" placeholder="Option">\
        <div class=" btn btn-danger btn-xs remove-option">X</div>\
      </div>');
    } else {
      alert("Sorry, you cannot have more than " + options + " options");
    }
  })

  $(document).on('click', '.remove-option', function() {
    let options = $('#options').children().length;
    let count = 1;
    $(this).parent().remove();
    $('input', $('#options')).each(function () {
        $(this).attr("name", "answer" + count)
        count++;
    });

  });
})
