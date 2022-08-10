let capture;

function setup() {
  createCanvas(900, 900);
  capture = createCapture(VIDEO);
  capture.size(900, 900);
  capture.hide();
  // put setup code here
}

function draw() {
  background(0, 0.01);
  //image(capture, 0, 0, 900, 900);
  filter(GRAY);
  capture.loadPixels()
let tilesX = 10;
  let tilesY = 10;
  let tileW = width / tilesX;
  let tileH = height / tilesY;
  noStroke();

  let x = 0;
  let y = 0;
  for (let i = 0; i < tilesY * tilesX; i++) {
    const pX = map(x, 0, tilesX, 0, width);
    const pY = map(y, 0, tilesY, 0, height);
    const pColor = capture.get(pX, pY);

    fill(pColor);
    rect(pX, pY, tileW, tileH);

    if (x === tilesX - 1) {
      x = 0;
      y += 1;
    } else {
      x++;
    }
  }
}
