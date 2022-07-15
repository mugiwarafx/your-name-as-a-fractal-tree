const canvas = document.querySelector('canvas')
const generateInput = document.querySelector('.generate-tree-button')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const ctx = canvas.getContext('2d')

let curve
let nameString

function stringToColour(str) {
  var hash = 0

  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }

  var colour = '#'

  for (var i = 0; i < 3; i++) {
    var value = (hash >> (i * 8)) & 0xff
    colour += ('00' + value.toString(16)).substr(-2)
  }

  return colour
}

function drawTree(
  startX,
  startY,
  len,
  angle,
  branchWidth,
  colorTrunk,
  colorLeaves
) {
  ctx.beginPath()
  ctx.save()

  ctx.strokeStyle = colorTrunk
  ctx.fillStyle = colorLeaves
  ctx.shadowBlur = 15
  ctx.shadowColor = 'rgba(255,255,255,.5)'
  ctx.lineWidth = branchWidth

  ctx.translate(startX, startY)
  ctx.rotate((angle * Math.PI) / 180) //angle in degrees and then we convert to rads

  ctx.moveTo(0, 0)
  //ctx.lineTo(0, -len) // -len makes the tree "grow up"
  if (angle > 0) {
    ctx.bezierCurveTo(10, -len / 2, 10, -len / 2, 0, -len)
  } else {
    ctx.bezierCurveTo(10, -len / 2, -10, -len / 2, 0, -len)
  }

  ctx.stroke()

  if (len < 10) {
    // leaves
    ctx.beginPath()
    ctx.arc(0, -len, 6, 0, Math.PI / 2)
    ctx.fill()
    ctx.restore()
    return // we can't create fractals indefinitely
  }

  curve = Math.random() * 10 + 10

  drawTree(0, -len, len * 0.75, angle + curve, branchWidth * 0.4)
  drawTree(0, -len, len * 0.75, angle - curve, branchWidth * 0.7)

  ctx.restore()
}

drawTree(canvas.width / 2, canvas.height - 80, 80, 0, 5, 'white', 'green')

function generateRandomTree(name) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // startX, startY, len, angle, branchWidth, colorTrunk, colorLeaves
  let len = 80
  let angle = 0
  let branchWidth = 5
  let colorTrunk = 'white'
  /* 
    'rgb(' +
    Math.random() * 255 +
    ',' +
    Math.random() * 255 +
    ',' +
    Math.random() * 255 +
    ')' 
    */

  let colorLeaves = stringToColour(name)

  drawTree(
    canvas.width / 2,
    canvas.height - 80,
    len,
    angle,
    branchWidth,
    colorTrunk,
    colorLeaves
  )
}

generateInput.addEventListener('keyup', (e) => {
  console.log(e.target.value)
  nameString = e.target.value
  generateRandomTree(nameString)
})

generateInput.insertAdjacentHTML('afterend', '<div id="generateTree">🪴</div>')

generateTreeButton = document.getElementById('generateTree')
