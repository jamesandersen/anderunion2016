import 'es6-shim';
import 'es6-promise';

require('./styles.less');

var last_known_scroll_position : number = 0;
var ticking : boolean = false;
var header : Element;

function doSomething(scroll_pos) {
  // do something with the scroll position
  if(!header) header = document.getElementById("header");
  if (last_known_scroll_position > 40) {
     header.classList.add("docked");
  } else {
     header.classList.remove("docked");
  }
}

window.addEventListener("scroll", (ev: UIEvent) => {
   last_known_scroll_position = window.scrollY;
   if (!ticking) {
      window.requestAnimationFrame(function() {
         doSomething(last_known_scroll_position);
         ticking = false;
      });
   }
   ticking = true;
});