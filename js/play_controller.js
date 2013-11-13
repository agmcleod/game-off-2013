game.PlayController = Object.extend({
  init : function() {
    me.entityPool.add('player', game.Player);
    me.levelDirector.loadLevel('simple');
    this.player = me.entityPool.newInstanceOf('player', 20, 300);
    me.game.world.addChild(this.player);
    this.collidable = true;
  },

  update : function() {
    this.updateMovement();
    if(this.vel.x !== 0 || this.vel.y !== 0) {
      this.parent();
      return true;
    }
    else {
      return false;
    }
  }
})