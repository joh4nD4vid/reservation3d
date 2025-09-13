
import { supabase } from './supabaseClient.js';


export class Tables_Places_Loader {


    static TABLE_NAME = 'reservation_tables';


    static async loadById( id ) {

        supabase
        .from( ClientLoader.TABLE_NAME )
        .select('*')
        .eq('reservation_id', id )
        .single()

        .then(({ data, error }) => {

            if (error) {
                console.error('Supabase error:', error);
            } 
            
            else {
                return new ClientLoader( data );
            }

        });

    }


    constructor( id ) {
        this.id = id;
        this.request();
    }


    request() {

        supabase
        .from( ClientLoader.TABLE_NAME )
        .select('*')
        .eq('id', this.id )
        .single()

        .then(({ data, error }) => {

            if (error) {
                console.error('Supabase error:', error);
            } 
            
            else {
                this.save( data );
            }

        });

    }


    save( data ) {

        this.prenom = data.prenom;
        this.nom = data.nom;
        this.telephone = data.telephone;
        this.email = data.email;
        this.dateDeCreation = data.created_at;

        this.presentation();

    }


    presentation() {
        console.log(`Le client s'appelle ${ this.prenom } ${ this.nom }, il a créé son compte le ${ this.dateDeCreation }, 
        son numéro de téléphone est le ${ this.telephone } et son email ${ this.email }.`);
    }



}





