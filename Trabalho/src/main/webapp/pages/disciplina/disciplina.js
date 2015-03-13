module = angular.module("Prova", []);

module.service("disciplinaService", function($http){
   var url = "/disciplinas";
   
   this.list = function(){
       return $http.get(url);
   };
   
   this.add = function(disciplina){
        return $http.post(url, disciplina);
   };
   
   this.remove = function(id){
       return $http.delete(url + '/' + id);
   };
   
   this.edit = function(disciplina){
       return $http.put(url, disciplina);
   };
   
   this.getByid = function(id){
        return $http.get(url + '/' + id);
   };
});

module.controller("DisciplinaController", function($scope, disciplinaService){
   
   $scope.isNovo = true;
   $scope.disciplinas = [];
   
   $scope.atualizar = function(){
       disciplinaService.list().success(function(data){
           $scope.disciplinas = data;
           $scope.isNovo = true;
           $scope.disciplina = {};
       }).error(function(){
           console.log("Aconteceu algum erro");
       });
   };
   
   $scope.salvar = function(disciplina){
      if ($scope.isNovo){
          disciplinaService.add(disciplina).success(onSuccess).error(onError);
      }else{
          disciplinaService.edit(disciplina).success(onSuccess).error(onError);
      }
      
      function onSuccess(){
         $scope.atualizar();
      };
      
      function onError(){
          console.log("Aconteceu algum erro");
      }
   };
   
   $scope.editar = function(disciplina){
      disciplinaService.getByid(disciplina.id).success(function(data){
          $scope.disciplina = data;
          $scope.isNovo = false;
      }).error(function(){
          console.log("Aconteceu algo errado");
      });
   };
   
   $scope.excluir = function(disciplina){
     disciplinaService.remove(disciplina.id).success(function(){
         $scope.atualizar();
     }).error(function(){
         console.log("Aconteceu algo errado");
     });  
   };
   
});


