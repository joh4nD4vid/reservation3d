
import { supabase } from './supabaseClient.js';
import { ClientLoader } from './ClientLoader.js'


export class ReservationLoader {


    static TABLE_NAME = 'reservations';


    static async loadById( id ) {

        const { data, error } = await supabase
        .from(ClientLoader.TABLE_NAME)
        .select('*')
        .eq('id', id)
        .single();

        if (error) {
            console.error('Erreur Supabase :', error);
            return null;
        }

        const client = await ReservationLoader.loadClient( data.client_id );

    }


    static async loadClient( client_id ) {

        if ( client_id ) {
            return ClientLoader.loadById( data.client_id );
        }
        
        console.error( 'Pas de Client ID dans la réservation.' );
        
    }


    static async loadTables( reservation_id ) {

        supabase
        .from( ClientLoader.TABLE_NAME )
        .select('*')
        .eq('id', id )
        .single()

        .then(({ data, error }) => {

            if (error) {
                console.error( 'Erreur Supabase :', error );
            } 
            
            else {
                await ReservationLoader.loadClient( data.client_id );
            }

        });

    }

    
    static async loadPlaces( reservation_id ) {

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

        this.created_at = data.created_at;
        this.client_id = data.client_id;
        this.horaire = data.horaire;
        this.etat = data.etat;
        this.commentaire = data.commentaire;

        this.request_client();

    }


    async request_client() {
        this.client = await ClientLoader.loadById( this.client_id );
    }



    presentation() {
        console.log(`Le client s'appelle ${ this.prenom } ${ this.nom }, il a créé son compte le ${ this.dateDeCreation }, 
        son numéro de téléphone est le ${ this.telephone } et son email ${ this.email }.`);
    }



}


