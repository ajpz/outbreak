app.factory('SetToGameState', function(GameFactory) {
  return function(func) {
    return function(...args) {
      var updatedState = func(...args);
      // seems hard to test if this method also calls the setState
      // from what I see here, it's assuming that the updatedState
      // is a either modifying the GameFactory.gameState obj or it returns an object for updating
      // GameFactory.saveToFirebase(updatedState);
      return updatedState;
    }
  }
});




// app.factory('SetToGameState', function(GameFactory) {
//   return function(func) {
//     return function(...args) {
//       var updatedState = func(...args);
//       // seems hard to test if this method also calls the setState
//       // from what I see here, it's assuming that the updatedState
//       // is a either modifying the GameFactory.gameState obj or it returns an object for updating
//       return GameFactory.saveToFirebase(updatedState);
//     }
//   }
// });
