var console = console;
class authService implements application.auth.IAuthService {
  private token : string;
  private validationPromise : ng.IDeferred<string>;
  storageKey : string = "token_id";
  constructor(
    private jwtHelper: ng.jwt.IJwtHelper,
    private $q : ng.IQService,
    private $http : ng.IHttpService,
    $resource : ng.resource.IResourceService,
    private localStorageService : any,
    private $rootScope : ng.IScope
  ) {
    this.validationPromise = $q.defer();
    var savedToken = localStorageService.get(this.storageKey);
    if(savedToken){
      $resource('/api/auth').get({ token : savedToken }).$promise.then((token : any) => {
        this.SetToken(token.token);
      }).catch(()=>{
        this.validationPromise.reject(null);
      });
    }else{
      this.validationPromise.reject(null);
    }
  }

  private tokenIsActive() : boolean{
    return this.token && !this.jwtHelper.isTokenExpired(this.token);
  }
  SetToken(token: string): application.auth.IUserData {
    this.token = token;
    this.localStorageService.set(this.storageKey, token);
    this.$http.defaults.headers.common.Authorization = token;
    this.validationPromise.resolve(token);
    this.validationPromise = this.$q.defer();
    this.validationPromise.resolve(token);
    this.$rootScope.$broadcast("newUserData", this.GetUserData())
    return this.GetUserData();
  }
  GetUserData() : application.auth.IUserData{
    return this.jwtHelper.decodeToken<application.auth.IUserData>(this.token);
  }
  IsAnnonymous() : ng.IPromise<boolean> {
    var accessPromise = this.$q.defer();
    this.validationPromise.promise.then((token : string) =>{
      accessPromise.reject(false);
    }).catch(()=>{
      accessPromise.resolve(true);
    });
    return accessPromise.promise;
  };
  HasAccess(role: string): ng.IPromise<boolean> {
    var accessPromise = this.$q.defer();

    this.validationPromise.promise.then((token : string) =>{
      if(this.tokenIsActive() && this.GetUserData().roles.indexOf(role) !== -1){
        accessPromise.resolve(true);
      }else{
        accessPromise.reject(false);
      }
    }).catch(() => {
      accessPromise.reject(false);
    });
    return accessPromise.promise;
  };

  LogOut(){
    this.token = null;
    this.localStorageService.set(this.storageKey, null);
    this.$http.defaults.headers.common.Authorization = null;
    this.validationPromise = this.$q.defer();
    this.validationPromise.reject(null);
    this.$rootScope.$broadcast("newUserData", null)
  }
}

auth.service('authService', authService);
