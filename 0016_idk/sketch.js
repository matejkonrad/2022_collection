function Painter(points) {
  const noiseatte = (p) => {
    return p + map(noise(p + frameCount * 0.001), 0, 1, -100, 100);
  };

  const vrtx = (point, idx) => {
    // if (idx % 5 === 0) {
      // curveVertex(noiseatte(point.x), noiseatte(point.y));
      // endShape();
			// fill(random(255))
      // beginShape();
      // return;
    // }

    curveVertex(noiseatte(point.x), noiseatte(point.y));
  };

  const display = () => {
    beginShape();
    const first = points[0];
    curveVertex(first.x, first.y);
    curveVertex(first.x, first.y);

    points.forEach(vrtx);

    curveVertex(first.x, first.y);
    curveVertex(first.x, first.y);
    endShape();
  };

  return { display };
}

const points = [];
const pointSum = 30;
function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < pointSum + 2; i++) {
    points.push(createVector(random(width), random(height)));
  }
}

function draw() {
  background(0);
  strokeWeight(3);
  stroke('#f1f1f1');
  // blendMode(DIFFERENCE)
  // noStroke()
  Painter(points).display();
}
