//Basis variabels
var canvas, ctx, bgcanvas, bgctx
var stars
var colors = new Array('#ffd27d','#ffa371','#a6a8ff','#fffa86','#a87bff')

setup() //Zet de basis elementen
animate() //Voer de animatie uit



function setup(){
  //Maak een canvas aan
  canvas = document.createElement('canvas')
  ctx = canvas.getContext("2d")
  canvas.style.cssText = 'position:absolute;z-index:-1;'
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  document.getElementById('container').prepend(canvas)

  //Zet de achtergrond
  drawBackground()

  //Voeg sterren toe aan de achtergrond
  stars = []
  for (var i = 0; i < 100; i++) {
    stars.push(
      new Star(
        Math.random() * window.innerWidth,
        Math.random() * window.innerHeight,
        Math.random() * 3,
        colors[Math.floor(Math.random() * colors.length)]
      )
    )
  }

  //Beweeg de achtergrond wanneer je met de muis beweegt
  // De Y is uitgecomment omdat ik deze niet mooi vond bij de omhoog gaande sterren. :)
  // Maar kan wel handig zijn voor een volgende achtergrond
  var x = 0, y = 0
  document.addEventListener('mousemove', function(e){
    var lMouseX = Math.max(-100, Math.min(100, window.innerWidth / 2 - e.clientX))
    // var lMouseY = Math.max(-100, Math.min(100, window.innerHeight / 2 - e.clientY))
    var lFollowX = (20 * lMouseX) / 100
    // var lFollowY = (10 * lMouseY) / 100
    var friction = 1/30

    x += (lFollowX - x) * friction
    // y += (lFollowY - y) * friction

    var translate = ''
    // translate = 'translateY(' + y + 'px) '
    translate += 'translateX(' + x + 'px) '
    translate += 'scale(1.1)'
    canvas.style.transform = translate
  }, false)

  //Wanneer het scherm wordt aangepast
  window.addEventListener( 'resize', onWindowResize, false )

}

//Op aanpassing van schermformaat maak het canvas ook groter/kleiner
function onWindowResize() {
	canvas.width = window.innerWidth
	canvas.height = window.innerHeight
	bgcanvas.width = window.innerWidth
	bgcanvas.height = window.innerHeight
}

//Maak de achtergrond
function drawBackground(){
  //Canvas aanmaken en toevoegen
  bgcanvas = document.createElement('canvas')
  bgctx = bgcanvas.getContext("2d")
  bgcanvas.style.cssText = 'position:absolute;z-index:-1'
  bgcanvas.width = window.innerWidth
  bgcanvas.height = window.innerHeight
  bgcanvas.id = 'background'
  document.getElementById('container').prepend(bgcanvas)

  // Create gradient
  var grd = bgctx.createRadialGradient(
    window.innerWidth / 2, window.innerHeight, 1, window.innerWidth / 2, window.innerHeight, window.innerWidth
  )
  grd.addColorStop(0, "#253446")
  grd.addColorStop(1, "#090a0f")

  // Fill with gradient
  bgctx.fillStyle = grd
  bgctx.fillRect(0, 0, window.innerWidth, window.innerHeight)
}

//Maak een ster aan
function Star(x, y, radius, color){
  this.x = x
  this.y = y
  this.radius = radius
  this.color = color
  this.flow = true

  //Functie om de sterren te updaten
  this.update = () => {
    //Wanneer een ster boven het beeld uit komt,
    //Plaats deze dan aan de bodem van het scherm,
    //Op een random locatie in de breedte
    if(this.y < 0){
      this.y = window.innerHeight
      this.x = Math.random() * window.innerWidth
    }
    //En anders mag de ster langzaam omhoog :)
    else{
      this.y -= 0.15 * this.radius
    }

    //Het letterlijke tekenen van de ster
    this.draw()
  }

  //Teken de ster
  this.draw = () => {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0 , Math.PI * 2, false)
    ctx.fillStyle = this.color
    ctx.fill()
    ctx.closePath()
  }
}

//Animeer alles
function animate(){
  requestAnimationFrame(animate)

  //Clear background + redraw
  ctx.clearRect(0,0, window.innerWidth, window.innerHeight)

  stars.forEach(object => {
    object.update()
  })
}
