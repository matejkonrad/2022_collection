let colory = 0;

function Boxy(_location, _velocity) {
  let acceleration;
  let velocity = _velocity;
  let location = _location;
  let colory = 0;
  let locationTo = createVector(random(width), random (height));

  const changeDirection = () => {
  	locationTo = createVector(random(0, width / 2), random(0, height / 2));
  };

  const move = () => {
    let direction = p5.Vector.sub(locationTo, location);
    let directionMag = direction.mag();
    if (frameCount % 100 === 0) {
      changeDirection();
    }
    direction.normalize();

    acceleration = direction;

    console.log(directionMag);
    acceleration.mult(directionMag);

    acceleration.mult(0.00011);

    velocity.add(acceleration);
    velocity.limit(30);
    location.add(velocity);
  };

  const draw = () => {
    // noStroke();
  stroke(colory, 50, 90);
    noFill();
    // fill(colory, 100, 100);
    ellipse(location.x, location.y, width / 6, height / 6);

    if (colory > 200) {
      colory = 0;
      return;
    }
    colory += 0.1;
  };

  return { draw, move };
}

let boxy;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // put setup code here
  boxy = Boxy(createVector(random(width), random(height)), createVector(0, 0));

	background(0)
  colorMode(HSB);
}
function draw() {
  ellipseMode(CENTER);
  // background(0, 0.01);

  boxy.draw();
  boxy.move();
}
