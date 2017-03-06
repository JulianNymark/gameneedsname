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
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}
