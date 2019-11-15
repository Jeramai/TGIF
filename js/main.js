import { OrbitControls } from './libs/OrbitControls.js'
import { CSS3DRenderer, CSS3DObject } from './libs/CSS3DRenderer.js'

var camera, scene, renderer
var controls

var kubus
var cube_sides = {
  0: 'front',
  1: 'right',
  2: 'back',
  3: 'left',
  4: 'top',
  5: 'bottom'
}
export { cube_sides }

var flow = true
var animateFlow = true

//Opzetten van een vlak van de kubus.
var Element = function ( id, content, x, y, z, rx, ry) {
	var div = document.createElement( 'iframe' )
	div.id = id
	div.style.width = '420px'
	div.style.height = '420px'
	div.style.border = 'none'
	div.style.backgroundColor = 'white'
	div.src = content
	div.addEventListener( 'mouseover', function (){
		if(!mouseDown){
			animateFlow = false
		}
	}, true )

	div.addEventListener( 'mouseout', function (){
		if(!mouseDown){
			animateFlow = true
		}
	}, true )


	//Het letterlijke aanmaken van de kubus
	var object = new CSS3DObject( div )
	object.position.set( x, y, z )
	object.rotation.x = rx
	object.rotation.y = ry

	return object
}

var mouseDown = false
document.body.onmousedown = function() {
  mouseDown = true
}
document.body.onmouseup = function() {
  mouseDown = false
}

init()
animate()

function init() {
	var container = document.getElementById( 'container' )
	camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 5000 )
	camera.position.set( 500, 350, 750 )
	scene = new THREE.Scene()
	renderer = new CSS3DRenderer()
	renderer.setSize( window.innerWidth, window.innerHeight )
	container.appendChild( renderer.domElement )

	//Hier worden de kanten van de kubus aangemaakt.
	kubus = new THREE.Group()
	kubus.add( new Element( 'cube_'+cube_sides[0], './sides/front.html', 0, 0, 210, 0, 0 ) ) //Front
	kubus.add( new Element( 'cube_'+cube_sides[1], './sides/right.html', 210, 0, 0, 0, Math.PI / 2 ) ) 		//Right
	kubus.add( new Element( 'cube_'+cube_sides[2], './sides/back.html', 0, 0, - 210, 0, Math.PI ) ) 			//Back
	kubus.add( new Element( 'cube_'+cube_sides[3], './sides/left.html', - 210, 0, 0, 0, -Math.PI / 2 ) ) //Left
	kubus.add( new Element( 'cube_'+cube_sides[4], './sides/top.html', 0, 210, 0, Math.PI/2, Math.PI ) ) //Top
	kubus.add( new Element( 'cube_'+cube_sides[5], './sides/bottom.html', 0, -210, 0, Math.PI / 2, 0) ) //Bottom
	scene.add( kubus )

	//De controller zodat je de kubus kan draaien.
	//TODO: Iets maken waardoor de kubus voor x seconden stil blijft staan na het draaien.
	//Wss kun je de animate wel pauzeren, maar moet je maar even uitzoeken :)
	var controls = new OrbitControls( camera, renderer.domElement )

	//Zorgen dat de kubus altijd recht in beeld blijft wanneer het scherm wordt aangepast.
	window.addEventListener( 'resize', onWindowResize, false )

}

//De functie die de schermaanpassing uitvoerd
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight
	camera.updateProjectionMatrix()
	renderer.setSize( window.innerWidth, window.innerHeight )
}

//Deze functie wordt 60x per seconden uitgevoerd. Heerlijk :)
function animate() {
	requestAnimationFrame( animate )

	if(!animateFlow){
		return false
	}

	kubus.rotation.y += 0.0025 //Laat de kubus draaien

	//Zorg dat de kubus op en neer beweegt
	if(flow == true && kubus.rotation.x <= 0.25){
		kubus.rotation.x += 0.001
	}
	else {
		kubus.rotation.x -= 0.001
		flow = false

		if(kubus.rotation.x <= -0.25){
			flow = true
		}
	}

	renderer.render( scene, camera )
}
