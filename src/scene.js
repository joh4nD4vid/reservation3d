import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GlobalInstances } from './global.js'



export function startScene() {

    GlobalInstances.scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({
        antialias : true
    })

    renderer.setClearColor(new THREE.Color(0xf8f8f8))

    const controls = new OrbitControls( camera, renderer.domElement );

    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)


    // --- Sol quadrillé avec shader custom ---
    const gridSize = 1000;
    const gridDivisions = 150;

    // Shader material pour quadrillage sobre
    const gridMaterial = new THREE.ShaderMaterial({
        uniforms: {
            gridSize: { value: gridSize },
            gridDivisions: { value: gridDivisions },
            color1: { value: new THREE.Color(0xf8f8f8) }, // Couleur de fond
            color2: { value: new THREE.Color(0xcccccc) }  // Couleur des lignes
        },
        vertexShader: `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform float gridSize;
            uniform float gridDivisions;
            uniform vec3 color1;
            uniform vec3 color2;
            varying vec2 vUv;

            float stepGrid(float edge, float x) {
                return x < edge ? 0.0 : 1.0;
            }

            void main() {
                float line = 0.03; // épaisseur des lignes
                float x = mod(vUv.x * gridDivisions, 1.0);
                float y = mod(vUv.y * gridDivisions, 1.0);
                float grid = stepGrid(line, x) * stepGrid(line, y);
                vec3 color = mix(color2, color1, grid);
                gl_FragColor = vec4(color, 1.0);
            }
        `,
        side: THREE.DoubleSide
    });

    // Plan au sol
    const gridGeometry = new THREE.PlaneGeometry(gridSize, gridSize, 1, 1);
    const gridPlane = new THREE.Mesh(gridGeometry, gridMaterial);
    gridPlane.rotation.x = -Math.PI / 2;
    gridPlane.position.y = 0;
    gridPlane.receiveShadow = false;
    GlobalInstances.scene.add(gridPlane);
    const light1 = new THREE.DirectionalLight(0xffffff, 1.2);
    light1.position.set(100, 50, 100);
    GlobalInstances.scene.add(light1);

    // Lumière d'ambiance douce
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7); 
    GlobalInstances.scene.add(ambientLight);

    // Deuxième lumière directionnelle opposée pour adoucir les ombres
    const light2 = new THREE.DirectionalLight(0xffffff, 0.7); 
    light2.position.set(-80, 60, -60);
    GlobalInstances.scene.add(light2);

    // Petite lumière ponctuelle pour ajouter du relief
    const pointLight = new THREE.PointLight(0xffffff, 0.5, 500); 
    pointLight.position.set(0, 150, 0);


    controls.enableDamping = true;
    controls.dampingFactor = 0.08; 
    GlobalInstances.scene.add(pointLight);


    camera.position.set(153, 132, 1)
    controls.update();

    function animate() {
        controls.update();
        requestAnimationFrame(animate)
        renderer.render(GlobalInstances.scene, camera)
    }

    // --- Raycaster pour survol des objets ---
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // Liste des objets interactifs (ici, tous les meshes sauf le sol)
    const interactiveObjects = [];
    GlobalInstances.scene.traverse((obj) => {
        if (obj.isMesh && obj !== gridPlane) {
            interactiveObjects.push(obj);
        }
    });

    // Stocke l'objet actuellement survolé
    let hoveredObject = null;
    let originalMaterial = null;

    // ShaderMaterial de survol (couleur différente)
    const hoverMaterial = new THREE.ShaderMaterial({
        uniforms: {
            gridSize: { value: gridSize },
            gridDivisions: { value: gridDivisions },
            color1: { value: new THREE.Color(0xffe082) }, // Couleur de fond survol
            color2: { value: new THREE.Color(0xff9800) }  // Couleur des lignes survol
        },
        vertexShader: `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform float gridSize;
            uniform float gridDivisions;
            uniform vec3 color1;
            uniform vec3 color2;
            varying vec2 vUv;

            float stepGrid(float edge, float x) {
                return x < edge ? 0.0 : 1.0;
            }

            void main() {
                float line = 0.03;
                float x = mod(vUv.x * gridDivisions, 1.0);
                float y = mod(vUv.y * gridDivisions, 1.0);
                float grid = stepGrid(line, x) * stepGrid(line, y);
                vec3 color = mix(color2, color1, grid);
                gl_FragColor = vec4(color, 1.0);
            }
        `,
        side: THREE.DoubleSide
    });

    function onPointerMove(event) {
        // Normalise la position de la souris
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }
    window.addEventListener('pointermove', onPointerMove);

    function handleHover() {
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(interactiveObjects, false);

        if (intersects.length > 0) {
            const obj = intersects[0].object;
            if (hoveredObject !== obj) {
                // Restaure l'ancien objet
                if (hoveredObject && originalMaterial) {
                    hoveredObject.material = originalMaterial;
                }
                // Sauvegarde et applique le shader de survol
                originalMaterial = obj.material;
                obj.material = hoverMaterial;
                hoveredObject = obj;
            }
        } else {
            // Restaure si plus rien n'est survolé
            if (hoveredObject && originalMaterial) {
                hoveredObject.material = originalMaterial;
                hoveredObject = null;
                originalMaterial = null;
            }
        }
    }

    function animate() {
        controls.update();
        handleHover();
        requestAnimationFrame(animate)
        renderer.render(GlobalInstances.scene, camera)
    }

    animate()


    window.addEventListener('resize', () => {
        const width = window.innerWidth
        const height = window.innerHeight
        renderer.setSize(width, height)
        camera.aspect = width / height
        camera.updateProjectionMatrix()
    })

}


