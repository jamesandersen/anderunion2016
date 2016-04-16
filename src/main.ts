import 'es6-shim';
import 'es6-promise';

require('./styles.less');

var last_known_scroll_position : number = 0;
var ticking : boolean = false;
var header : Element;
var mainMenu : Element = document.getElementById("main-menu");

function doSomething(scroll_pos) {
  // do something with the scroll position
  if(!header) header = document.getElementById("header");
  if (last_known_scroll_position > 200) {
     header.classList.add("docked");
  } else {
     header.classList.remove("docked");
     mainMenu.classList.remove("open");
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

mainMenu.addEventListener("click", (ev: UIEvent) => {
   mainMenu.classList.toggle("open");
});

var checkboxes = mainMenu.querySelectorAll("input[type=checkbox]");
for(var i = 0; i < checkboxes.length; i++) {
  checkboxes[i].addEventListener("change", onCheckboxChange);
}

function onCheckboxChange(ev : UIEvent) {
  document.body.classList.toggle(ev.target.value);
  ev.stopImmediatePropagation();
}