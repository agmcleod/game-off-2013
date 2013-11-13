game.PlayScreen = me.ScreenObject.extend({
  /**
   *  action to perform on state change
   */
  onResetEvent : function() {
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
  }
});
