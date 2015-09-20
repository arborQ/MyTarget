declare module arbor {
  interface IArborRoute {
    url: string;
    templateUrl?: string;
    template?: string;
    controller?: string;
    require?: Array<string>
  }
  interface IStateStorage {
    [key: string]: IArborRoute;
  }
}
