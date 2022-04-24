let capturing = false;
const capturer = new CCapture({
  format: 'png',
  framerate: 60,
});

let pg;
let font;
function setup() {
  createCanvas(900, 900);
  pg = createGraphics(width, height);
  font = loadFont('../fonts/RobotoMono-VariableFont_wght.ttf');
  frameRate(60);
}

function draw() {
  // if (frameCount === 1) {
  //   capturer.start();
  //   capturing = true;
  // }
  background(0);

  for (let y = 1; y <= 10; y++) {
    const wave = map(tan(radians((frameCount + (y * 80)) * 0.5 )), -1, 1, 0, 500);

    push();
    textFont(font);
    strokeWeight(5)
    stroke("#ffffff")
    translate(0, 200)
    translate( 300 + wave, wave );
    textSize(300);
    fill(0);
    textAlign(CENTER, CENTER);
    text('STOP', 0, 0);
    textSize(100)
    text('scrolling', 0, 200)
    pop();
  }

  fill("#ff0000");



  capturer.capture(document.getElementById('defaultCanvas0'));
}

function keypressed() {
  if (keycode === enter) {
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
