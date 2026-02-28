var canvas;
var ctx; 

// COLLISION LAYER:
// black = collision

// POINTS LAYER:
// lvl 3 = 255,0,0
// lvl 2 = 0,255,0
// if not lvl 2 or 3, then it's lvl 1



function createImageCanvas(imgSrc) {
  const img = new Image();
  img.src = imgSrc;

  // We must wait for the image to load before drawing
  img.onload = () => {
    canvas = document.createElement('canvas');
    canvas.id = 'myCanvas';
    ctx = canvas.getContext('2d', { willReadFrequently: true }); // Optimize for reading pixel data

    // Set canvas dimensions to match the image
    canvas.width = img.width;
    canvas.height = img.height;

    // Draw the image at coordinates (0, 0)
    ctx.drawImage(img, 0, 0);

    // Add the canvas to the DOM so you can see it
    // document.body.appendChild(canvas);
  };

  img.onerror = () => {
    console.error("Failed to load image at: " + imgSrc);
  };
}

// Usage:
createImageCanvas('./test.png');

function getPixelColor(x, y) {
//   var canvas = document.getElementById('myCanvas');
//   var ctx = canvas.getContext('2d', { willReadFrequently: true }); // Optimize for reading pixel data
  const pixelData = ctx.getImageData(x, y, 1, 1).data;

  return {
    r: pixelData[0],
    g: pixelData[1],
    b: pixelData[2],
    a: pixelData[3] // Alpha (transparency) from 0-255
  };
}
