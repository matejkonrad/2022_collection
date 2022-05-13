let capturing = false;
const capturer = new CCapture({
  format: 'png',
  framerate: 2,
});

const elementsX = 15;
const elementsY = 15;
const borderWidth = 50;

function Curve(initX, initY, initMaxWidth, initMaxHeight) {
  let x = initX;
  let y = initY;
  let maxWidth = initMaxWidth;
  let maxHeight = initMaxHeight;

  const top = () => {
    vertex(maxWidth / 2, 0);
  };
  const right = () => {
    vertex(maxWidth, maxHeight / 2);
  };
  const bottom = () => {
    vertex(maxWidth / 2, maxHeight);
  };
  const left = () => {
    vertex(0, maxHeight / 2);
  };
  const middle = () => {
    vertex(maxWidth / 2, maxHeight / 2);
  };

  const straightLine = () => {
    const randy = random(0, 10);
    if (randy < 5) {
      left();
      left();
      right();
      right();
      return;
    }

    top();
    top();
    bottom();
    bottom();
  };

  const curvedLine = () => {
    const randy = random(0, 10);

    if (randy < 2.5) {
      top();
      top();
      // middle();
      left();
      left();
    } else if (randy < 5) {
      left();
      left();

      // middle();
      bottom();
      bottom();
    } else if (randy < 7.5) {
      bottom();
      bottom();
      // middle();

      right();
      right();
      //
    } else {
      //
      bottom();
      bottom();
      middle();
      left();
      left();
    }
  };

  const vertexy = () => {
    const randy = random(10);
    if (randy < 3) {
      straightLine();
    } else {
      curvedLine();
    }
  };

  const paint = () => {
    push();
    // fill('#f1f1f1');
    stroke('#f1f1f1');
    strokeWeight(5);
    translate(x, y);

    beginShape();
    // vertexy();
    vertexy();
    endShape();
    pop();
  };

  return { paint };
}
const curves = [];

const addBorderTwo = () => {
  push();
  fill(0);
  translate(0, 0);
  rect(0, 0, width, borderWidth);
  rect(width - borderWidth, 0, borderWidth, height);
  rect(0, 0, borderWidth, height);
  rect(0, height - borderWidth, width, borderWidth);
  pop();
};

function setup() {
  createCanvas(900, 900);

  frameRate(1);
  noFill();
  const maxWidth = width / elementsX;
  const maxHeight = height / elementsY;
  for (let y = 0; y < elementsY; y++) {
    for (let x = 0; x < elementsX; x++) {
      const mapX = map(x, 0, elementsX, 0, width);
      const mapY = map(y, 0, elementsY, 0, height);
      curves.push(Curve(mapX, mapY, maxWidth, maxHeight));
    }
  }
}

function draw() {
  // translate(30, 40)height / 4
  // scale(0.9)
  background(0);
  curves.forEach((curve) => curve.paint());

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
