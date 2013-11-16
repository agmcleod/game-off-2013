(function() {
  game.Player = me.ObjectEntity.extend({
    init : function(x, y, settings) {
      this.parent(x, y, { image : 'player', spritewidth : 68, spriteheight: 166 });
      this.setVelocity(15, 30);
      this.z = 2;
      this.renderable.addAnimation('idle', [0], 1);
      this.renderable.setCurrentAnimation('idle');
      me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
    },

    update : function() {
      if(me.input.isKeyPressed('jump') && !this.jumping && !this.falling) {
        this.vel.y = -this.maxVel.y * me.timer.tick;
        this.jumping = true;
      }
      if(me.input.isKeyPressed('left')) {
        this.vel.x -= this.accel.x * me.timer.tick;
      }
      if(me.input.isKeyPressed('right')) {
        this.vel.x += this.accel.x * me.timer.tick;
      }
      this.updateMovement();
      if(this.vel.x !== 0 || this.vel.y !== 0) {
        this.parent();
        return true;
      }
      else {
        return false;
      }
    }
  });
}).call(this);