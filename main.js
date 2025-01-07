// Set up scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create globe
const geometry = new THREE.SphereGeometry(5, 32, 32);
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg');
const material = new THREE.MeshPhongMaterial({
    map: texture,
    bumpScale: 0.05,
});
const globe = new THREE.Mesh(geometry, material);
scene.add(globe);

// Create atmosphere
const atmosphereGeometry = new THREE.SphereGeometry(5.3, 32, 32);
const atmosphereMaterial = new THREE.ShaderMaterial({
    vertexShader: document.getElementById('atmosphereVertexShader').textContent,
    fragmentShader: document.getElementById('atmosphereFragmentShader').textContent,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide,
    transparent: true,
    uniforms: {
        time: { value: 0 }
    }
});

const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
scene.add(atmosphere);

// Add ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Add point light
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(50, 50, 50);
scene.add(pointLight);

// Position camera
camera.position.z = 15;

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    // Update time uniform for the atmosphere shader
    atmosphereMaterial.uniforms.time.value += 0.01;
    
    // Rotate the globe and atmosphere
    globe.rotation.y += 0.005;
    atmosphere.rotation.y += 0.005;
    
    renderer.render(scene, camera);
}

// Handle window resizing
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Start animation
animate();