let capturing = false;
const capturer = new CCapture({
  format: 'png',
  framerate: 60,
});

const palette = ['#fa448c', '#fec859', '#43b5a0', '#491d88', '#331a38'];
let inc = 0;
const speed = 0.01;
const rotationSpeed = 0.5;
let theta = 0;

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
          noise(inc + i + sin(angle), inc + i + cos(angle)),
          0,
          1,
          -200,
          200
        );
        const noiseyY = map(
          noise(inc + i + cos(angle), inc + i + sin(angle)),
          0,
          1,
          -200,
          200
        );
        const x = r * sin(angle) + noiseyX;
        const y = r * cos(angle) + noiseyY;

        const z = r * sin(angle) + noiseyY;

        const randomIndex = map(i, 0, numSteps + 1, 0, 4);
        const colory = palette[int(randomIndex)];

        stroke(colory);
        fill(colory);
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
  frameRate(60);

  circlito = Circlito();
}

function draw() {
  background(0);

  noFill();
  strokeWeight(2);

  rotateY(radians(theta));
  theta += rotationSpeed;

  for (let i = 0; i < 1000; i++) {
    circlito.draw();
  }
  inc += speed;

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
