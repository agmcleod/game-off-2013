(function() {
  game.Player = me.ObjectEntity.extend({
    init : function(x, y, settings) {
      this.initForms();
      this.parent(x, y, settings);
      this.z = 2;
      this.currentForm = 'attack';
      for(var object in this.forms) {
        if(this.forms.hasOwnProperty(object)) {
          var form = this.forms[object];
          for(var anim in form.anims) {
            if(form.anims.hasOwnProperty(anim)) {
              var anim = form.anims[anim];
              form.renderable.addAnimation(anim.name, anim.frames, anim.speed);
            }
          }
        }
      }
      this.forms[this.currentForm].execute.call(this);
      this.renderable = this.forms[this.currentForm].renderable;
      this.renderable.setCurrentAnimation('idle');
      this.alwaysUpdate = true;
      this.attacking = false;
      me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
    },

    attack : function() {
      this.attacking = true;
      this.renderable.setCurrentAnimation('attack', (function() {
        this.attacking = false;
        this.renderable.setCurrentAnimation('idle');
      }).bind(this));
    },

    initForms : function() {
      this.forms = {
        attack : {
          execute : function() {
            this.anchorPoint.x = 0.33;
            this.setVelocity(15, 28);
            this.updateColRect(0, 64, 0, 128);
          },
          anims : [
            {
              name : 'attack',
              frames : [0,1,1,1,1,1,1],
              speed : 10
            }, {
              name : 'idle',
              frames : [0],
              speed : 1,
            }
          ],
          renderable : new me.AnimationSheet(0, 0, me.loader.getImage('combatplayer'), 96, 128)
        },
        mobile : {
          execute : function() {
            this.anchorPoint.x = 0.5;
            this.setVelocity(25, 28);
            this.updateColRect(0, 64, 0, 96);
          },
          anims : [
            {
              name : 'idle',
              frames : [0],
              speed : 1
            }
          ],
          renderable : new me.AnimationSheet(0, 0, me.loader.getImage('mobileplayer'), 64, 96)
        }
      };
    },

    resetRenderable : function() {
      var lastHeight = this.renderable.height;
      var renderable = this.forms[this.currentForm].renderable;
      this.pos.y += (lastHeight - renderable.height);
      this.renderable = renderable;
      this.renderable.setCurrentAnimation('idle');
      this.width = this.renderable.width;
      this.height = this.renderable.height;
      this.forms[this.currentForm].execute.call(this);
    },

    update : function(time) {
      var changed = false;
      if(me.input.isKeyPressed('tab') && !this.attacking) {
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
      if(me.input.isKeyPressed('attack') && this.currentForm == 'attack') {
        this.attack();
      }
      if(me.input.isKeyPressed('jump') && !this.jumping && !this.falling) {
        this.vel.y = -this.maxVel.y * me.timer.tick;
        this.jumping = true;
      }
      if(me.input.isKeyPressed('left')) {
        this.vel.x -= this.accel.x * me.timer.tick;
        this.flipX(true);
      }
      else if(me.input.isKeyPressed('right')) {
        this.vel.x += this.accel.x * me.timer.tick;
        this.flipX(false);
      }
      else {
        this.vel.x = 0;
      }
      this.updateMovement();
      if(this.vel.x !== 0 || this.vel.y !== 0 || changed || this.attacking) {
        this.parent(time);
        return true;
      }
      else {
        return false;
      }
    }
  });
}).call(this);