import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import { ChristmasButton } from './christmas-button.js';

// Create scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1a1a1a);

// Create camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(6, 8, 50);
camera.lookAt(0, 10, 0);

// Add lights to the scene
const ambientLight = new THREE.AmbientLight(0xffffff, 2);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(10, 20, 10);
scene.add(directionalLight);

// Initialize renderer BEFORE loading models
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.getElementById('container3d').appendChild(renderer.domElement);

let object;
let controls;
let isAnimating = false;
let buttonElement;
let secondButtonElement;

// Initialize GLTF Loader
const gltfLoader = new GLTFLoader();

// Load the GLTF file
gltfLoader.load(
    'scene.gltf',
    function (gltf) {
        //If the file is loaded, add it to the scene
        object = gltf.scene;
        scene.add(object);

        // Auto-fit camera to object
        const box = new THREE.Box3().setFromObject(object);
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const fov = camera.fov * (Math.PI / 180);
        let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
        cameraZ *= 1.5;
        camera.position.z = cameraZ;
        camera.position.x = -10;
        camera.position.y = 5;


        // Initialize OrbitControls
        controls = new OrbitControls(camera, renderer.domElement);
        controls.target.set(9, 2, -5.5);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;

        // Disable auto rotate
        controls.autoRotate = false;

        // Optional: limit movement so view stays similar
        controls.minDistance = 10;
        controls.maxDistance = 20;
        controls.maxPolarAngle = Math.PI / 2.1;

    },
    function (xhr) {
        //While it is loading, log the progress
        console.log(((xhr.loaded / xhr.total) * 100) + '% loaded');
    },
    function (error) {
        //If there is an error, log it
        console.error('Error loading model:', error);
    }
);

// Create animate function
function animate() {
    requestAnimationFrame(animate);

    // Update OrbitControls
    if (controls) {
        controls.update();
    }

    // Render the scene
    renderer.render(scene, camera);
}

// Add window resize listener
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Initialize Christmas Button
const christmasButtonInstance = new ChristmasButton({
    text: '🎄 Magic',
    containerId: 'button-container',
    onClick: () => {
        if (!isAnimating) {
            isAnimating = true;
            animateOnButtonClick();
        }
    }
});

// Get button element
buttonElement = document.querySelector('.christmas-button');

// Initialize second button (will be created after first animation)
let secondButtonInstance;

function createSecondButton() {
    secondButtonInstance = new ChristmasButton({
        text: '✨ Talk to Santa',
        containerId: 'button-container-2',
        onClick: () => {
            console.log('Second button clicked!');
            openSantaInterface();
        }
    });

    // Get second button element and show it
    secondButtonElement = document.querySelector('#button-container-2 .christmas-button');
    const container2 = document.getElementById('button-container-2');
    if (container2) {
        setTimeout(() => {
            container2.classList.add('show');
        }, 100);
    }
}

function openSantaInterface() {
    // Call the React callback to open the Santa Chat modal
    if (window.openSantaInterface) {
        window.openSantaInterface();
    }
}

function animateOnButtonClick() {
    // Hide the button
    if (buttonElement) {
        buttonElement.classList.add('disappear');
    }

    const startTime = Date.now();
    const duration = 2000; // 2 seconds animation
    const startCameraPos = { ...camera.position };
    const startObjectPos = object ? { ...object.position } : { x: 0, y: 0, z: 0 };

    function animationFrame() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Rotate camera to the right
        const newCameraX = startCameraPos.x + (26 * progress);
        camera.position.set(newCameraX, startCameraPos.y, startCameraPos.z);
        camera.lookAt(15, 10, 0);

        // Move tree to the right
        if (object) {
            object.position.x = startObjectPos.x + (19 * progress);
        }

        if (progress < 1) {
            requestAnimationFrame(animationFrame);
        } else {
            isAnimating = false;
            // Show second button after animation completes
            createSecondButton();
        }
    }

    animationFrame();
}

// Start animation
animate();


