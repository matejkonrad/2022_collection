let y = 0;
let dir = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);
  y = height / 2;
  background(0);
}

function draw() {
  background(0, 2);
  noStroke();
  fill(255);

  for (let i = 0; i < width; i++) {
    const noisey = noise(i * 0.01, frameCount * 0.01);
    ellipse(i, y * noisey, 1, 1);
  }

  if (y > height  && dir === 10) {
    dir = -10;
  }
  if (y < height * 2 && dir === -10) {
    dir = 10;
  }

  y += dir;
}
