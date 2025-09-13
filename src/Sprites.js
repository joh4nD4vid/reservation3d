import * as THREE from 'three'
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { GlobalInstances } from './global.js'
import { GUI } from 'dat.gui'
import { gsap } from "gsap"
import { Reservation_form } from "./ReservationForm.js"
import { Vue } from './Vue.js'
import { textureManager } from './textures/TextureManager.js'




// TODO Classe mère de Sprite "neutre"
// TODO Si possible, mettre un shader possible
// TODO Deux filles : le sprite réserver - le sprite changer de scène 


// TODO LEs sprites sont copiés à chaque changement de scène...


export class Vue_Collection_Sprites_To_Another_vue {


    static actual_collection = false;


    sprites = [];


    constructor() {

        if ( Vue_Collection_Sprites_To_Another_vue.actual_collection ) {
            Vue_Collection_Sprites_To_Another_vue.actual_collection.remove();
        }
        
        const sprites = Vue.actual.sprites_to_another_vue;

        sprites.forEach( aSprite => {

            this.sprites.push( 
                new Sprite_To_Another_Vue( aSprite.scene_id, aSprite.x, aSprite.y, aSprite.z, aSprite.size ) 
            );

        });

        Vue_Collection_Sprites_To_Another_vue.actual_collection = this;
        this.addToScene();

    }


    remove() {

        this.sprites.forEach( aSprite => {
            aSprite.remove();
        });

        this.sprites = [];

        //TODO Nettoyer la scène aussi
    }


    addToScene() {
        this.sprites.forEach( aSprite => {
            aSprite.addToScene();
        });
    }

}


export class Sprite_To_Another_Vue {


    static texture = false;


    static texture_path = './textures/icone_another_vue.png';


    static actual_hover = null;


    static load_texture() {
        
        new THREE.TextureLoader( textureManager ).load( Sprite_To_Another_Vue.texture_path, ( texture ) => {
            Sprite_To_Another_Vue.texture = texture;
            Sprite_To_Another_Vue.material = new THREE.SpriteMaterial({ map: texture, color: 0xffffff });
        });

    }


    constructor( scene_id, x, y, z, size ) {

        this.scene_id = scene_id;
        this.x = x;
        this.y = y;
        this.z = z;
        this.size = size;

        // console.log( this.size );
        

        this.creation();

    }


    creation() {
        
        this.sprite = new THREE.Sprite( Sprite_To_Another_Vue.material );

        this.sprite.position.set( 
            this.x, 
            this.y, 
            this.z 
        );

        this.sprite.scale.set(5 * this.size, 5 * this.size, 1);
        this.sprite.class = 'toView';
        this.sprite.name = 'To_view_' + this.scene_id;
        this.sprite.ref = this;

        if ( !GlobalInstances.clickables_sprites ) {
            GlobalInstances.clickables_sprites = [];
        }

        GlobalInstances.clickables_sprites.push( this.sprite );
        

        if ( GlobalInstances.scene ) {
            this.addToScene();
        }

    }


    addToScene() {
        GlobalInstances.scene.add( this.sprite );
    }


    click() {
        Vue.setActualTo( this.scene_id );
    }


    remove() {
        GlobalInstances.scene.remove ( this.sprite );
    }


    hover() {
        this.sprite.scale.set(6 * this.size, 6 * this.size, 1);
        Sprite_To_Another_Vue.actual_hover = this;
        // TODO Comment marche actuellement le click sur le another view ?
    }


    static end_hover() {

        if ( Sprite_To_Another_Vue.actual_hover ) {
            const hover = Sprite_To_Another_Vue.actual_hover;
            hover.sprite.scale.set(5 * hover.size, 5 * hover.size, 1);
        }

        Sprite_To_Another_Vue.actual_hover = null;

    }


}



export class Sprite_Reserver {


    static group = false;

    static path = './textures/icone_table.png';
    static pathOff = './textures/icone_table_off.png';

    static test = false;

    static materialOn = null;
    static materialOff = null;

    static actual_hover = null;

    


    static load_scene_sprites( scene_id ) {

        if ( Sprite_Reserver.group ) Sprite_Reserver.clean_scene();

        const key_scene = 'scene_' + scene_id;
        const sprites_of_scene = Sprite_Reserver.positions_in_vue[ key_scene ];
        
        const key_sprites = Object.keys( sprites_of_scene );

        key_sprites.forEach( aKeySprite => {
            new Sprite_Reserver( aKeySprite, key_scene );
        });

    }



    static clean_scene() {
        Sprite_Reserver.group.remove(...Sprite_Reserver.group.children);
    }



    static load_texture() {
        
        const mapOn = new THREE.TextureLoader( textureManager ).load( Sprite_Reserver.path );
        const mapOff = new THREE.TextureLoader( textureManager ).load( Sprite_Reserver.pathOff );
        
        Sprite_Reserver.materialOn = new THREE.SpriteMaterial({ map: mapOn, color: 0xffffff });
        Sprite_Reserver.materialOff = new THREE.SpriteMaterial({ map: mapOff, color: 0xffffff });

    }



    static positions_in_vue = {

        'scene_1' : {

            // 1 : {
            //     x : -55,
            //     y : 18,
            //     z : 0.3
            // }

        },


        'scene_2' : {

            // 1 : {
            //     x : -55,
            //     y : 18,
            //     z : 0.3
            // }

        },


        'scene_3' : {

            // 1 : {
            //     x : -55,
            //     y : 18,
            //     z : 0.3
            // }

        },


        'scene_4' : {

            // 1 : {
            //     x : -55,
            //     y : 18,
            //     z : 0.3
            // }

        },


        'scene_5' : {

            // 1 : {
            //     x : -55,
            //     y : 18,
            //     z : 0.3
            // }

        },


        'scene_6' : {

            // 1 : {
            //     x : -55,
            //     y : 18,
            //     z : 0.3
            // }

        },


        'scene_7' : {

            // 1 : {
            //     x : -55,
            //     y : 18,
            //     z : 0.3
            // }

        }
        
    }


    static target_camera = {
        
        'scene_1' : {

            1 : {
                "x": 2.139488511596606,
                "y": -0.29077080812469025,
                "z": 0.04128454159597237
            },

            2 : {x: 1.0795168622790223, y: -0.07761111222038805, z: 2.253579343913856},

            3 : {x: -0.22771887659539067, y: -0.02382882843618061, z: 2.489493181388035},

            4 : {x: -1.5456513379984707, y: 0.2982253135999853, z: 1.9421698184432157},

            5 : {x: -1.013843366753733, y: 0.45772371560273706, z: -2.2388860238664012}

        },


        'scene_2' : {

            1 : {
                "x": 2.139488511596606,
                "y": -0.29077080812469025,
                "z": 0.04128454159597237
            },

            2 : {x: 1.0795168622790223, y: -0.07761111222038805, z: 2.253579343913856},

            3 : {x: -0.22771887659539067, y: -0.02382882843618061, z: 2.489493181388035},

            4 : {x: -1.5456513379984707, y: 0.2982253135999853, z: 1.9421698184432157},

            5 : {x: -1.013843366753733, y: 0.45772371560273706, z: -2.2388860238664012}

        },

        
        'scene_3' : {

            1 : {
                "x": 2.139488511596606,
                "y": -0.29077080812469025,
                "z": 0.04128454159597237
            },

            2 : {x: 1.0795168622790223, y: -0.07761111222038805, z: 2.253579343913856},

            3 : {x: -0.22771887659539067, y: -0.02382882843618061, z: 2.489493181388035},

            4 : {x: -1.5456513379984707, y: 0.2982253135999853, z: 1.9421698184432157},

            5 : {x: -1.013843366753733, y: 0.45772371560273706, z: -2.2388860238664012}

        },


        'scene_4' : {

            1 : {
                "x": 2.139488511596606,
                "y": -0.29077080812469025,
                "z": 0.04128454159597237
            },

            2 : {x: 1.0795168622790223, y: -0.07761111222038805, z: 2.253579343913856},

            3 : {x: -0.22771887659539067, y: -0.02382882843618061, z: 2.489493181388035},

            4 : {x: -1.5456513379984707, y: 0.2982253135999853, z: 1.9421698184432157},

            5 : {x: -1.013843366753733, y: 0.45772371560273706, z: -2.2388860238664012}

        },


        'scene_5' : {

            1 : {
                "x": 2.139488511596606,
                "y": -0.29077080812469025,
                "z": 0.04128454159597237
            },

            2 : {x: 1.0795168622790223, y: -0.07761111222038805, z: 2.253579343913856},

            3 : {x: -0.22771887659539067, y: -0.02382882843618061, z: 2.489493181388035},

            4 : {x: -1.5456513379984707, y: 0.2982253135999853, z: 1.9421698184432157},

            5 : {x: -1.013843366753733, y: 0.45772371560273706, z: -2.2388860238664012}

        },


        'scene_6' : {

            1 : {
                "x": 2.139488511596606,
                "y": -0.29077080812469025,
                "z": 0.04128454159597237
            },

            2 : {x: 1.0795168622790223, y: -0.07761111222038805, z: 2.253579343913856},

            3 : {x: -0.22771887659539067, y: -0.02382882843618061, z: 2.489493181388035},

            4 : {x: -1.5456513379984707, y: 0.2982253135999853, z: 1.9421698184432157},

            5 : {x: -1.013843366753733, y: 0.45772371560273706, z: -2.2388860238664012}

        },


        'scene_7' : {

            1 : {
                "x": 2.139488511596606,
                "y": -0.29077080812469025,
                "z": 0.04128454159597237
            },

            2 : {x: 1.0795168622790223, y: -0.07761111222038805, z: 2.253579343913856},

            3 : {x: -0.22771887659539067, y: -0.02382882843618061, z: 2.489493181388035},

            4 : {x: -1.5456513379984707, y: 0.2982253135999853, z: 1.9421698184432157},

            5 : {x: -1.013843366753733, y: 0.45772371560273706, z: -2.2388860238664012}

        }

    }


    static available = {

        'scene_1' : {
            1 : true,
            2 : false,
            3 : true,
            4 : true,
            5 : false
        },

        'scene_2' : {
            1 : true,
            2 : false,
            3 : true,
            4 : true,
            5 : false
        },

        'scene_3' : {
            1 : true,
            2 : false,
            3 : true,
            4 : true,
            5 : false
        },

        'scene_4' : {
            1 : true,
            2 : false,
            3 : true,
            4 : true,
            5 : false
        },

        'scene_5' : {
            1 : true,
            2 : false,
            3 : true,
            4 : true,
            5 : false
        },

        'scene_6' : {
            1 : true,
            2 : false,
            3 : true,
            4 : true,
            5 : false
        },

        'scene_7' : {
            1 : true,
            2 : false,
            3 : true,
            4 : true,
            5 : false
        },

    }


    static create_group() {

        const group = new THREE.Group();
        GlobalInstances.scene.add( group );

        Sprite_Reserver.group = group;

    }


    constructor( table_id, scene_id ) {

        if ( !Sprite_Reserver.group ) { Sprite_Reserver.create_group(); }

        this.table_id = table_id;
        this.scene_id = scene_id;
        this.pos_in_vue = Sprite_Reserver.positions_in_vue[ this.scene_id ][ this.table_id ];
        this.target_camera = Sprite_Reserver.target_camera[ this.scene_id ][ this.table_id ];
        this.available = Sprite_Reserver.available[ this.scene_id ][ this.table_id ];
        

        this.create();
        if ( Sprite_Reserver.test ) this.gui();

        GlobalInstances.clickables_sprites.push( this.sprite );

    }


    create() {

        if ( !GlobalInstances.clickables_sprites ) {
            GlobalInstances.clickables_sprites = [];
        }

        const mat = this.available ? Sprite_Reserver.materialOn : Sprite_Reserver.materialOff;
        this.sprite = new THREE.Sprite( mat );


        this.sprite.position.set( 
            this.pos_in_vue.x, 
            this.pos_in_vue.y, 
            this.pos_in_vue.z 
        );

        this.sprite.scale.set(5, 5, 1);
        this.sprite.name = 'Table_' + this.table_id;
        this.sprite.ref = this;

        Sprite_Reserver.group.add( this.sprite );

    }


    gui() {

        const gui = new GUI();
        const spriteFolder = gui.addFolder('Pastille ' + this.table_id );

        spriteFolder.add( this.sprite.position, 'x', -200, 200 );
        spriteFolder.add( this.sprite.position, 'y', -200, 200 );
        spriteFolder.add( this.sprite.position, 'z', -200, 200 );

    }


    hover() {
        this.sprite.scale.set(6, 6, 1);
        Sprite_Reserver.actual_hover = this;
    }


    static end_hover() {

        if ( Sprite_Reserver.actual_hover ) {
            const hover = Sprite_Reserver.actual_hover;
            hover.sprite.scale.set(5, 5, 1);
        }

        Sprite_Reserver.actual_hover = null;

    }


    click() {

        gsap.to( GlobalInstances.camera.position, {
    
            x: this.target_camera.x,
            y: this.target_camera.y,
            z: this.target_camera.z,
            duration: 0.5,
            ease: "ease.inOut",
            onUpdate: function () {
                GlobalInstances.camera.updateProjectionMatrix();
            },
            onComplete() {
                // if ( callback ) { callback(); }
            }
    
        });

        gsap.to( GlobalInstances.camera, {
    
            fov: 40,
            duration: 0.5,
            ease: "ease.inOut",
            onUpdate: function () {
                GlobalInstances.camera.updateProjectionMatrix();
            },
            onComplete() {
                // if ( callback ) { callback(); }
            }
    
        });

        new Reservation_form( this.table_id, '' );

    }   


}

