//'use strict';
//describe('SetToGameState', () => {
//  beforeEach(module('FullstackGeneratedApp'));
//
//  let SetToGameState;
//  beforeEach('get setToGameState', inject(_SetToGameState_ => {
//    SetToGameState = _SetToGameState_;
//  }));
//
//  it ('should apply a func on top', () => {
//    function myFoo(a, b, c) {
//      return {
//        foo : 'testing',
//        bar : 'testing more',
//        baz : [a, b, c]
//      }
//    };
//    let o = SetToGameState(myFoo);
//    let result = o(1, 2, 3);
//    let myArray = [1,2,3];
//    let allValues = result.baz.map(function(elem, index) {
//      if (myArray[index] === elem){
//        return true;
//      }
//    })
//    .every(function(elem) {
//      return elem === true;
//    })
//    expect(allValues).to.be.true;
//  });
//});
