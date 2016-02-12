app.directive('niceSelector', function ($parse) {

  return {
    restrict: 'E',
    template: `
      <div>
        <div class="selection-bar" ng-click="toggleList()">{{ formatOption(currentlySelectedOption) || selectText }}</div>
        <ul class="selection-list" ng-show="showList">
          <li ng-repeat="option in options track by $index" ng-click="setOption(option)">
            {{ formatOption(option) }}
          </li>
        </ul>
      </div>
    `,
    scope: {
      options: '=',
      onChange: '&'
    },
    require: 'ngModel',
    link: function (scope, element, attrs, ngModelCtrl) {

      const displayFormat = $parse(attrs.display);

      scope.showList = false;
      scope.selectText = attrs.selectText;

      scope.toggleList = () => scope.showList = !scope.showList;

      scope.formatOption = option => displayFormat({ option });

      scope.setOption = option => {
        scope.currentlySelectedOption = option;
        ngModelCtrl.$setViewValue(option);
        scope.onChange();
        scope.showList = false;
      };

      ngModelCtrl.$render = function () {
          scope.currentlySelectedOption = ngModelCtrl.$viewValue;
      };

    }
  };

});
