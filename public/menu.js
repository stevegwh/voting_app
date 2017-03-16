$(document).ready(function(){
  var pathname = window.location.pathname;
  pathname= pathname.replace('/', "#");
  console.log(pathname);
  $('li').removeClass('');
  if(pathname !== "#") {
    $(pathname).addClass('active');
  }

})
