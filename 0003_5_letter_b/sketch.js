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
  background(0);

  let tilesX = 5;
  let tilesY = tilesX;
  let tileW = width / tilesX;
  let tileH = height / tilesY;

  pg.push();
  pg.textFont(font);
  pg.translate(width / 2, height / 2 - 150);
  pg.textSize(1000);
  pg.fill('#f1f1f1');
  pg.textAlign(CENTER, CENTER);
  pg.text('b', 0, 0);
  pg.pop();

  for (let y = 0; y < tilesY; y++) {
    for (let x = 0; x < tilesX; x++) {
      // const wave = map(sin(radians(frameCount + y * x * 200)), -1, 1, 0, 50);
      const wave = map(tan(radians(frameCount + (y * x * 10))), 1, -1, 0, 100);

      // // source
      // const sx = x * tileW + parseInt(wave);

      const sx = x * tileW + parseInt(wave) - 50;
      const sy = y * tileH;
      const sw = tileW;
      const sh = tileH;

      // // dest
      const dx = x * tileW;
      const dy = y * tileH;
      const dw = tileW;
      const dh = tileH;

      copy(pg, sx, sy, sw, sh, dx, dy, dw, dh);
    }
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
