function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  // put setup code here
  frameRate(60);
  background(0);
}

function draw() {

  translate(-width / 2, -height / 2);
  background(0);

  console.log({ frameCount });
  noFill();
  stroke('#f1f1f1');

  push();
  translate(width / 2, height / 2);
  rotateX(radians(frameCount));
  rotateY(radians(frameCount));
  box(width / 4);
  push();
}
