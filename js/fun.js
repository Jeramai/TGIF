import { cube_sides } from './main.js'

var konamiCode = [38,38,40,40,37,39,37,39,65,66]
var pos = 0

document.addEventListener('keydown', function(e) {
  let requiredKey = konamiCode[pos]

  if (e.keyCode == requiredKey) {
    pos++

    if (pos == konamiCode.length) {
      setKitties()
    }
  } else {
    pos = 0
  }
}, true)

function setKitties() {
  for(let i=0; i<6; i++){
    var cat_image = '<img src="https://source.unsplash.com/420x420/?cute-kitten&sig='+i*13+'" alt="kitty">'
    var item = document.getElementById('cube_'+cube_sides[i]).contentWindow.document.getElementsByTagName("body")[0]
    item.style.margin = 0
    item.style.overflow = 'hidden'
    item.innerHTML = cat_image

    var audio = new Audio('./sounds/cat_sound.wav')
    audio.play()
  }
}
