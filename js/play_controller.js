game.PlayController = Object.extend({
  init : function() {
    me.entityPool.add('player', game.Player);
    me.levelDirector.loadLevel('simple');
    me.game.currentLevel.getLayerByName('Parallax_level1').repeat = 'no-repeat';
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