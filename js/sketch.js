// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/145-2d-ray-casting.html
// https://youtu.be/TOEi6T2mtHo

// 2D Ray Casting
// https://editor.p5js.org/codingtrain/sketches/Nqsq3DFv-

let walls = [];
let ray;
let particle;
let xoff = 0;
let yoff = 10000;

//ccapture
// const T = 1;
// const NUM_FRAMES = 200;
// var capture = false; // default is to not capture frames, can be changed with button in browser
var capturer = new CCapture({
  format:'webm', 
  framerate: 60
});

function setup() {
  createCanvas(1920, 1080);
  colorMode(HSB, 360, 100, 100, 100);
  for (let i = 0; i < 10; i++) {
    let x1 = random(width);
    let x2 = random(width);
    let y1 = random(height);
    let y2 = random(height);
    walls[i] = new Boundary(x1, y1, x2, y2);
  }
  walls.push(new Boundary(0, 0, width, 0));
  walls.push(new Boundary(width, 0, width, height));
  walls.push(new Boundary(width, height, 0, height));
  walls.push(new Boundary(0, height, 0, 0));
  particle = new Particle();
}

function draw() {
  if (frameCount==1) capturer.start(); // start the animation capture
  background(255);
  for (let wall of walls) {
    wall.show();
  }
  particle.update(noise(xoff) * width, noise(yoff) * height);
  particle.show();
  particle.look(walls);

  xoff += 0.01;
  yoff += 0.01;
  
capturer.capture(document.getElementById('defaultCanvas0')); 
  if (frameCount==1200){
    save_record();
  }
}

function save_record() {
  capturer.save();
}
