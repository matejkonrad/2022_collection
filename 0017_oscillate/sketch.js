// P5Capture.setDefaultOptions({
//   format: "png",
//   framerate: 60,
//   width: 900,
// });

const palletes = {
  pinkblue: ['#cdb4db', '#ffc8dd', '#ffafcc', '#bde0fe', '#a2d2ff'],
  bluered: [
    '#001219',
    '#005f73',
    '#0a9396',
    '#94d2bd',
    '#e9d8a6',
    '#ee9b00',
    '#ca6702',
    '#bb3e03',
    '#ae2012',
    '#9b2226',
  ],
  light_pastels: [
    '#ffadad',
    '#ffd6a5',
    '#fdffb6',
    '#caffbf',
    '#9bf6ff',
    '#a0c4ff',
    '#bdb2ff',
    '#ffc6ff',
    '#fffffc',
  ],
  idunno: ['#f6bd60', '#f7ede2', '#f5cac3', '#84a59d', '#f28482'],
  constrast: [
    '#ff6d00',
    '#ff7900',
    '#ff8500',
    '#ff9100',
    '#ff9e00',
    '#240046',
    '#3c096c',
    '#5a189a',
    '#7b2cbf',
    '#9d4edd',
  ],
  blue_orange: ['#F15412', '#000000', '#34B3F1', '#EEEEEE'],
};
let pallete;
let sphereSize;

function hexToRgb(hex) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

const ang = () => {
  // const heh = [sin, cos, tan];
  const heh = [tan, sin, cos];
  return heh[floor(random() * heh.length)];
};

const boxOrSphere = () => {
  const heh = [box, sphere];
  return heh[floor(random() * heh.length)];
};
let fnX;
let fnY;
let fnZ;
let bs;

function getColor() {
  const array = palletes[pallete];
  const randomColor = array[Math.floor(Math.random() * array.length)];
  return randomColor;
}

function Oscillator() {
  let angle = createVector();
  let velocity = createVector(
    random(-0.02, 0.02),
    random(-0.02, 0.02),
    random(-0.02, 0.02)
  );
  let amplitude = createVector(
    random(width / 4, width / 2),
    random(width / 4, height / 2),
    random(width / 4, height / 2)
  );
  let colory = color(getColor());

  const oscillate = () => {
    angle.add(velocity);
  };

  const display = () => {
    const x = fnX(angle.x) * amplitude.x;
    const y = fnY(angle.y) * amplitude.y;
    const z = fnZ(angle.z) * amplitude.z;
    push();
    translate(width / 2, height / 2);
    noStroke();
    fill(colory);
    translate(x, y, z);
    rotateZ(radians(frameCount));

    bs(sphereSize);
    pop();
  };

  const speedDown = () => {
    // if (velocity.x < -0.01 || velocity.y < -0.01 || velocity.z < -0.01) {
    //   return;
    // }
    // velocity.add(0.0001, 0.0001, 0.0001);
    // velocity.max(10, 10);
  };

  return { display, oscillate, speedDown };
}

let oscies = [];
let oscy;
let bg;

function setup() {
  fnX = ang();
  fnY = ang();
  fnZ = ang();
  bs = boxOrSphere()

  createCanvas(900, 900, WEBGL);
  const palleteKeys = Object.keys(palletes);
  pallete = palleteKeys[Math.floor(Math.random() * palleteKeys.length)];
  sphereSize = random(4, 20);
  for (let i = 0; i < random(1000, 2000); i++) {
    oscies.push(Oscillator());
  }
  bg = getColor();
  background(bg);

	// P5Capture.getInstance().start()
}

let angle = 0;
function draw() {
  // if (frameCount > 130) {
	// 	P5Capture.getInstance().stop()
  //   noLoop()
  // }
  translate(-width / 2, -height / 2);
  // const bgRGB = hexToRgb(bg);
  // const bgColor = color(bgRGB.red, bgRGB.green, bgRGB.blue)
  // fill(bgColor);
  // rect(0, 0, width, height);
  oscies.forEach((oscy) => {
    oscy.speedDown();
    oscy.oscillate();
    oscy.display();
  });
}
