/*
For some reasons my js and scss files are not being compiled when
they're placed in the js or css directories. I put my css in the
application css file and I am just going to leave the js file like
this since new files are not being picked up. I could use a task runner
like gulp or grunt, but that might be too much for this demo work

I know I could break this controller up and create a Factory/Service
a module and a component.


 */

angular.module('app.bookshelf', ['ui.bootstrap'])
  .controller('BookshelfController', [
      '$scope', '$http',
      function ($scope, $http) {
        $scope.loading = true;
        $scope.query = '';
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