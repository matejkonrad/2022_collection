function setup() {
  createCanvas(900, 900);
  frameRate(1);
  colorMode(HSB, 360, 100, 100);
}
const getRotation = () => {
  const randy = random(100);
  if (randy < 25) {
    return 90;
  }
  if (randy < 50) {
    return 180;
  }
  if (randy < 75) {
    return 270;
  }

  return 0;
};

function draw() {
  background(160, 0, 0);
  ellipseMode(CORNER);

  // rotateX(radians(frameCount));

  const tilesX = 10;
  const tilesY = tilesX;
  const tileW = width / tilesX;
  const tileH = height / tilesY;

  for (let x = 0; x < tilesX; x++) {
    for (let y = 0; y < tilesY; y++) {
      push();
      const pX = map(x, 0, tilesX, 0, width);
      const pY = map(y, 0, tilesY, 0, height);

      translate(pX, pY);
      fill(0, 0, 0);
      strokeWeight(3);
      stroke(random(1, 20), 80, 90);
      // translate(random(-50, 50), random(-50, 50))
      randomShape(tileW, tileH);
      pop();
    }
  }
}

function randomShape(w, h) {
  const randy = random(0, 100);

  if (randy < 20) {
    ellipse(0, 0, w, h);

    return;
  }
  if (randy < 40) {
    ellipse(0, 0, w / 2, h / 2);
    return;
  }
  if (randy < 60) {

    rotate(radians(getRotation()));
    triangle(0, 0, 0, h, w, h);
    return;
  }
  if (randy < 80) {
    push();
    rotate(radians(getRotation()));
    rect(0, 0, w / 2, h / 2);
    ellipse(w / 2, h / 2, w / 2, h / 2);

    pop();
    return;
  }

  // if (randy < 90) {
		
  //   rotateX(radians(getRotation()));
  //   box(w, h, 1);
  // }
  rect(0, 0, w, h);
}
