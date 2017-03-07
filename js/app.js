// A cross-browser requestAnimationFrame
// See https://hacks.mozilla.org/2011/08/animating-with-javascript-from-setinterval-to-requestanimationframe/
var requestAnimFrame = (function(){
  return window.requestAnimationFrame       ||
         window.webkitRequestAnimationFrame ||
         window.mozRequestAnimationFrame    ||
         window.oRequestAnimationFrame      ||
         window.msRequestAnimationFrame     ||
         function(callback){
           window.setTimeout(callback, 1000 / 60);
         };
})();

// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// 'input catcher' div (invisible & sits on top of canvas)
var inputCatcher = document.createElement("div");
inputCatcher.setAttribute("style","width:512px; height:480px;");
inputCatcher.setAttribute("class","input-catcher");
document.body.appendChild(inputCatcher);

addInputEventListeners(inputCatcher);

// the brush 'entity' :::DDD
var brush = {
  pos: [0, 0],
  sprite: new Sprite('img/brush.png', [0, 0], [10, 10], 0, [0]),
  active: false
};

// The main game loop
var lastTime;
function main() {
  var now = Date.now();
  var dt = (now - lastTime) / 1000.0;

  update(dt);
  render();

  lastTime = now;
  requestAnimFrame(main);
};

function init() {
  reset();
  lastTime = Date.now();
  main();
}

resources.load([
  'img/brush.png'
]);
resources.onReady(init);

var gameTime = 0;

// Update game objects
function update(dt) {
  gameTime += dt;
  brush.sprite.update(dt);
};

// Draw everything
function render() {
  if (brush.active) {
    //renderEntity(brush);
  }
};

function reset() {
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
