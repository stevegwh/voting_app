var count = 3;
var counter = document.getElementById('counter');

setInterval(function(){
   count--;
   counter.innerHTML = count;

   if (count === 0) {
      window.location = '/';
   }
}, 1000);
