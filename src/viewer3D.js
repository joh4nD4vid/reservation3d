    import * as THREE from 'three';

    import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
    import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
    import { GlobalInstances } from './global.js';
    import { Orientation } from './orientation.js'
    import { Vue } from './Vue.js'



    let controls, renderer;



    export function initViewer3D() {

        // CAMERAS

        GlobalInstances.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 200 );
        GlobalInstances.camera.position.set( 0, 0, 2.5 );

        // SCENE

        GlobalInstances.scene = new THREE.Scene();



        renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.setAnimationLoop( animate );
        document.body.appendChild( renderer.domElement );


        controls = new OrbitControls( GlobalInstances.camera, renderer.domElement );
        controls.minDistance = 1.5;
        controls.maxDistance = 6;
        controls.enableZoom = false;

        new Orientation( GlobalInstances.camera, controls );

        window.addEventListener( 'resize', onWindowResize );
        
        GlobalInstances.renderer = renderer;

    }

    

    function onWindowResize() {

        GlobalInstances.camera.aspect = window.innerWidth / window.innerHeight;
        GlobalInstances.camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );

    }



    function animate() {

        GlobalInstances.camera.lookAt( GlobalInstances.scene.position );
        renderer.render( GlobalInstances.scene, GlobalInstances.camera );
        
    }