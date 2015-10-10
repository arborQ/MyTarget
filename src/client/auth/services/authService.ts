class authService implements application.auth.IAuthService {
  private token : string;
  constructor(private jwtHelper: ng.jwt.IJwtHelper) {
  }

  private tokenIsActive() : boolean{
    return this.token && !this.jwtHelper.isTokenExpired(this.token);
  }
  SetToken(token: string): application.auth.IUserData {
    this.token = token;
    return this.GetUserData();
  }
  GetUserData() : application.auth.IUserData{
    return this.jwtHelper.decodeToken<application.auth.IUserData>(this.token);
  }
  HasAccess(role: string): boolean {
     if(this.tokenIsActive()){
      return this.GetUserData().roles.filter((r) => r === role).length > 0;
    }else{
      return false;
    }
  }
}

auth.service('authService', (jwtHelper: ng.jwt.IJwtHelper) : application.auth.IAuthService => new authService(jwtHelper));
