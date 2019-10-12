setup()
animate()

var canvas, ctx
var stars
function setup(){
  canvas = document.createElement('canvas')
  ctx = canvas.getContext("2d")
  canvas.style.cssText = 'position:absolute;z-index:-1;'
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  drawBackground()

  //Add stars
  stars = []
  for (var i = 0; i < 100; i++) {
    stars.push(new Star(Math.random() * window.innerWidth,Math.random() * window.innerHeight, Math.random() * 3, 'white'))
  }

  document.getElementById('container').prepend(canvas)
  // document.addEventListener('mousemove', mouse, false)
  const el = document.querySelector("#container");

  el.addEventListener("mousemove", (e) => {
  el.style.setProperty('--x', -e.offsetX + "px");
  el.style.setProperty('--y', -e.offsetY + "px");
  });
}

function drawBackground(){
    // Create gradient
    var grd = ctx.createRadialGradient(
      window.innerWidth / 2, window.innerHeight, 1, window.innerWidth / 2, window.innerHeight, window.innerWidth
    )
    grd.addColorStop(0, "#253446")
    grd.addColorStop(1, "#090a0f")

    // Fill with gradient
    ctx.fillStyle = grd
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)
}

function Star(x, y, radius, color){
  this.x = x
  this.y = y
  this.radius = radius
  this.color = color
  this.flow = true

  this.update = () => {
    if(this.y < 0){
      this.y = window.innerHeight
      this.x = Math.random() * window.innerWidth
    }
    else{
      this.y -= 0.15 * this.radius
    }

    this.draw()
  }

  this.draw = () => {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0 , Math.PI * 2, false)
    ctx.fillStyle = this.color
    ctx.fill()
    ctx.closePath()
  }
}

function mouse(){
  console.log("haHAA")
}

function animate(){
  requestAnimationFrame(animate)

  //Clear background + redraw
  ctx.clearRect(0,0, window.innerWidth, window.innerHeight)
  drawBackground()

  stars.forEach(object => {
    object.update()
  })
}
