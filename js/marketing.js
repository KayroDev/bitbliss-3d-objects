import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

//// INIT ////

// Conatiner-Div
const container = document.getElementById('website-canvas');
const containerWidth = container.clientWidth;
const containerHeight = container.clientHeight;

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
    45,
    containerWidth / containerHeight,
    1,
    500 
);
camera.position.set(0, 0, 5);
camera.lookAt(0, 0, 0);

// Renderer
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(containerWidth, containerHeight);
renderer.shadowMap.enabled = true;
container.appendChild(renderer.domElement);

// Orbit-Controlls
const controls = new OrbitControls(camera, renderer.domElement); 

// GLTF-Loader
const loader = new GLTFLoader();


//// RENDER ////
function animate() {
	renderer.render( scene, camera );
}

// WebGL compatibility check
if (WebGL.isWebGLAvailable()) {
	animate();
} else {
	const warning = WebGL.getWebGLErrorMessage();
	document.getElementById('container').appendChild(warning);
}