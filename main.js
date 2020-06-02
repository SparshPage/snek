var cvs = document.getElementById("snek");
var ctx = cvs.getContext("2d");

let snekwidth = 20;
let snekHeight = 20;
var initialLen = 4;
let T = 20;
const snek = {
  x: cvs.width / 2 - snekwidth,
  y: cvs.height / 2,
  dx: 0,
  dy: 0,
};

var sbody = [
  { x: snek.x, y: snek.y },
  { x: snek.x + snekwidth, y: snek.y },
];

function drawSnek() {
  for (let i = 0; i < sbody.length; i++) {
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.fillRect(sbody[i].x, sbody[i].y, snekwidth, snekHeight);
  }
}

var food = {
  x: 20,
  y: 20,
};

function placefood() {
  ctx.beginPath();
  ctx.fillStyle = "red";
  ctx.fillRect(food.x * snekwidth, food.y * snekHeight, snekwidth, snekHeight);
}

function keydown(e) {
  switch (e.keyCode) {
    case 37:
      snek.dx = -1;
      snek.dy = 0;

      break;

    case 38:
      snek.dy = -1;
      snek.dx = 0;
      break;
    case 39:
      snek.dx = 1;
      snek.dy = 0;
      break;
    case 40:
      snek.dy = 1;
      snek.dx = 0;
      break;
  }
}
document.addEventListener("keydown", keydown);

function eatFood() {
  let head = sbody[0];

  if (head.x == food.x * snekwidth && head.y == food.y * snekwidth) {
    console.log("food eaten");
    food = {
      x: Math.floor(Math.random() * 20 + 2),
      y: Math.floor(Math.random() * 20 + 2),
    };
    console.log(food.x * snekwidth, food.y * snekwidth);
    sbody.push({ ...sbody });

    console.log(sbody.length);
  }
}

function die() {
  for (let i = 1; i < sbody.length; i++) {
    if (
      sbody[i].x == sbody[0].x &&
      sbody[i].y == sbody[0].y &&
      sbody.length > 3
    ) {
      console.log("dead");
      alert("Game Over");
      location.reload();
      break;
    }
  }
}

function bind() {
  head = sbody[0];
  if (head.x < 0) {
    head.x = cvs.width;
  }
  if (head.x > cvs.width) {
    head.x = 0;
  }
  if (head.y > cvs.height) {
    head.y = 0;
  }
  if (head.y < 0) {
    head.y = cvs.height;
  }
}

function update() {
  sbody.pop();
  sbody.unshift({
    x: sbody[0].x + snek.dx * snekwidth,
    y: sbody[0].y + snek.dy * snekHeight,
  });
  eatFood();
  die();
}

function draw() {
  ctx.clearRect(0, 0, cvs.width, cvs.height);
  drawSnek();
  placefood();
}

function loop() {
  draw();
  bind();
  update();
  setTimeout(loop, 1000 / 10);
}

loop();
