// Feature Controller definition
(function() {

  angular
    .module("PLS")
    .controller("FeatCtrl", FeatCtrl);

  // Dependency injection
  FeatCtrl.$inject = [ 
    'HelpService',
  ];

  function FeatCtrl(HelpService) {
    var vm = this;

    vm.question = '';
    vm.answer = '';

    vm.submit = submitFunc;
    vm.remoteCall = remoteCallFunc;

    function submitFunc() {
      vm.answer = 
        HelpService
          .ask(vm.question);
    }

    function remoteCallFunc() {
      HelpService
        .askRemote(vm.question)
        .then(function(result) {
          vm.answer = result;
        })
        .catch(function(err) {
          vm.answer = err.statusText;
        });
    }
  }
})();
