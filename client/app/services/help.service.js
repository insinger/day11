// Help Service definition
(function() {

  angular
    .module("PLS")
    .service("HelpService", HelpService);

  HelpService.$inject = [
    '$timeout',
    '$http',
  ];

  function HelpService($timeout, $http) {
    var vm = this;

    var possinleAnswers = [
      "I don't know.",
      "Ask someone else!",
      "I know. It's world peace ;-)",
    ];

    vm.ask = askFunc;
    vm.askRemote = askRemoteFunc;

    function askFunc(question) {
      var idx = Math.floor(Math.random()*possinleAnswers.length);
      return possinleAnswers[idx];
    }

    function askRemoteFunc(question) {
      return $http.get('/ask', {
        params: {
          qn: question,
        }  
      })
      .then(function(result) {
        return result.data;
      });
    }
  }
})();
