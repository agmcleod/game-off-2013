(function() {
  game.Player = me.ObjectEntity.extend({
    init : function(x, y, settings) {
      this.parent(x, y, { image : 'player' });
      this.setVelocity(15, 20);
      this.z = 2;
    },

    update : function() {

    }
  });
}).call(this);