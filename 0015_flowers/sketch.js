const borderWidth = 50;
const borderHeight = 50;
const pallete = ['#134611', '#3e8914', '#3da35d', '#96e072', '#e8fccf'];

function padding() {
  push();
  fill('#f1f1f1');
  noStroke();
  translate(0, 0);
  rect(0, 0, width, borderWidth);
  rect(width - borderWidth, 0, borderWidth, height);
  rect(0, 0, borderWidth, height);
  rect(0, height - borderWidth, width, borderWidth);
  pop();
}

function core(x, y, w, h) {
  ellipse(x, y, w, h);
}

function Leaf(x, y) {
  const w = 50;
  const h = 100;
  const bottom = createVector(0, w);
  const right = createVector(w, 0);
  const left = createVector(-w, 0);
  const top = createVector(0, -h);

  const noisey = () => {
    return noise(x + frameCount * 0.001, y + frameCount * 0.001);
  };

  const dance = () => {
    // rotate(radians(map(noisey(), 0, 1, 0, 360)));
    const colly = floor(map(noisey(), 0, 1, 0, 4));
    fill(pallete[colly]);
    // rotate(radians(10));
  };

  const vein = () => {};

  const display = () => {
    push();
    translate(x, y);
    const middleVector = createVector(width / 2, height / 2);
    const veccy = createVector(x, y);
    veccy.sub(middleVector);
    middleVector.add(veccy);
    rotate(middleVector.heading());

    dance();
    const skinnyRight = createVector(right.x - 15, right.y - 50);
    const skinnyLeft = createVector(left.x + 15, left.y - 20);

    // stroke('#f1f1f1');
    // noStroke()
    beginShape();
    // lead
    curveVertex(bottom.x, bottom.y);

    // bottom
    curveVertex(bottom.x, bottom.y);
    // right
    curveVertex(right.x, right.y);
    curveVertex(skinnyRight.x, skinnyRight.y);
    // top
    curveVertex(top.x, top.y);
    //left
    curveVertex(skinnyLeft.x, skinnyRight.y);
    curveVertex(left.x, left.y);
    // bottom
    curveVertex(bottom.x, bottom.y);

    //lead
    curveVertex(bottom.x, bottom.y);
    endShape();
    pop();
  };

  return { display, dance };
}

const leafsX = 5;
const leafsY = leafsX;
const leafies = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  // put setup code here
  for (let y = 0; y < leafsY; y++) {
    for (let x = 0; x < leafsX; x++) {
      // const mapX = map(x, 0, leafsX, 0, width);
      // const mapY = map(y, 0, leafsY, 0, height);
      const mapX = width / 2;
      leafies.push(Leaf(mapX, mapY));
    }
  }
}

function draw() {
  background(0);

  // core(width / 2, height / 2, 10, 10);

  // leaf.display();
  leafies.forEach((l) => {
    push();
    l.display();
    pop();
  });
  // leaf = Leaf(width / 2, height / 2);
  // push();
  // leaf.dance();
  // leaf.display();
  // pop();

  padding();
}
