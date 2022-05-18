p5.disableFriendlyErrors = true; // disables FES

let rows = 300;
let columns = 300;
const palletes = {
  high_neon: ['#0c0f0a', '#ff206e', '#fbff12', '#41ead4', '#ffffff'],
  calmy_autumn: ['#d4e09b', '#f6f4d2', '#cbdfbd', '#f19c79', '#a44a3f'],
  under_water: ['#0b132b', '#1c2541', '#3a506b', '#5bc0be', '#6fffe9'],
  darky_silvy: ['#090c08', '#474056', '#757083', '#8a95a5', '#b9c6ae'],
  brighty_wighty: ['#390099', '#9e0059', '#ff0054', '#ff5400', '#ffbd00'],
};

const currentPallete = palletes.calmy_autumn;

function setup() {
  createCanvas(900, 900);
  // put setup code here
  rows = height;
  columns = width;
}

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

function draw() {
  background(50);
  noLoop();

  // const wavey = map(sin(radians(frameCount)), -1, 1, -0.5, 0.5);
  const wavey = frameCount * 0.001;
  noiseDetail(1);

  let yoff = 0;
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < columns; x++) {
      const mapX = map(x, 0, rows, 0, height);
      const mapY = map(y, 0, columns, 0, width);

      const noisey = noise(xoff + wavey, yoff + wavey);
      // console.log(noisey);
      const c = getColor(noisey);
      // console.log({ c });
      fill(c);
      // strokeWeight(0.25);
      stroke(c);
      // stroke('red');
      // fill('red')
      // if (x % 2 === 0 || y % 3 === 0) {
      point(mapX, mapY);
      // }
      xoff += 0.005;
    }
    yoff += 0.005;
  }
}
