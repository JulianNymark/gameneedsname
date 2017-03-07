function renderEntities(list) {
  for(var i=0; i<list.length; i++) {
    renderEntity(list[i]);
  }
}

function renderEntity(entity) {
  ctx.save();
  ctx.translate(entity.pos[0], entity.pos[1]);
  entity.sprite.render(ctx);
  ctx.restore();
}

function getMousePos(withinThing, evt) {
  var rect = withinThing.getBoundingClientRect();

  var x;
  var y;

  if (evt.type == 'touchmove') {
    x = evt.touches[0].pageX;
    y = evt.touches[0].pageY;
  }
  else if (evt.type == 'mousemove') {
    x = evt.clientX;
    y = evt.clientY;
  }

  return {
    x: x - rect.left,
    y: y - rect.top
  };
}

function addInputEventListeners(thing) {
  // mouse
  thing.addEventListener('mousemove', function(evt) {
    var mousePos = getMousePos(thing, evt);
    brush.pos = [mousePos.x, mousePos.y];
    strokeMove();
  });
  thing.addEventListener('mousedown', function(evt) {
    var mousePos = getMousePos(thing, evt);
    brush.pos = [mousePos.x, mousePos.y];
    strokeStart();
  });
  thing.addEventListener('mouseup', function(evt) {
    var mousePos = getMousePos(thing, evt);
    brush.pos = [mousePos.x, mousePos.y];
    strokeStop();
  });

  // mobile
  thing.addEventListener('touchmove', function(evt) {
    var mousePos = getMousePos(thing, evt);
    brush.pos = [mousePos.x, mousePos.y];
    evt.preventDefault();
    strokeMove();
  });
  thing.addEventListener('touchstart', function(evt) {
    var mousePos = getMousePos(thing, evt);
    brush.pos = [mousePos.x, mousePos.y];
    evt.preventDefault();
    strokeStart();
  });
  thing.addEventListener('touchend', function(evt) {
    var mousePos = getMousePos(thing, evt);
    brush.pos = [mousePos.x, mousePos.y];
    evt.preventDefault();
    strokeStop();
  });
}

function strokeStart() {
  brush.active = true;
  lineStart = brush.pos;
  lineStop = lineStart;
}

function strokeMove() {
  ctx.lineWidth = 5;
  ctx.strokeStyle = '#000000';
  ctx.lineJoin = 'round';

  lineStop = brush.pos;

  ctx.beginPath();
  ctx.moveTo(...lineStart);
  ctx.lineTo(...lineStop);
  ctx.closePath();
  ctx.stroke();

  lineStart = lineStop;
}

function strokeStop() {
  brush.active = false;
}
