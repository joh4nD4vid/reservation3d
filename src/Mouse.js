import * as THREE from 'three';
import { GlobalInstances } from './global.js';
import { Sprite_Reserver, Sprite_To_Another_Vue } from './Sprites.js'



const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();



export function init_Mouse_Events() {
    
    window.addEventListener('click', onClick, false);
    window.addEventListener('mousemove', onMove, false);

}


function onClick(event) {

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Met à jour le rayon depuis la caméra
    raycaster.setFromCamera( mouse, GlobalInstances.camera );

    // Teste les intersections avec les sprites
    const intersects = raycaster.intersectObjects( GlobalInstances.clickables_sprites, true );
    
     
    if (intersects.length > 0) {
        const clicked = intersects[0].object;

        clicked.ref.click();
    }

}



function onMove(event) {
    
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Met à jour le rayon depuis la caméra
    raycaster.setFromCamera( mouse, GlobalInstances.camera );
    // Teste les intersections avec les sprites
    const intersects = raycaster.intersectObjects( GlobalInstances.clickables_sprites, true );

    if (intersects.length > 0) {
        document.body.style.cursor = 'pointer';
        intersects[0].object.ref.hover();
    }

    else {
        document.body.style.cursor = 'auto';
        Sprite_Reserver.end_hover();
        Sprite_To_Another_Vue.end_hover();
    }


    //TODO Afficher une petite boîte de dialogue avec croix pour revenir en arrière

}