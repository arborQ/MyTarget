declare module application.auth{
  interface IUserData{
    id : number;
    login : string;
    roles : Array<string>;
  }
  interface IAuthService{
      SetToken(token : string) : IUserData;
      GetUserData() : IUserData;
      HasAccess(role : string) : ng.IPromise<boolean>;
      IsAnnonymous() : ng.IPromise<boolean>;
      LogOut(): void;
  }
}
