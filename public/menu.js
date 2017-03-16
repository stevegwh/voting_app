$(document).ready(function(){
  var pathname = window.location.pathname;
  pathname= pathname.replace('/', "#");
  console.log(pathname);
  $('li').removeClass('');
  if(pathname !== "#") {
    $(pathname).addClass('active');
  }


  $(document).click(function (event) {
      var clickover = $(event.target);
      var $navbar = $(".navbar-collapse");
      var _opened = $navbar.hasClass("in");
      if (_opened === true && !clickover.hasClass("navbar-toggle")) {
          $navbar.collapse('hide');
      }
  });


})
