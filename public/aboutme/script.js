import '../style.css';

const example = new Textify({
  delay: 0,
  rotation: 15,
});

var menu = false;

document.querySelector('#menu-mobile').addEventListener('click', () => {
  if (menu == false) {
    showmenu();
    menu = true;
  } else if (menu == true) {
    hidemenu();
    menu = false;
  }
});

function hidemenu() {
  document.querySelector('header').style.backgroundColor = "transparent";
  document.querySelector('#menu-div').style.display = "none";
  document.querySelector('#menu-mobile').style.color = "#000000";
  document.querySelector('#menu-mobile').innerHTML = "menu";
  document.querySelector('#logo-name').innerHTML = "aimane.dev";
  document.querySelector('#right1').style.display = "block";
  document.body.style.backgroundColor = "#ffffff";
  document.body.style.overflow = "auto";
}

function showmenu() {
  document.querySelector('header').style.backgroundColor = "#252525";
  document.querySelector('#menu-div').style.display = "flex";
  document.querySelector('#menu-mobile').style.color = "#ffffff";
  document.querySelector('#menu-mobile').innerHTML = "close";
  document.querySelector('#logo-name').innerHTML = "";
  document.querySelector('#right1').style.display = "none";
  document.body.style.backgroundColor = "#252525";
  document.body.style.overflow = "hidden";
}

if (window.matchMedia("(min-width: 768px)").matches) {
  let mousePosX = 0,
    mousePosY = 0,
    mouseCircle = document.getElementById("mouse-circle");

  document.onmousemove = (e) => {
    mousePosX = e.pageX;
    mousePosY = e.pageY;
  };

  let delay = 3,
    revisedMousePosX = 0,
    revisedMousePosY = 0;

  function delayMouseFollow() {
    requestAnimationFrame(delayMouseFollow);

    revisedMousePosX += (mousePosX - revisedMousePosX) / delay;
    revisedMousePosY += (mousePosY - revisedMousePosY) / delay;

    mouseCircle.style.top = revisedMousePosY + "px";
    mouseCircle.style.left = revisedMousePosX + "px";
  }
  delayMouseFollow();
}


document.querySelector('#contact-btn').addEventListener('click', () => {
  document.querySelector('#contact').style.display = "block";
  document.body.style.overflow = "hidden";
});


document.querySelector('#contact-btn2').addEventListener('click', () => {
  document.querySelector('#contact').style.display = "block";
  document.body.style.overflow = "hidden";
  hidemenu();
});

document.querySelector('#close').addEventListener('click', () => {
  document.querySelector('#contact').style.display = "none";
  document.body.style.overflow = "auto";
});