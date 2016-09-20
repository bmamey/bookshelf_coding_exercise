angular.module('app.bookshelf', ['ui.bootstrap'])
  .controller('BookshelfController', [
      '$scope', '$http',
      function ($scope, $http) {
        $scope.loading = true;
        $http({
          method: 'GET',
          url: '/books.json'
        }).then(function(response) {
          $scope.loading = false;
          $scope.books = response.data;

          $scope.totalItems = $scope.books.length;
          $scope.currentPage = 1;
          $scope.itemsPerPage = 5;

          $scope.numPages = function () {
            return Math.ceil($scope.totalItems / $scope.itemsPerPage);
          };

          $scope.$watch('currentPage + itemsPerPage', function() {
            var begin = (($scope.currentPage - 1) * $scope.itemsPerPage),
                end = begin + $scope.itemsPerPage;
            $scope.filteredBooks = $scope.books.slice(begin, end);
          });
        })
      }
    ]
  );