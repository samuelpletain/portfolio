const canvas = document.getElementById('myCanvas');
const context = canvas.getContext('2d');
context.strokeStyle = 'red';
context.fillStyle = 'rgba(0, 0, 256, .5)';
context.fillRect(10, 10, 100, 100);
context.strokeRect(10, 10, 100, 100);

function drawPattern() {
  const canvas = document.getElementById('demo2')
  const context = canvas.getContext('2d')
  context.strokeStyle = 'red'

  const img = new Image()
  img.src = './anim.png'
  img.onload = () => {
    const pattern = context.createPattern(img, 'repeat')
    context.fillStyle = pattern
    context.fillRect(10, 10, 100, 100)
    context.strokeRect(10, 10, 100, 100)
  }
}

function drawGradiant(canvas) {
  const context = canvas.getContext('2d')
  context.strokeStyle = 'red'
  var gradient = context.createLinearGradient(0, 0, 0, 200)
  gradient.addColorStop(0, 'blue')
  gradient.addColorStop(1, 'white')
  context.fillStyle = gradient
  context.fillRect(10, 10, 100, 100)
  context.strokeRect(10, 10, 100, 100)
} 

function drawCircle(canvas) {
  const context = canvas.getContext('2d')
  context.beginPath()
  context.arc(100, 100, 50, 0, Math.PI * 2, true)
  context.closePath()
  context.strokeStyle = 'red'
  context.fillStyle = 'blue'
  context.lineWidth = 3
  context.fill()
  context.stroke()
}

function saveDrawing() {
  const canvas5 = document.getElementById('demo5')
  const url = canvas5.toDataURL('image/png')
  const w = window.open('about:blank')
  const image = new Image()
  image.src = url
  setTimeout(function(){
    w.document.write(image.outerHTML)
  }, 0);
}

const demo3 = document.getElementById('demo3')
const demo4 = document.getElementById('demo4')
const demo5 = document.getElementById('demo5')

const saveButton = document.getElementById('saveButton')
saveButton.addEventListener('click', saveDrawing, false)

window.addEventListener('load', drawImageToCanvas, false)

function drawImageToCanvas() {
  const canvas = document.getElementById('demo6')
  const context = canvas.getContext('2d')
  const image = document.getElementById('myImageElem')
  context.drawImage(image, 50, 50, 100, 100)
  const imageData = context.getImageData(0, 0, 1, 1)
  const pixelData = imageData.data
  console.log(pixelData)
}

function manipulateImage() {
  const canvas = document.getElementById('demo6')
  const context = canvas.getContext('2d')

  const imageData = context.getImageData(0, 0, 200, 200)

  let red, green, blue, greyscale;

  for (let i = 0; i < imageData.data.length; i += 4) {
    red = imageData.data[i]
    green = imageData.data[i+1]
    blue = imageData.data[i+2]

    greyscale = red * 0.3 + green * 0.59 + blue * 0.11

    imageData.data[i] = greyscale
    imageData.data[i+1] = greyscale
    imageData.data[i+2] = greyscale
  }
  
  context.putImageData(imageData, 0, 0)
}

const manipulateButton = document.getElementById('manipulateButton')
manipulateButton.addEventListener('click', manipulateImage)

drawPattern()
drawGradiant(demo3)
drawCircle(demo4)
drawCircle(demo5)

/* I could also manipulate the pixels of a video like so:
function manipulateVideo() {
  const video = document.getElementById('myVideo')
  const canvas = document.getElementById('myCanvas')
  const context = canvas.getContext('2d')

  video.addEventListener('play', () => draw(video, context, canvas), false)
} 

function draw(video, context, canvas) {
  if (video.paused || video.ended) {
    return false
  }

  drawOneFrame(video, context, canvas)

  setTimeout(() => draw(video, context, canvas), 0)
}

function drawOneFrame(video, context, canvas) {
  context.drawImage(video, 0, 0, canvas.width, canvas.height)

  try {
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
    const pixelData = imageData.data
  
    let red, green, blue, greyscale
  
    for(let i = 0; i < pixelData.length; i += 4) {
      [red, green, blue] = [pixelData[i], pixelData[i+1], pixelData[i+2]]
  
      greyscale = red * 0.3 + green * 0.59 + blue * 0.11;
  
      [pixelData[i], pixelData[i+1], pixelData[i+2]] = [greyscale, greyscale, greyscale]
    }
  
    context.putImageData(imageData, 0, 0)
  } catch (err) {
    canvas.width = canvas.width // Reset the width to clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height)
    canvas.style.backgroundColor = 'transparent'
    context.fillStyle = 'white'
    context.textAlign = 'left'

    context.font = "18px Arial, sans-serif"

    context.fillText('There was an error rendering', 10, 20)
    context.fillText('the video to the canvas.', 10, 40)
    context.fillText('Perhaps you are viewing this page from', 10, 70)
    context.fillText('a file on your computer?', 10, 90)
    context.fillText('Try viewing this page online instead.', 10, 130)
    
    return false
  }
}

Paint pixels = canvas
Access content through DOM = SVG

To create draggable images, add the draggable attribute and set it to true. It is not a Boolean.
We can set an event listener with the event 'dragstart'

Example: 
*/

myImage.addEventListener('dragstart', (event) => {
  event.dataTransfer.setData("text/plain", this.id)
})

receptionItem.addEventListener('dragover', (event) => {
  event.preventDefault(); // Prevent the default behavior of the picture we drag things over.
})

receptionItem.addEventListener('drop', (event) => {
  // do something
  myImageId = event.originalEvent.dataTransfer.getData("text/plain")
  // do something else
  event.preventDefault()
})