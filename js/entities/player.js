(function() {
  game.Player = me.ObjectEntity.extend({
    init : function(x, y, settings) {
      this.parent(x, y, settings);
      this.setVelocity(15, 20);
    }
  });
}).call(this);