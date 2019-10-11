import { OrbitControls } from './libs/OrbitControls.js';
import { CSS3DRenderer, CSS3DObject } from './libs/CSS3DRenderer.js';

var camera, scene, renderer;
var controls;

//Opzetten van een vlak van de kubus.
//Het lijkt mij het verstandigst hier straks een iframe van te maken, zodat we losse pagina's kunnen maken en importeren.
// Maar hier moeten we samen nog maar even naar kijken.
var Element = function ( content, x, y, z, rx, ry) {
	var div = document.createElement( 'div' );
	div.style.width = '420px';
	div.style.height = '420px';
	div.style.backgroundColor = 'white';
	div.style.textAlign = 'center';
	div.innerHTML = content;

	//Dit is puur om de placeholder fancy in het midden te laten staan. Mag later weg :)
	div.style.display = 'flex';
	div.style.flexDirection = 'column';
	div.style.justifyContent = 'center';

	//Het letterlijke aanmaken van de kubus
	var object = new CSS3DObject( div );
	object.position.set( x, y, z );
	object.rotation.x = rx;
	object.rotation.y = ry;

	return object;
};

init();
animate();

var kubus;
function init() {
	var container = document.getElementById( 'container' );
	camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 5000 );
	camera.position.set( 500, 350, 750 );
	scene = new THREE.Scene();
	renderer = new CSS3DRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );

	//Hier worden de kanten van de kubus aangemaakt.
	kubus = new THREE.Group();
	kubus.add( new Element( 'Front', 0, 0, 210, 0, 0 ) ); //Front
	kubus.add( new Element( 'Right', 210, 0, 0, 0, Math.PI / 2 ) ); 		//Right
	kubus.add( new Element( 'Back', 0, 0, - 210, 0, Math.PI ) ); 			//Back
	kubus.add( new Element( 'Left', - 210, 0, 0, 0, -Math.PI / 2 ) ); //Left
	kubus.add( new Element( 'Top', 0, 210, 0, Math.PI/2, Math.PI ) ); //Top
	kubus.add( new Element( 'Bottom', 0, -210, 0, Math.PI / 2, 0) ); //Bottom
	scene.add( kubus );

	//De controller zodat je de kubus kan draaien.
	//TODO: Iets maken waardoor de kubus voor x seconden stil blijft staan na het draaien.
	//Wss kun je de animate wel pauzeren, maar moet je maar even uitzoeken :)
	var controls = new OrbitControls( camera, renderer.domElement );

	//Zorgen dat de kubus altijd recht in beeld blijft wanneer het scherm wordt aangepast.
	window.addEventListener( 'resize', onWindowResize, false );

}

//De functie die de schermaanpassing uitvoerd
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}

//Deze functie wordt 60x per seconden uitgevoerd. Heerlijk :)
var flow = true;
function animate() {
	requestAnimationFrame( animate );

	kubus.rotation.y += 0.0025; //Laat de kubus draaien

	//Zorg dat de kubus op en neer beweegt
	if(flow == true && kubus.rotation.x <= 0.25){
		kubus.rotation.x += 0.001;
	}
	else {
		kubus.rotation.x -= 0.001;
		flow = false;

		if(kubus.rotation.x <= -0.25){
			flow = true;
		}
	}

	renderer.render( scene, camera );
}
