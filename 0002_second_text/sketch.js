const quotes = [
  'CHILI',
  'potato',
  'WAGYU',
  'bosciola',
  'TRUFFLES',
  'burger',
  'PIZZA',
  'čevapi',
  'RAMEN',
  'noodles',

  'DIGITAL',
  'eliminate',
  'CREATIVE',
  'privacy',
  'MULTIPLY',
  'incentive',
  'frikandel',
  'raw',

  'PICANHA',
  'potato',
  'VLA',
  'bosciola',
  'TRUFFLES',
  'burger',
  'PIZZA',
  'čevapi',
  'RAMEN',
  'noodles',

  'horizon',
  'dog',
  'lekker',
  'frikandel',
  'raw',
  'unhandled',
  'promise',
  'stuborn',
  'cute',
  'code',
  'drawing',
  'horse',
  'snow ',
  'poop',
  'monkey',
  'horizon',
  'dog',
  'lekker',
  'frikandel',
  'raw',
  'unhandled',
  'promise',
  'stuborn',
  'cute',
  'code',
  'drawing',
  'horse',
  'snow ',
  'poop',
  'monkey',
  'horizon',
  'dog',
  'lekker',
  'frikandel',
  'raw',
  'unhandled',
  'promise',
  'stuborn',
  'cute',
  'code',
  'drawing',
  'horse',
];
let font;

let rotationSpeeds = [
  -30, 10, -2, 7, -4, 3.5, -10, -2, 3, -4, 3.5, 10, -2, 3, -4, 3.5, 10, -2, 3,
  -4, 3.5, 10, -2, 3, -4, 3.5, 10, -2, 3, -4,
];

let capturing = false;
const capturer = new CCapture({
  format: 'png',
  framerate: 60,
});

function setup() {
  createCanvas(1080, 1350);
  // createCanvas(windowWidth, windowHeight, WEBGL);

  font = loadFont('../fonts/Poppins-Medium.ttf');

  frameRate(120);
}

function draw() {
  if (frameCount === 1) {
    capturer.start();
    capturing = true;
  }
  background(0);
  fill('#f1f1f1');
  textFont(font);

  textAlign(CENTER);

  translate(width / 2, height / 2);
  // translate(windowWidth / 4, windowHeight / 4)
  const maxI = 10;

  for (let i = 1; i <= maxI; i++) {
    push();
    const texty = quotes[i - 1];
    rotate(radians(frameCount * rotationSpeeds[i - 1] * 0.05));
    const mapfontsize = map(i, 1, maxI, 8, 90);
    const mapPushy = map(i, 1, maxI, 30, 480);
    renderCircle(texty, mapfontsize, mapPushy);
    pop();
  }

  capturer.capture(document.getElementById('defaultCanvas0'));
}

function renderCircle(texty, fontSize, pushAway, itje) {
  textSize(fontSize);
  for (let i = 0; i < 9; i++) {
    push();
    rotate(radians(i * 40));
    renderText(texty, pushAway, itje);
    pop();
  }
}

function renderText(texty, pushAway, i) {
  push();
  translate(pushAway, pushAway);
  // rotate(radians(315));
  rotate(radians(135));
  text(texty, 0, 0);
  pop();
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
