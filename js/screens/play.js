game.PlayScreen = me.ScreenObject.extend({
  /**
   *  action to perform on state change
   */
  onResetEvent : function() {
    me.input.bindKey(me.input.KEY.SPACE, 'jump');
    me.input.bindKey(me.input.KEY.A, 'left');
    me.input.bindKey(me.input.KEY.D, 'right');
    game.HUDInstance = new game.HUD.Container();
    game.playController = new game.PlayController();
    me.game.world.addChild(game.HUDInstance);
    me.game.world.addChild(game.playController);
  },


  /**
   *  action to perform when leaving this screen (state change)
   */
  onDestroyEvent : function() {
    // remove the HUD from the game world
    me.game.world.removeChild(game.HUDInstance);
    me.input.unbindKey(me.input.KEY.SPACE);
    me.input.unbindKey(me.input.KEY.A);
    me.input.unbindKey(me.input.KEY.D);
  }
});
