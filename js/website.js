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
//scene.background(0x01030b); -test

// Camera
const camera = new THREE.PerspectiveCamera(
    45,
    containerWidth/ containerHeight,
    0.1,
    500 
);
camera.position.set( 0, 1, 1);
//camera.lookAt( 0, 0, 0);

// Renderer
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(containerWidth, containerHeight);
renderer.shadowMap.enabled = true;
container.appendChild(renderer.domElement);
renderer.setClearColor(0x01030b)
renderer.shadowMap.enabled = true;

// Orbit-Controlls
const controls = new OrbitControls(camera, renderer.domElement); 

// GLTF-Loader
const loader = new GLTFLoader();

// Grid-Helper
const grid = new THREE.GridHelper(2, 2);
scene.add(grid);

// Website-Object
const objectUrl = new URL('/webObj2.glb', import.meta.url)
loader.load(objectUrl.href, function(gltf){
    const model = gltf.scene;
    scene.add(model);
    gltf.scene.traverse( function ( child ) {

        if ( child.isMesh ) {
          child.castShadow = true;
          child.receiveShadow = true;
          child.geometry.computeVertexNormals(); // FIX
        }
    });
});

// Plane
const planeGeo = new THREE.PlaneGeometry(2,2);
const planeMat = new THREE.MeshStandardMaterial(0xffffff);
const plane = new THREE.Mesh(planeGeo, planeMat);
scene.add(plane);
plane.rotateX(Math.PI /-2)
plane.receiveShadow = true;

// Directional Light
const dLight = new THREE.DirectionalLight(0xffffff, 2);
scene.add(dLight);
dLight.position.set(0,2,2);
dLight.castShadow = true;
//dLight.shadow.mapSize.width = 1024;
//dLight.shadow.mapSize.height = 1024;
dLight.target.position.set(0, 0.5, 0);

const dLightHelper = new THREE.DirectionalLightHelper(dLight, 1);
scene.add(dLightHelper);

const dLightShadowHelper = new THREE.CameraHelper(dLight.shadow.camera);
//scene.add(dLightShadowHelper);


//// RENDER ////
function animate() {
    requestAnimationFrame( animate );
	renderer.render(scene, camera);
}

// WebGL compatibility check
if (WebGL.isWebGLAvailable()) {
	animate();
} else {
	const warning = WebGL.getWebGLErrorMessage();
	document.getElementById('container').appendChild(warning);
}