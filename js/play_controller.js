game.PlayController = Object.extend({
  init : function() {
    me.entityPool.add('player', game.Player);
    me.levelDirector.loadLevel('simple');
    this.player = me.game.world.getEntityByName('player')[0];
    me.game.currentLevel.getLayerByName('Parallax_level1').repeat = 'no-repeat';
    this.collidable = true;
  },

  update : function() {

  }
})