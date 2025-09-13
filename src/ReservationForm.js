import { gsap } from "gsap"
import { GlobalInstances } from './global.js'


export class Reservation_form {


    constructor( table_id, horaires ) {

        if ( !Reservation_form.init ) { Reservation_form.events(); }
        this.table_id = table_id;
        this.horaires = horaires;
        this.fill();
        this.display();
    }


    static init = false;
    static box = document.querySelector('#reservation_box');
    static tableName = document.querySelector('#table_name');
    static close = document.querySelector('#close-btn');


    static events() {
        Reservation_form.close.addEventListener('click', e=>{
            Reservation_form.declick();
        });
    }



    fill() {
        Reservation_form.tableName.innerHTML = this.table_id;
    }


    display() {
        Reservation_form.box.style.display = 'inline-block';
    }


    static hide() {
        Reservation_form.box.style.display = 'none';
    }


    static declick() {

        Reservation_form.hide();

        gsap.to( GlobalInstances.camera, {
    
            fov: 70,
            duration: 0.5,
            ease: "ease.inOut",
            onUpdate: function () {
                GlobalInstances.camera.updateProjectionMatrix();
            },
            onComplete() {
                // if ( callback ) { callback(); }
                console.log('test');
                
            }
    
        });

    } 


}