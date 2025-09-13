import './style.css'
import * as THREE from 'three';
import { supabase } from './supabaseClient.js'
import { startScene } from './scene.js'
import { loadOBJModel } from './objLoader.js'
import { ClientLoader } from './ClientLoader.js'
import { GlobalInstances } from './global.js'
import { initViewer3D } from './viewer3D.js'
import { Sprite_Reserver } from './Sprites.js'
import { init_Mouse_Events } from './Mouse.js'
import { Vue } from './Vue.js'
import { start_texture_loading } from './textures/TextureManager.js'



// TODO Passer tous les chargements dans un manager de chargement (Pour afficher un loader)






//TODO Importer un calendrier (trouver solution)
//TODO Le mettre dans la scène générale et dans le formulaire de réservation
//TODO L'importer, certains rouges, certains verts (tout fait, pas dynamique pour l'instant)

//TODO Réorganiser les fichiers Javacript : faire des sous dossiers pour ranger les classes.

initViewer3D();
start_texture_loading();


init_Mouse_Events();

const material = new THREE.Material({});





