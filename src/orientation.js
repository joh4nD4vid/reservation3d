import * as THREE from 'three';
import { GlobalInstances } from './global.js';



export class Orientation {


    constructor( camera, controls ) {

        this.camera = camera;
        this.controls = controls;

        this.directionXZ = null;
        
        this.updateDirection();
        this.event();

    }


    event() {

        this.controls.addEventListener( 'change', () => {
            this.updateDirection();
        });

    }


    updateDirection() {
        
        const direction = new THREE.Vector3();
        this.camera.getWorldDirection(direction);

        this.directionXZ = new THREE.Vector2();
        this.directionXZ.set( direction.x, direction.z ).normalize();

        const angle = Math.atan2( this.directionXZ.y, this.directionXZ.x );


        if ( GlobalInstances.materialMap && GlobalInstances.rendererMap ) {
            GlobalInstances.materialMap.uniforms.u_angle.value = angle; 
            GlobalInstances.rendererMap.render( GlobalInstances.sceneMap, GlobalInstances.cameraMap );
        }


    }


}