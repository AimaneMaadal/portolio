import './style.css'
import * as THREE from 'three'
import Textify from "textify.js";
import {
  GLTFLoader
} from 'three/examples/jsm/loaders/GLTFLoader.js';

var myCanvas = document.getElementById("my-work");

AOS.init({
  duration: 1000,
});


const example = new Textify({
  delay: 0,
  rotation: 15,
});

document.addEventListener('DOMContentLoaded', () => {
  var control = document.getElementById("laptop-control");
  var container = document.getElementById('laptopcan');
  container.appendChild(control);
  container.appendChild(myCanvas);
})

var scene = new THREE.Scene();
const gltfLoader = new GLTFLoader()
const sizes = {
  width: window.innerWidth,
  height: 700
}
var camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000);
var renderer = new THREE.WebGLRenderer({
  antialias: true,
  canvas: myCanvas
});
let Mesh = null;

//add a pointlight
let light2 = new THREE.PointLight(0xffffff, 4, 200);
light2.position.set(2, 50, 3);
let light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light, light2);



renderer.setSize(sizes.width, sizes.height);
scene.background = new THREE.Color('#FFFFFF');
document.body.appendChild(renderer.domElement);
camera.position.z = 5;




var animate = function () {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};

function onMouseMove(event) {
  var mouse = new THREE.Vector2();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  Mesh.rotation.x = mouse.y * 0.05;
  Mesh.rotation.y = mouse.x * 0.1;
}

gltfLoader.load('/images/laptop.glb', (gltf) => {
  Mesh = gltf.scene;
  if (window.innerWidth < 768) {
    Mesh.scale.set(0.5, 0.5, 0.5);
  } else {
    Mesh.scale.set(1.5, 1.5, 1.5);
  }
  Mesh.position.set(0, -1, 0);
  scene.add(Mesh);
})

animate();

window.addEventListener('resize', onWindowResize, false);
window.addEventListener('mousemove', onMouseMove, false);

function onWindowResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  if (window.innerWidth < 1208) {
    document.getElementById("laptopcan").style.display = "none !important";
    document.getElementById("laptopcan2").style.display = "block !important";
  }
  else {
    document.getElementById("laptopcan").style.display = "block !important";
    document.getElementById("laptopcan2").style.display = "none !important";
  }
  hidemenu();
}

var work = 1;

document.querySelector('#prevwork').addEventListener('click', () => {
  if (work == 0) {
    work = 2;
  }
  let currentwork = 'Scherm' + work;
  Mesh.traverse((child) => {
    if (child.name.includes('Scherm')) {
      child.visible = false;
    }
    if (child.name.includes('start')) {
      child.visible = false;
    }
    if (child.name == currentwork) {
      child.visible = true;
    }
    console.log(currentwork);
  });
  work--;
});
document.querySelector('#nextwork').addEventListener('click', () => {
  if (work == 3) {
    work = 1;
  }
  let currentwork = 'Scherm' + work;
  Mesh.traverse((child) => {
    if (child.name.includes('Scherm')) {
      child.visible = false;
    }
    if (child.name.includes('start')) {
      child.visible = false;
    }
    if (child.name == currentwork) {
      child.visible = true;
    }
    console.log(currentwork);
  });
  work++;
});


var work2 = 1;

document.querySelector('#nextwork2').addEventListener('click', () => {
  if (work2 == 4) {
    work2 = 1;
  }
  let currentwork = 'proj' + work2;
  document.querySelector('#laptopcan2').style.backgroundImage = "url('/images/" + currentwork + ".webp')";
  work2++;
});
document.querySelector('#prevwork2').addEventListener('click', () => {
  if (work2 == 0) {
    work2 = 3;
  }
  let currentwork = 'proj' + work2;
  document.querySelector('#laptopcan2').style.backgroundImage = "url('/images/" + currentwork + ".webp')";
  work2--;
});

var menu = false;

document.querySelector('#menu-mobile').addEventListener('click', () => {
  if (menu == false) {
    showmenu();
    menu = true;
  }
  else if (menu == true) {
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
  document.body.style.overflow = "auto";
}
function showmenu() {
  document.querySelector('header').style.backgroundColor = "#252525";
  document.querySelector('#menu-div').style.display = "flex";
  document.querySelector('#menu-mobile').style.color = "#ffffff";
  document.querySelector('#menu-mobile').innerHTML = "close";
  document.querySelector('#logo-name').innerHTML = "";
  document.body.style.overflow = "hidden";
}


//get second span inside element with id "my-work"
var span = document.getElementById("about-text");


const childern = span.childNodes;

console.log(childern);


const name = childern[4],
  country = childern[24],
  city = childern[48],
  personImg = document.querySelector(".person-img"),
  countryImg = document.querySelector(".country-img");

window.addEventListener("mousemove", (e) => {
  let x = e.clientX / window.innerWidth;
  let y = e.clientY / window.innerHeight;


  if (e.target.classList.contains("name")) {
    personImg.style.left = `${x}px`;
    personImg.style.top = `${y}px`;
  }
  if (e.target.classList.contains("country")) {
    countryImg.style.left = `${x}px`;
    countryImg.style.top = `${y}px`;
  }
});


name.addEventListener("mouseover", () => {
  document.getElementById("mouse-circle").style.backgroundImage = "url('/images/me.gif')";
  document.getElementById("mouse-circle").classList.add("mouse-circle-selected");
});

name.addEventListener("mouseleave", () => {
  document.getElementById("mouse-circle").style.backgroundImage = "none";
  document.getElementById("mouse-circle").classList.remove("mouse-circle-selected");
});

country.addEventListener("mouseover", () => {
  document.getElementById("mouse-circle").style.backgroundImage = "url('/images/imd.webp')";
  document.getElementById("mouse-circle").classList.add("mouse-circle-selected");
});

country.addEventListener("mouseleave", () => {
  document.getElementById("mouse-circle").style.backgroundImage = "none";
  document.getElementById("mouse-circle").classList.remove("mouse-circle-selected");
});

city.addEventListener("mouseover", () => {
  document.getElementById("mouse-circle").style.backgroundImage = "url('/images/dino.webp')";
  document.getElementById("mouse-circle").classList.add("mouse-circle-selected");
});

city.addEventListener("mouseleave", () => {
  document.getElementById("mouse-circle").style.backgroundImage = "none";
  document.getElementById("mouse-circle").classList.remove("mouse-circle-selected");
});


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
 


document.querySelector('footer').addEventListener('mouseover', () => {
  document.getElementById("mouse-circle").style.borderColor = "#ffffff";
});

document.querySelector('#contact').addEventListener('mouseover', () => {
  document.getElementById("mouse-circle").style.borderColor = "#ffffff";
});

//if mouse leaves footer change border color back to black
document.querySelector('footer').addEventListener('mouseleave', () => {
  document.getElementById("mouse-circle").style.borderColor = "#000000";
});

//if mouse leaves footer change border color back to black
document.querySelector('#contact').addEventListener('mouseleave', () => {
  document.getElementById("mouse-circle").style.borderColor = "#000000";
});

//get horizontal scroll positsion of div with id container
var container = document.getElementById("container");
var scrollLeft = container.scrollLeft;


while (container.scrollLeft < 1000) {
  console.log(scrollLeft);
}

var swiper = new Swiper(".mySwiper", {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 5500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

//if window screen is less than 800px
if (window.innerWidth < 868) {
  var swiper2 = new Swiper("#values", {
    slidesPerView: 1,
    freeMode: true,
  });
} else {
  var swiper2 = new Swiper("#values", {
    slidesPerView: 2,
    freeMode: true,
  });
}