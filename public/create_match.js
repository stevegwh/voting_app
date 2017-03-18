$(document).ready(function(){
  $('#add-option').on('click', function(){
    let count = $("#options").children().length + 1;

    $('#options').append('\
    <div>\
      <input class="steve-col" type="text" name="answer'+ count +'" placeholder="Option">\
      <div class=" btn btn-danger btn-xs remove-option">X</div>\
    </div>');
  })

  $('.remove-option').on('click', function(){

  })
})
