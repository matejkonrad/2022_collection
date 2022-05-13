let capturing = false;
const capturer = new CCapture({
  format: 'png',
  framerate: 30,
});

const settings = {
  numberOfShapesX: 10,
  numberOfShapesY: 10,
  ellipses: 100,
  colorIncrementerSet: 5,
  colorMin: 0,
  colorMax: 360,
  elementWidth: 3,
  elementHeight: 3,
  borderWidth: 50,
  borderTwoWidth: 3,
};

const addBorder = () => {
  push();
  fill(0);
  translate(0, 0);
  rect(-width / 2, -height / 2, width, settings.borderWidth);
  rect(
    width / 2 - settings.borderWidth,
    -height / 2,
    settings.borderWidth,
    height
  );
  rect(-width / 2, -height / 2, settings.borderWidth, height);
  rect(
    -width / 2,
    height / 2 - settings.borderWidth,
    width,
    settings.borderWidth
  );
  pop();
};
const addBorderTwo = () => {
  push();
  fill(0);
  translate(0, 0);
  rect(0, 0, width, settings.borderTwoWidth);
  rect(width - settings.borderWidth, 0, settings.borderTwoWidth, height);
  rect(0, 0, settings.borderTwoWidth, height);
  rect(0, height - settings.borderTwoWidth, width, settings.borderTwoWidth);
  pop();
};

let colorIncrementer = settings.colorMin;
function setup() {
  createCanvas(900, 900, WEBGL);
  frameRate(30);

  colorMode(HSB, 360, 100, 100);
  background(0); // const filly = map(noise(colorIncrementer), 0, 1, settings.colorMin, settings.colorMax);
}

function draw() {
  // if (frameCount === 1) {
  //   capturer.start();
  //   capturing = true;
  // }
  addBorder();
  fill(colorIncrementer, 100, 90);

  // fill(filly, 40, 100);
  noStroke();
  rotateY(radians(frameCount));
  rotateX(radians(frameCount));
  orbitControl();

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
  addBorderTwo();
  capturer.capture(document.getElementById('defaultCanvas0'));
}

function keyPressed() {
  if (keyCode === ENTER) {
    if (!capturing) {
      capturer.start();
      capturing = true;
    } else {
      capturer.stop();
      capturer.save();
      capturing = false;
    }
  }
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
