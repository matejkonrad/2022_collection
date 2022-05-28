// R E A K T O R
const chars = [" ","░","▒","╣","▓","█"]; //
// const chars = [" ","░","▒","╣","▓","█"]; //

let camera;
const sampleSize = 2;
const camWidth = 400;
const camHeight = 225;
const maxColor = 765;// 255*3
let proportion = camWidth / camHeight;
let scaleToCam;


const palletes = {
  high_neon: ['#0c0f0a', '#ff206e', '#fbff12', '#41ead4', '#ffffff'],
  calmy_autumn: ['#d4e09b', '#f6f4d2', '#cbdfbd', '#f19c79', '#a44a3f'],
  under_water: ['#0b132b', '#1c2541', '#3a506b', '#5bc0be', '#6fffe9'],
  darky_silvy: ['#090c08', '#474056', '#757083', '#8a95a5', '#b9c6ae'],
  brighty_wighty: ['#390099', '#9e0059', '#ff0054', '#ff5400', '#ffbd00'],
};

const currentPallete = palletes.high_neon;
const getColor = (noiseVal) => {
  // console.log(noiseVal);
  if (noiseVal > 0.8 && noiseVal >= 0.8) {
    return color(currentPallete[4]);
  }

  if (noiseVal < 0.6 && noiseVal >= 0.6) {
    return color(currentPallete[3]);
  }

  if (noiseVal < 0.6 && noiseVal > 0.4) {
    return color(currentPallete[2]);
  }
  if (noiseVal < 0.4 && noiseVal > 0.2) {
    return color(currentPallete[1]);
  }

  return color(currentPallete[0]);
};

function setup() {
	if (windowHeight < windowWidth) {
		createCanvas(round(windowHeight * proportion), windowHeight);
		scaleToCam = width/camWidth;
	} else {
		createCanvas(windowWidth, round(windowHeight / proportion));
		scaleToCam = height/camHeight;
	}
	
	textAlign(CENTER, CENTER);
	textSize(sampleSize);
	textFont("monotype");
	
	camera = createCapture(VIDEO);
	camera.size(camWidth, camHeight);
	camera.hide();
  
    colorMode(HSB, 255);
}

function draw() {
	camera.loadPixels();
	background(255, 10);
	fill(0);
	scale(scaleToCam);
	let xoff = 0;

	for (let y = 0; y < camHeight; y += sampleSize) {
		let yoff = 0;
		for (let x = 0; x < camWidth; x += sampleSize) {
			const i = ((y * camWidth) + x) * 4;
			const r = camera.pixels[i];
			const g = camera.pixels[i + 1];
			const b = camera.pixels[i + 2];
			const brighty = brightness(color(r,g,b));

			const mappy = floor(map(brighty, 0, 100, 5, 0));
			const charry = chars[mappy];
			const noisey = noise(xoff, yoff);
			fill(getColor(noisey), 10);
			text(charry, x, y);
			yoff += 0.1
		}
		xoff+= 0.1
	}
}