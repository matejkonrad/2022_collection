let capturing = false;
const capturer = new CCapture({
  format: 'png',
  framerate: 120,
});

const palette = ['#fa448c', '#fec859', '#43b5a0', '#491d88', '#331a38'];

function Circlito() {
  let r = 200;
  let angle = 0;
  let numSteps = 10;
  let step = TWO_PI / numSteps;
  return {
    draw: () => {
      beginShape();
      for (let i = 0; i < numSteps + 1; i++) {
        const noiseyX = map(
          noise(frameCount + i + sin(angle), frameCount + i + cos(angle)),
          0,
          1,
          -200,
          200
        );
        const noiseyY = map(
          noise(frameCount + i + cos(angle), frameCount + i + sin(angle)),
          0,
          1,
          -200,
          200
        );
        const x = r * sin(angle) + noiseyX;
        const y = r * cos(angle) + noiseyY;

        const z = r * sin(angle) + noiseyY;

        const randomIndex = random(0, 4);
        const colory = palette[int(randomIndex)];

        stroke(colory);
        fill(colory)
        vertex(x, y, z);
        angle += step;
      }
      endShape();
    },
  };
}

let circlito;
let scaly = 1;
function setup() {
  createCanvas(900, 900, WEBGL);
  frameRate(120);
  
  circlito = Circlito();
}

function draw() {
  background(0);
  if (frameCount % 1000 === 0) {
    background(0);
  }
  noFill();
  // stroke('rgba(255, 255, 255, 0.5)');
  strokeWeight(2);

  rotateY(radians(frameCount));
  // translate(width / 2, height / 2);

  for (let i = 0; i < 1000; i++) {
    // scale(scaly + i * 0.05)
    // translate(100, 0);
    circlito.draw();
  }

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