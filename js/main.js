import { OrbitControls } from './libs/OrbitControls.js';
import { CSS3DRenderer, CSS3DObject } from './libs/CSS3DRenderer.js';

var camera, scene, renderer;
var controls;

var Element = function ( content, x, y, z, rx, ry) {
	var div = document.createElement( 'div' );
	div.style.width = '420px';
	div.style.height = '420px';
	div.style.backgroundColor = 'white';
	div.innerHTML = content;

	var object = new CSS3DObject( div );
	object.position.set( x, y, z );
	object.rotation.x = rx;
	object.rotation.y = ry;

	return object;
};

init();
animate();

var group;
function init() {
	var container = document.getElementById( 'container' );
	camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 5000 );
	camera.position.set( 500, 350, 750 );
	scene = new THREE.Scene();
	renderer = new CSS3DRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );

	group = new THREE.Group();
	group.add( new Element( 'Front', 0, 0, 210, 0, 0 ) ); //Front
	group.add( new Element( 'Right', 210, 0, 0, 0, Math.PI / 2 ) ); 		//Right
	group.add( new Element( 'Back', 0, 0, - 210, 0, Math.PI ) ); 			//Back
	group.add( new Element( 'Left', - 210, 0, 0, 0, -Math.PI / 2 ) ); //Left
	group.add( new Element( 'Top', 0, 210, 0, Math.PI / 2, 0 ) ); //Top
	group.add( new Element( 'Bottom', 0, -210, 0, Math.PI / 2, 0) ); //Bottom
	scene.add( group );

	var controls = new OrbitControls( camera, renderer.domElement );

	window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}


var flow = true;
function animate() {
	requestAnimationFrame( animate );

	group.rotation.y += 0.0025; //Laat de group draaien

	//Zorg dat de group op en neer beweegt
	if(flow == true && group.rotation.x <= 0.25){
		group.rotation.x += 0.001;
	}
	else {
		group.rotation.x -= 0.001;
		flow = false;

		if(group.rotation.x <= -0.25){
			flow = true;
		}
	}

	renderer.render( scene, camera );
}
