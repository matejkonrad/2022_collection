const palette = ['#7882A4', '#C0A080', '#D1D1D1', '#EFEFEF']
let tilesH = 40//random(10, 100);

function setup() {
  createCanvas(900, 900);
	frameRate(30);
}


function draw() {
	background(int(random(0, 0)));
	strokeWeight(4);

	const tilesW = random(10, 20);
	const tileW = width / tilesW;

	const tileH = height / tilesH;
	let prevY;
  for (let y = 0; y < tilesH; y++) {
		prevY = null;
    for (let x = 0; x < tilesW; x++) {
			const quarter = tilesW / 4;
			// const randy = x > quarter && x < quarter * 3 ? random(-10, 10) : 0;
			const randy = random(-10, 10)


			let px = map(x, 0, tilesW, 0, width);
			let py = prevY ? prevY : map(y, 0, tilesH, 0, width) + randy;
			const pxN = (x+1) * tileW;
			const pyN = py + randy;

			const randomIndex = random(0, 4);
			const colory = palette[int(randomIndex)];
			
			stroke(colory);

			rotate(radians(frameCount * 0.009))
			line(px, py, pxN, pyN);	
			prevY = pyN;
		}
  }
	tilesH += 0.11; 
}
