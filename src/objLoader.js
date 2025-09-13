
import * as THREE from 'three'
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { GlobalInstances } from './global.js'


export function loadOBJModel(filePath, material) {


  const loader = new OBJLoader();

  loader.load(

    filePath,

    (object) => {

      object.traverse((child) => {
        if (child.isMesh) {

          // Applique le matériau à tous les enfants du modèle 3D
          child.material = material;
        }
      });



      // Ajout à la scène 3D
      GlobalInstances.scene.add(object);

    },

    undefined,

    // Gestion des erreurs
    (error) => {
      console.error('Erreur avec le chargement du fichier OBJ', error);
    }

  );
}