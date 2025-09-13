import * as THREE from 'three'
import { Vue_Collection_Sprites_To_Another_vue } from './Sprites.js'
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader.js';
import { PMREMGenerator } from 'three';
import { GlobalInstances } from './global.js'
import { textureManager } from './textures/TextureManager.js'
import { Sprite_Reserver } from './Sprites.js'
import { Map } from './Map.js'



export class Vue {


    static mode = 'cubemap';        // equi OU cubemap 


    static path = './textures';


    static pmremGenerator = () => { return new PMREMGenerator( GlobalInstances.renderer ); }


    static inst = [];


    static loaded_textures = {};


    static env_maps = {};


    static actual = null;


    static setActualTo( id ) {

        const actualVue = Vue.getById( id );
        if ( !actualVue ) return console.error('ID de vue inexistant.');

        Vue.actual = actualVue;
        Vue.actual.active();
        
        new Vue_Collection_Sprites_To_Another_vue();
        Sprite_Reserver.load_scene_sprites( id );

        if (!Map.active) return new Map(); 
        
        Map.active.update_user_position();
        // console.log(`Vue actuelle : ${ actualVue.id }, avec la texture : ${ actualVue.name }`);
        
    }

    // TODO Ajouter une orientation de la scène cible
    // TODO Taille du Sprite

    static all = [

        { 
            id : 1,
            path : '/facade/',
            user_position : {
                x : -6,
                y : 333
            },
            sprites_to_another_vue : [
                {
                    scene_id : 3, // OK
                    x : 7,
                    y : -10,
                    z : -65,
                    size : 1
                }
            ]

        },

        { 
            id : 2,
            path : '/rez_1/',
            user_position : {
                x : 5,
                y : 200
            },

            sprites_to_another_vue : [
                {
                    scene_id : 1, // OK
                    x : 100,
                    y : -17,
                    z : 159,
                    size : 2.5
                },

                {
                    scene_id : 3, // OK
                    x : -26,
                    y : -79,
                    z : 154,
                    size : 2.5
                },

                {
                    scene_id : 4, // OK
                    x : 75,
                    y : -57,
                    z : -16,
                    size : 1.5
                },

                {
                    scene_id : 5, // OK
                    x : -86,
                    y : 0,
                    z : 53,
                    size : 1.5
                }

            ]

        },

        { 
            id : 3,
            path : '/rez_2/',
            user_position : {
                x : 20,
                y : 180
            },

            sprites_to_another_vue : [
                {
                    scene_id : 1, // OK
                    x : 181,
                    y : -31,
                    z : 66,
                    size : 2.5
                },

                {
                    scene_id : 2, // OK
                    x : 45,
                    y : -53,
                    z : -167,
                    size : 2.5
                },

                {
                    scene_id : 4, // OK
                    x : 115,
                    y : -66,
                    z : -96,
                    size : 2.5
                },

                {
                    scene_id : 5, // OK
                    x : -70,
                    y : 2,
                    z : -28,
                    size : 1
                }

            ]

        },

        { 
            id : 4,
            path : '/rez_3/',
            user_position : {
                x : 60,
                y : 100
            },

            sprites_to_another_vue : [
                {
                    scene_id : 1, // OK
                    x : 172,
                    y : -22,
                    z : -48,
                    size : 2
                },

                {
                    scene_id : 2,
                    x : 15,
                    y : -79,
                    z : 90,
                    size : 2
                },

                {
                    scene_id : 3, // OK
                    x : 146,
                    y : -75,
                    z : 70,
                    size : 2
                },

                {
                    scene_id : 5,
                    x : 96,
                    y : -3,
                    z : 139,
                    size : 2
                }

            ]

        },

        { 
            id : 5,
            path : '/etage_1/',
            user_position : {
                x : 10,
                y : 50
            },

            sprites_to_another_vue : [

                {
                    scene_id : 3, // OK
                    x : -93,
                    y : -63,
                    z : 145,
                    size : 2
                },

                {
                    scene_id : 6, // OK
                    x : -128,
                    y : -57,
                    z : -70,
                    size : 2
                },

                {
                    scene_id : 7, // OK 
                    x : -185,
                    y : -53,
                    z : 40,
                    size : 2
                }

      

            ]

        },

        { 
            id : 6,
            path : '/etage_2/',
            user_position : {
                x : 5,
                y : 40
            },

            sprites_to_another_vue : [

                {
                    scene_id : 3,   // OK
                    x : -6,
                    y : -9,
                    z : -114,
                    size : 2
                },

                {
                    scene_id : 5,   // OK
                    x : -97,
                    y : -22,
                    z : -83,
                    size : 2
                },

                {
                    scene_id : 7,   // OK
                    x : 124,
                    y : -75,
                    z : -87,
                    size : 2
                }

      

            ]

        },

        { 
            id : 7,
            path : '/etage_3/',
            user_position : {
                x : 40,
                y : 18
            },

            sprites_to_another_vue : [

                {
                    scene_id : 3, // OK
                    x : 111,
                    y : -22,
                    z : -101,
                    size : 2
                },

                {
                    scene_id : 5,  
                    x : 43,
                    y : -35,
                    z : -127,
                    size : 2
                },

                {
                    scene_id : 6,  // OK
                    x : -84,
                    y : -75,
                    z : -132,
                    size : 2
                }

            ]

        }

    ];


    static getById( id ) {

        if ( !Vue.inst[ id ] ) return false;
        return Vue.inst[ id ];

    }


    static init() {

        Vue.all.forEach( aVue => {
            Vue.inst[ aVue.id ] = new Vue ( aVue.id, aVue.texture, aVue.user_position, aVue.sprites_to_another_vue );
        });

    }


    static load_texture() {


        Vue.init();


        Vue.all.forEach( aVue => {

            
            if ( Vue.mode === 'equi' ) {

                const texture_path = Vue.path + aVue.path + 'equi.JPG';

                new THREE.TextureLoader( textureManager ).load( texture_path, ( texture ) => {

                    texture.colorSpace = THREE.SRGBColorSpace;
                    Vue.loaded_textures[ aVue.id ] = texture;
                    Vue.env_maps[ aVue.id ] = Vue.pmremGenerator().fromEquirectangular( texture ).texture;

                });

            }


            if ( Vue.mode === 'cubemap' ) { 

                const tex_path = Vue.path + aVue.path
                // console.log(tex_path + 'px.jpg');
                
                const loader = new THREE.CubeTextureLoader( textureManager ).load([
                    
                    tex_path + '/px.png',
                    tex_path + '/nx.png',
                    tex_path + '/py.png',
                    tex_path + '/ny.png',
                    tex_path + '/pz.png',
                    tex_path + '/nz.png'
                    
                ], ( texture ) => {

                    texture.colorSpace = THREE.SRGBColorSpace;
                    Vue.loaded_textures[ aVue.id ] = texture;
                    Vue.env_maps[ aVue.id ] = texture;
                    // console.log('loaded');

                });

            }


        });

    }


    constructor( id, path, user_position, sprites_to_another_vue ) {
        
        this.id = id;
        this.path = path;
        this.user_position = user_position;
        this.sprites_to_another_vue = sprites_to_another_vue;

        Vue.inst[ id ] = this;

    }


    active() {

        if ( !Vue.loaded_textures[ this.id ] ) return;

        GlobalInstances.scene.background = Vue.env_maps[ this.id ];
        Vue.loaded_textures[ this.id ].dispose();

        //pmremGenerator.dispose();

    }


}