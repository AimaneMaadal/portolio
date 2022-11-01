import './style.css'
import * as THREE from 'three'
import Textify from "textify.js";
import HorizontalScroll from 'horizontal-scroll';
import {
  GLTFLoader
} from 'three/examples/jsm/loaders/GLTFLoader.js';

var myCanvas = document.getElementById("my-work");

AOS.init(  {duration: 1000, } );





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
let light2 = new THREE.PointLight(0xffffff, 5, 100);
light2.position.set(2, 10, 3);
let light = new THREE.AmbientLight(0xffffff, 2);
scene.add(light, light2);

var scale = 1.5;

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

gltfLoader.load('/model/laptop.gltf', (gltf) => {
  Mesh = gltf.scene;
  Mesh.scale.set(scale, scale, scale);
  Mesh.position.set(0, -1, 0);
  scene.add(Mesh);
})

animate();

window.addEventListener('resize', onWindowResize, false);
window.addEventListener('mousemove', onMouseMove, false);

function onWindowResize() {
  renderer.setSize(window.innerWidth, 600);
}

var work = 0;

document.querySelector('#prevwork').addEventListener('click', () => {
  Mesh.traverse((child) => {
    if (child.name === 'Scherm') {
      var loader = new THREE.TextureLoader();
      loader.load("/model/texture.png", function (texture) {
        child.material.map = texture;
        child.material.needsUpdate = true;
      });
    }
  });
});


//get second span inside element with id "my-work"
var span = document.getElementById("about-text");


const childern = span.childNodes;

console.log(childern);


const name = childern[4],
  country = childern[24],
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
  document.getElementById("mouse-circle").style.backgroundImage = "url('https://images.pexels.com/photos/93827/pexels-photo-93827.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')";
  document.getElementById("mouse-circle").classList.add("mouse-circle-selected");
});

name.addEventListener("mouseleave", () => {
  document.getElementById("mouse-circle").style.backgroundImage = "none";
  document.getElementById("mouse-circle").classList.remove("mouse-circle-selected");
});

country.addEventListener("mouseover", () => {
  document.getElementById("mouse-circle").style.backgroundImage = "url('https://images.pexels.com/photos/93827/pexels-photo-93827.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')";
  document.getElementById("mouse-circle").classList.add("mouse-circle-selected");
});

country.addEventListener("mouseleave", () => {
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
