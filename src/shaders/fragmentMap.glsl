precision mediump float;

varying vec2 vUv;
uniform float u_angle;
uniform sampler2D u_map_texture;

uniform float u_map_height;
uniform float u_map_width;

uniform float u_height_ratio;
uniform float u_width_ratio;

uniform vec2 u_position;


void main() {


// TODO MEttre Icone utilisateur (centre)

// TODO Mettre la position des macarons sur la carte (tables + autres scenes)


// TODO Quand on passe à une autre scène, Le plan se repositionne sur la nouvelle position utilisateur 
// (A faire côté CPU, on fait une interpolation de la position utilisateur.)
// La petite interpolation doit être synchro avec le "shader de transition" entre deux textures environnement.

// TODO Faire la transition entre les deux textures environnement. (optionnel.)



    vec2 texture_uv = vec2( vUv.x * u_width_ratio + u_position.x, vUv.y * u_height_ratio + (1.0-u_position.y)  );

    vec4 map_texture = texture( u_map_texture, texture_uv );

    vec2 center_uv = vec2 ( vUv.x - 0.5, 1.0 - vUv.y - 0.5 );

    float uv_angle = atan( center_uv.y, center_uv.x );

    float radar =  (u_angle + 3.14159265359 - uv_angle) / 6.28318530718;
    float radar_2 =  (u_angle + 2.570796326 - uv_angle) / 6.28318530718;
    

    float truc = 0.01;
    float edge = 0.5;

    radar = smoothstep( edge, edge + truc, radar );
    radar_2 = smoothstep( edge, edge + truc, radar_2 );

    radar = radar - radar_2;



    vec4 color_radar = vec4 ( radar, radar, radar, 1.0 );
    vec4 final_color = mix( color_radar, map_texture, 0.5 );

    gl_FragColor = final_color;

}