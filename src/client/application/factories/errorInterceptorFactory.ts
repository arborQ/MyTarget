app.factory('errorInterceptorFactory', ($q : angular.IQService, toaster : any) => {
  return {
    // optional method
  //  'requestError': function(rejection) {
  //     // do something on error
  //     if (canRecover(rejection)) {
  //       return responseOrNewPromise
  //     }
  //     return $q.reject(rejection);
  //   },
    // optional method
   'responseError': function(rejection : any) {
      toaster.pop({
                type: 'error',
                title: 'Ajax',
                body: 'ajax error occured',
                showCloseButton: true
            });
      return $q.reject(rejection);
    }
  };
});
