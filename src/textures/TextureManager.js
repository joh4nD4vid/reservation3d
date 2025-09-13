import * as THREE from 'three';
import { Sprite_To_Another_Vue, Sprite_Reserver } from '../Sprites.js'
import { Vue } from '../Vue.js'
import { Map } from '../Map.js'



export const textureManager = new THREE.LoadingManager();



textureManager.onStart = (url, itemsLoaded, itemsTotal) => {
  // console.log('Start loading…', { url, itemsLoaded, itemsTotal });
};


textureManager.onProgress = (url, itemsLoaded, itemsTotal) => {

  const pct = Math.round((itemsLoaded / itemsTotal) * 100);
  document.querySelector('#progress').style.width = pct + '%';
  document.querySelector('#progress-label').textContent = pct + '%';
  // console.log('Loading', { url, itemsLoaded, itemsTotal, pct });

};


textureManager.onLoad = () => {

  // console.log('Textures chargées ✅');
  document.querySelector('#loader').classList.add('hidden');

  Vue.setActualTo( 1 );

};


textureManager.onError = (url) => {
  // console.warn('Erreur de chargement', url);
};




export function start_texture_loading() {

    Sprite_To_Another_Vue.load_texture();
    Sprite_Reserver.load_texture();
    Vue.load_texture();
    Map.load_texture();

}





