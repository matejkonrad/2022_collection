
let capturing = false;
const capturer = new CCapture({
    format: 'png',
    framerate: 60
	});

let font;

function setup() {
	// createCanvas(900, 900, WEBGL);
	
  createCanvas(1080, 1350, WEBGL);
	font = loadFont("../fonts/Poppins-Medium.ttf");

	frameRate(60);

}

function draw() {
	if (frameCount === 1) {
			capturer.start();
			capturing = true;
	}
  background(0);  
	textFont(font);
	textSize(80);
	fill("#f1f1f1");
	
	translate(0, 0);

	blendMode(DIFFERENCE)
	for(let i = 0; i < 20; i++) {
		rotate(radians((frameCount + i)* 0.1));
		text("fried chicken", 50, 100)
	}

  capturer.capture(document.getElementById('defaultCanvas0'));
}

function keyPressed() {
	if (keyCode === ENTER){ 
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
