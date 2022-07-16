let capturing = false;
const capturer = new CCapture({
  format: 'png',
  framerate: 60,
});

const palette = ['#fa448c', '#fec859', '#43b5a0', '#491d88', '#331a38'];
let inc = 0;
const speed = 0.005;
const rotationSpeed = 0.5;
let theta = 0;
let mappyNoiseTo = 1;
const mappyIncrement = 0.3;

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
          -mappyNoiseTo,
          mappyNoiseTo
        );
        const noiseyY = map(
          noise(inc + i + cos(angle), inc + i + sin(angle)),
          0,
          1,
          -mappyNoiseTo,
          mappyNoiseTo
        );
        const x = r * sin(angle) + noiseyx;
        const y = r * cos(angle) + noiseyy;

        const z = r * sin(angle) + noiseyY;

        // const randomIndex = map(i, 0, numSteps + 1, 0, 4);
        // c
        // const colory = palette[int(randomIndex)];
        const noiseColor = map(noise(inc + i), 0, 1, 0, 360);
        const colory = color(noiseColor, noiseColor, 300);

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
  colorMode(HSB, 360);

  circlito = Circlito();
}

function draw() {
  if (frameCount === 1) {
    console.log('starting');
    capturer.start();
    capturing = true;
  }
  background(0);

  noFill();
  strokeWeight(2);

  // rotateY(radians(theta));
  theta += rotationSpeed;

  for (let i = 0; i < 1000; i++) {
    circlito.draw();
  }
  inc += speed;

  mappyNoiseTo += mappyIncrement;
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
