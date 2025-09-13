import * as THREE from 'three';
import { GlobalInstances } from './global.js';

import vertexShaderMap from '../src/shaders/vertexMap.glsl';
import fragmentShaderMap from '../src/shaders/fragmentMap.glsl';
import { Vue } from './Vue.js'
import { textureManager } from './textures/TextureManager.js'



export class Map {


    static isOn = false;


    static active = false;


    static test = false;

    
    static path_texture = './textures/map.png';


    static get_id_scene() { return 'scene_' + Vue.actual.id };


    static user_position = {

        x : 0,
        y : 0

    }


    constructor() {
        
        Map.active = this; 

        this.direction = null;
        this.box_height = 0;
        this.box_width = 0;


        if  ( Map.isOn ) {

            this.prepare_scene()
            this.test();
            this.update_user_position();

        }

    }


    test() {

        if ( !Map.test ) return;

        window.addEventListener('keydown', e=>{

            if ( e.code === 'ArrowUp' ) up(refThis);
            if ( e.code === 'ArrowDown' ) down(refThis);
            if ( e.code === 'ArrowLeft' ) left(refThis);
            if ( e.code === 'ArrowRight' ) right(refThis);

        });

        const refThis = this;

        function up(refThis) { Map.user_position.y -= 3; refThis.get_user_position_in_uv_coords(); GlobalInstances.rendererMap.render( GlobalInstances.sceneMap, GlobalInstances.cameraMap ); display_pos(); }
        function down(refThis) { Map.user_position.y += 3; refThis.get_user_position_in_uv_coords(); GlobalInstances.rendererMap.render( GlobalInstances.sceneMap, GlobalInstances.cameraMap ); display_pos(); }
        function left(refThis) { Map.user_position.x -= 3; refThis.get_user_position_in_uv_coords(); GlobalInstances.rendererMap.render( GlobalInstances.sceneMap, GlobalInstances.cameraMap ); display_pos(); }
        function right(refThis) { Map.user_position.x += 3; refThis.get_user_position_in_uv_coords(); GlobalInstances.rendererMap.render( GlobalInstances.sceneMap, GlobalInstances.cameraMap ); display_pos(); }

        function display_pos() {
            console.log(`Position Y : ${ Map.user_position.y }`);
            console.log(`Position X : ${ Map.user_position.x }`);
        }
        
    }


    update_user_position() {

        if ( Vue.isOn ) {

            if ( !Vue.actual ) return;
            Map.user_position = Vue.actual.user_position;
            
            this.update_user_position_in_uv_coords();
            GlobalInstances.rendererMap.render( GlobalInstances.sceneMap, GlobalInstances.cameraMap );

        }
        
    }


    prepare_scene() {

        GlobalInstances.cameraMap = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        GlobalInstances.sceneMap = new THREE.Scene();

        this.prepare_material();
        this.prepare_mesh();

        this.settings_scene();

        GlobalInstances.rendererMap.render( GlobalInstances.sceneMap, GlobalInstances.cameraMap );
        this.update_box_size();

    }


    prepare_uniforms() {

        this.uniforms = {

            u_angle : {
                type : 'f',
                value : 0.0
            },

            uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },

            u_map_texture : {
                value : Map.texture
            },

            u_map_height : {
                type : 'f',
                value : Map.tex_height
            },

            u_map_width : {
                type : 'f',
                value : Map.tex_width
            },

            u_box_height : {
                type : 'f',
                value : this.box_height
            },

            u_box_width : {
                type : 'f',
                value : this.box_width
            },

            u_height_ratio : {
                type : 'f',
                value : 0.0
            },

            u_width_ratio : {
                type : 'f',
                value : 0.0
            },

            u_position : {
                type : 'vec2',
                value : new THREE.Vector2( 0.0, 0.0 )
            }

        };

    }


    prepare_material() {

        this.prepare_uniforms();

        GlobalInstances.materialMap = new THREE.ShaderMaterial({

            uniforms: this.uniforms,
            vertexShader : vertexShaderMap,
            fragmentShader : fragmentShaderMap
            
        });
        
    }


    prepare_mesh() {

        var geometry = new THREE.PlaneGeometry(2, 2);
        var shaderPlane = new THREE.Mesh( geometry, GlobalInstances.materialMap );
        GlobalInstances.sceneMap.add ( shaderPlane );

    }


    static load_texture() {

        new THREE.TextureLoader( textureManager ).load( Map.path_texture, ( texture ) => {

            Map.tex_width = texture.image.width;
            Map.tex_height = texture.image.height;
            Map.texture = texture;

        });
        
    }


    get_box_ref() {
        this.ref = document.querySelector('.map');
    }


    update_box_size() {

        this.box_height = this.ref.offsetHeight;
        this.box_width = this.ref.offsetWidth;
        GlobalInstances.materialMap.uniforms.u_box_height.value = this.box_height;
        GlobalInstances.materialMap.uniforms.u_box_width.value = this.box_width;

        const height_ratio = this.box_height / Map.tex_height;
        const width_ratio = this.box_width / Map.tex_width;

        GlobalInstances.materialMap.uniforms.u_height_ratio.value = height_ratio;
        GlobalInstances.materialMap.uniforms.u_width_ratio.value = width_ratio;
        
    }


    settings_scene() {

        GlobalInstances.rendererMap = new THREE.WebGLRenderer();
        GlobalInstances.rendererMap.setPixelRatio( window.devicePixelRatio );
        GlobalInstances.rendererMap.setSize( window.innerWidth * 0.2, window.innerHeight * 0.2 );
        GlobalInstances.rendererMap.setClearColor(0xff0000);
        GlobalInstances.rendererMap.domElement.classList.add('map');
        document.body.appendChild( GlobalInstances.rendererMap.domElement );

        this.get_box_ref();

    }


    update_user_position_in_uv_coords() {

        const x = Map.user_position.x / Map.tex_width;
        const y = Map.user_position.y / Map.tex_height;
        GlobalInstances.materialMap.uniforms.u_position.value = new THREE.Vector2( x, y );

    }

    
}