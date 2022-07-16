// function Circle(_angle) {
//   let angle = _angle;
//   const r = 300;

//   const increment = () => {
//     angle += 1;
//   };
//   const draw = () => {
//     const x = r * cos(angle);
//     const y = r * sin(angle);
//     console.log(x, y);
//     ellipse(x, y, 10, 10);
//   };

//   return { draw, increment };
// }

// let circ = [];

const gridSize = 7;

function Boxy(_x, _y, _gridX, _gridY, _index) {
  let gridX = _gridX;
  let gridY = _gridY;
  let x = _x;
  let y = _y;
  let index = _index;
	const indexLength = Math.floor(gridSize / 2)

  const draw = () => {
    push();
    translate(x, y);
    text(`${index} (${gridX - indexLength}, ${gridY - indexLength})`, 12, 30);
    rect(0, 0, width / gridSize, height / gridSize);
    pop();
  };

  return { draw };
}
let boxes = [];

function setup() {
  createCanvas(600, 600);

  let idx = 0;
  for (let y = 0; y <= gridSize; y++) {
    for (let x = 0; x <= gridSize; x++) {
      const mapX = map(x, 0, gridSize, 0, width);
      const mapY = map(y, 0, gridSize, 0, height);
      boxes.push(Boxy(mapX, mapY, x, y, idx));
      idx++;
    }
  }
}

function draw() {
  background(0);
  noLoop();
  stroke('#f1f1f1');
  noFill();

  boxes.forEach((box) => box.draw());
}
