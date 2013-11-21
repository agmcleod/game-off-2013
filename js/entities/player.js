(function() {
  game.Player = me.ObjectEntity.extend({
    init : function(x, y, settings) {
      this.forms = {
        attack : {
          renderable : new me.AnimationSheet(0, 0, me.loader.getImage('player'), 68, 166)
        },
        mobile : {
          renderable : new me.AnimationSheet(0, 0, me.loader.getImage('mobileplayer'), 64, 96)
        }
      };
      this.parent(x, y, settings);
      this.setVelocity(15, 25);
      this.z = 2;
      this.currentForm = 'attack';
      for(var object in this.forms) {
        if(this.forms.hasOwnProperty(object)) {
          var form = this.forms[object];
          form.renderable.addAnimation('idle', [0], 1);
          form.renderable.setCurrentAnimation('idle');
        }
      }
      this.renderable = this.forms[this.currentForm].renderable;
      this.alwaysUpdate = true;
      me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
    },

    resetRenderable : function() {
      var lastHeight = this.renderable.height;
      var renderable = this.forms[this.currentForm].renderable;
      //this.pos.y -= (lastHeight - renderable.height);
      this.renderable = renderable;
      this.width = this.renderable.width;
      this.height = this.renderable.height;
      this.updateColRect(0, this.renderable.width, 0, this.renderable.height);
    },

    update : function() {
      var changed = false;
      if(me.input.isKeyPressed('tab')) {
        switch(this.currentForm) {
          case 'attack':
            this.currentForm = 'mobile';
            break;
          case 'mobile':
            this.currentForm = 'attack';
            break;
        }
        changed = true;
        this.resetRenderable();
      }
      if(me.input.isKeyPressed('jump') && !this.jumping && !this.falling) {
        this.vel.y = -this.maxVel.y * me.timer.tick;
        this.jumping = true;
      }
      if(me.input.isKeyPressed('left')) {
        this.vel.x -= this.accel.x * me.timer.tick;
      }
      else if(me.input.isKeyPressed('right')) {
        this.vel.x += this.accel.x * me.timer.tick;
      }
      else {
        this.vel.x = 0;
      }
      this.updateMovement();
      if(this.vel.x !== 0 || this.vel.y !== 0 || changed) {
        this.parent();
        return true;
      }
      else {
        return false;
      }
    }
  });
}).call(this);