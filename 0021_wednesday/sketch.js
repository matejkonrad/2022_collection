let writers = [];
const numWriters = 100;

function Writero(_startX, _startY) {
  const position = createVector(_startX, _startY);
  const clr = random(colors);

  const numInsiders = 10;

  const getDirection = (x, y) => {
    // top left => bottom right
    if (x < width / 2 && y < height / 2) {
      return createVector(random((width / 2) * 2), random((height / 2) * 2));
    }

    // top right -> bottom left
    if (x > width / 2 && y < height / 2) {
      return createVector(random(width / 2), random((height / 2) * 2));
    }

    // bottom left => top right
    if (x < width / 2 && y > height / 2) {
      return createVector(random((width / 2) * 2), random(height / 2));
    }

    // bottom right => top left
    if (x > width / 2 && y > height / 2) {
      return createVector(random(width / 2), random(height / 2));
    }
  };

  const direction = getDirection(position.x, position.y).normalize().mult(2);
  const dirpl = false;

  const draw = () => {
    fill(clr);
    const paintDis = 1;
    for (let i = 1; i <= numInsiders; i++) {
      circle(position.x, position.y, 5);
      circle(
        position.x - i * random(-paintDis, paintDis),
        position.y - i * random(-paintDis, paintDis),
        3
      );
      circle(
        position.x + i * random(-paintDis, paintDis),
        position.y + i * random(-paintDis, paintDis),
        10
      );
    }
    position.add(direction);

    if (
      position.x >= width ||
      position.y >= height ||
      position.x < 0 ||
      position.y < 0
    ) {
      direction.mult(-1);
    }

    // console.log(position.x, position.y);
  };

  return { draw };
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < numWriters; i++) {
    writers.push(Writero(random(width), random(height)));
  }
}

function draw() {
  noStroke();
  writers.forEach((w) => w.draw());
}
