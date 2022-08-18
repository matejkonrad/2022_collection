let writers = [];
const numWriters = 55;
const seed = 0;
let grainG;

function preload() {
  GrainShader = new p5.Shader(
    this._renderer,
    `
	precision highp float;
	attribute vec3 aPosition;
	attribute vec2 aTexCoord;
	varying vec2 vUv;
	
	void main(){
		vUv=aTexCoord;
		vec4 positionVec4=vec4(aPosition,1.);
		positionVec4.xy=positionVec4.xy*2.-1.;
		gl_Position=positionVec4;
	}`,
    ` 
	precision highp float;
	varying vec2 vUv;
	uniform sampler2D tex;
	uniform float strength;
	uniform float seed;
	uniform float offset;
	
	float rand(vec2 vUv){
		float bigNum = 234554.;
		float id = vUv.x * vUv.y * bigNum;
		float r = fract(sin(id)*bigNum); // [-1,1]
		return r;
	}
	
	void main(){
		float r = rand(vUv);
		float offset = offset;
		vec3 noise3 = vec3((r+offset) * strength); // [-1.5,0.5] * strength
		vec4 color = texture2D(tex,vec2(vUv.x,1.-vUv.y));
		gl_FragColor=	color + vec4(noise3, 0.);
}`
  );
}

function grain(strength, seed, inpG, outG) {
  if (!strength) {
    strength = 0.06;
  }
  if (!seed) {
    seed = random(1, 1000);
  }
  if (!inpG) {
    inpG = get(0, 0, width, height);
  }
  grainG.randomSeed(seed);
  grainG.shader(GrainShader);
  GrainShader.setUniform('tex', inpG);
  GrainShader.setUniform('strength', strength);
  GrainShader.setUniform('offset', -0.5);
  GrainShader.setUniform('seed', random(0, 10));
  grainG.rect(-width / 2, -height / 2, width, height);

  if (!outG) {
    image(grainG, 0, 0, width, height);
  } else {
    outG.image(grainG, 0, 0, outG.width, outG.height);
  }
}

function Writero(_startX, _startY) {
  const position = createVector(_startX, _startY);
  const clr = random(colors);
  const numInsiders = 2;

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

  const direction = getDirection(position.x, position.y)
    .sub(position)
    .normalize()
    .mult(3);

  const draw = () => {
    fill(clr);
    const paintDis = random(5, 8);
    for (let i = 1; i <= numInsiders; i++) {
      circle(position.x, position.y, 5);
      circle(
        position.x - i * paintDis, //random(-paintDis, paintDis),
        position.y - i * paintDis, //random(-paintDis, paintDis),
        3
      );
      circle(
        position.x + i * paintDis, //random(-paintDis, paintDis),
        position.y + i * paintDis, //random(-paintDis, paintDis),
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
  };

  return { draw };
}

let borderColor;
let borderDividedBy = 15;

function drawBorder() {
  fill(borderColor);
  rect(0, 0, width, height / borderDividedBy);
  rect(
    0,
    (height / borderDividedBy) * (borderDividedBy - 1),
    width,
    height / borderDividedBy
  );

  rect(0, 0, width / borderDividedBy, height);

  rect(
    (width / borderDividedBy) * (borderDividedBy - 1),
    0,
    width / borderDividedBy,
    height
  );
}

function setup() {
  createCanvas(windowHeight, windowHeight);
  borderColor = color(0);
  grainG = createGraphics(width, height, WEBGL);

  for (let i = 0; i < numWriters; i++) {
    writers.push(Writero(random(width), random(height)));
  }

  background(0);
}

function draw() {
  noStroke();
  writers.forEach((w) => w.draw());
}
