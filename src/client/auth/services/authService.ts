var console = console;
class authService implements application.auth.IAuthService {
  private token : string;
  storageKey : string = "token_id";
  constructor(private jwtHelper: ng.jwt.IJwtHelper,private localStorageService : any) {
    this.token = localStorageService.get(this.storageKey);
  }

  private tokenIsActive() : boolean{
    return this.token && !this.jwtHelper.isTokenExpired(this.token);
  }
  SetToken(token: string): application.auth.IUserData {
    this.token = token;
    this.localStorageService.set(this.storageKey, token);
    return this.GetUserData();
  }
  GetUserData() : application.auth.IUserData{
    return this.jwtHelper.decodeToken<application.auth.IUserData>(this.token);
  }
  HasAccess(role: string): boolean {
    console.log(this.GetUserData());
    console.log(this.tokenIsActive());
    console.log(this.GetUserData().roles.indexOf(role) !== -1);
     if(this.tokenIsActive()){
      return this.GetUserData().roles.indexOf(role) !== -1;
    }else{
      return false;
    }
  }
}

auth.service('authService', authService);
