game.PlayScreen = me.ScreenObject.extend({
  /**
   *  action to perform on state change
   */
  onResetEvent: function() {
    // add our HUD to the game world
    game.HUD = new game.HUD.Container();
    me.game.world.addChild(HUD);
    game.playController = new game.PlayController();
    me.game.world.addChild(game.playController);
  },


  /**
   *  action to perform when leaving this screen (state change)
   */
  onDestroyEvent: function() {
    // remove the HUD from the game world
    me.game.world.removeChild(HUD);
  }
});
