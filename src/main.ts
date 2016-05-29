import 'es6-shim';
import 'es6-promise';

require('./styles.less');

let last_known_scroll_position : number = 0;
let ticking : boolean = false;
let header : Element;
let mainMenu : Element = document.getElementById("main-menu");
let menuPanel : Element = document.getElementById("menu-panel");
let menuBackDrop : Element = document.getElementById("menu-backdrop");
let responsibilityFilter : string;

window.addEventListener("scroll", (ev: UIEvent) => {
   last_known_scroll_position = window.scrollY;
   if (!ticking) {
      window.requestAnimationFrame(function() {
         updateHeader(last_known_scroll_position);
         ticking = false;
      });
   }
   ticking = true;
});

var menuBtns = document.querySelectorAll(".menu-toggle");
for(var i = 0; i < menuBtns.length; i++) {
  menuBtns[i].addEventListener("click", (ev: UIEvent) => toggleMenu());
}

var checkboxes = menuPanel.querySelectorAll("input[type=radio]");
for(var i = 0; i < checkboxes.length; i++) {
  checkboxes[i].addEventListener("change", onCheckboxChange);
}

function updateHeader(scroll_pos) {
  // do something with the scroll position
  if(!header) header = document.getElementById("header");
  if (last_known_scroll_position > 200) {
     header.classList.add("docked");
  } else {
     header.classList.remove("docked");
  }
}

function onCheckboxChange(ev : UIEvent) {
  document.body.classList.toggle(responsibilityFilter);
  if(ev.target.value != "all") {
    responsibilityFilter = ev.target.value;
    document.body.classList.toggle(responsibilityFilter);
  }
  ev.stopImmediatePropagation();
}

function toggleMenu() {
    menuPanel.classList.toggle("open");
    menuBackDrop.classList.toggle("open");
}