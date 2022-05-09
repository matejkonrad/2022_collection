const settings = {
  numberOfShapesX: 10,
  numberOfShapesY: 10,
  ellipses: 100,
  colorIncrementerSet: 5,
  colorMin: 0,
  colorMax: 360,
  elementWidth: 3,
  elementHeight: 3,
};

let colorIncrementer = settings.colorMin;
function setup() {
  createCanvas(900, 900, WEBGL);
  frameRate(60);

  colorMode(HSB, 360, 100, 100);
  background(0); // const filly = map(noise(colorIncrementer), 0, 1, settings.colorMin, settings.colorMax);
}

function draw() {
  fill(colorIncrementer, 30, 100);

  // fill(filly, 40, 100);
  noStroke();
  rotateY(radians(frameCount));
  rotateX(radians(frameCount));
  orbitControl();

  // scale(2.7);
  translate(-width / 2, -height / 2);
  for (let y = 0; y < settings.numberOfShapesY; y++) {
    for (let x = 0; x < settings.numberOfShapesY; x++) {
      push();
      const calcX = map(x, 0, settings.numberOfShapesX, 0, width - 300);
      const calcY = map(y, 0, settings.numberOfShapesY, 0, height);

      const randyX = randomGaussian(calcX, y);
      const randyY = randomGaussian(calcY, x);

      translate(randyX, randyY);
      renderEllipses();
      pop();
    }
  }
  if (colorIncrementer >= settings.colorMax) {
    colorIncrementer = settings.colorMin;
  }
  colorIncrementer += settings.colorIncrementerSet;
}

const renderEllipses = (x, y) => {
  // for (let j = 0; j < settings.ellipses; j++) {
  for (let i = 0; i < settings.ellipses; i++) {
    const randyX = randomGaussian(0, 3);
    const randyY = randomGaussian(0, 3);
    const randyZ = randomGaussian(0, 3);
    // translate(mouseX, mouseY, randyZ);
    rotate(frameCount + randyX);
    translate(0, 0, map(i, 0, settings.ellipses, 0, 50));
    ellipse(randyX, randyY, settings.elementWidth, settings.elementHeight);
  }
  // }
};
