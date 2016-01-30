app.factory('SetToGameState', function(GameFactory) {
  return function(func) {
    return function(...args) {
      var updatedState = func(...args);
      GameFactory.setState();
      return updatedState;
    }
  }
});
