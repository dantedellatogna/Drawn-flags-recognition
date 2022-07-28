var canvas = document.getElementById("myCanvas")
var ctx = canvas.getContext('2d')
var raf;
var rect = canvas.getBoundingClientRect();
var running = false;

var clearButton = document.getElementById("clearButton");
clearButton.addEventListener("click", clear())


var cursor = {
  x: 100,
  y: 100,
  vx: 0,
  vy: 0,
  radius: 5,
  color: 'black',
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  }
};

clear();

function clear() {
  ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.fillRect(0,0,canvas.width,canvas.height);
}

function draw() {
  //clear();
  cursor.draw();
  /*cursor.x += cursor.vx;
  cursor.y += cursor.vy;

  if (cursor.y + cursor.vy > canvas.height || cursor.y + cursor.vy < 0) {
    cursor.vy = -cursor.vy;
  }
  if (cursor.x + cursor.vx > canvas.width || cursor.x + cursor.vx < 0) {
    cursor.vx = -cursor.vx;
  }*/

  raf = window.requestAnimationFrame(draw);
}

canvas.addEventListener('mousemove', function(e) {
  if (!running) {
    //clear();
    cursor.x = e.clientX - rect.left;
    cursor.y = e.clientY - rect.top;
    cursor.draw();
  }
});

/*canvas.addEventListener('click', function(e) {
  if (!running) {
    raf = window.requestAnimationFrame(draw);
    running = true;
  }
});*/

canvas.addEventListener('mousedown', function(e) {
    if (!running) {
      raf = window.requestAnimationFrame(draw);
      running = true;
    }
  });

canvas.addEventListener('mouseout', function(e) {
  window.cancelAnimationFrame(raf);
  running = false;
});

cursor.draw();

//-----------------------------
let screenLog = document.querySelector('#screen-log');
document.addEventListener('mousemove', logKey);

function logKey(e) {
  screenLog.innerText = `
    Screen X/Y: ${e.screenX}, ${e.screenY}
    Client X/Y: ${e.clientX}, ${e.clientY}
    Screen X/Y: ${cursor.x}, ${cursor.y}`;
}
