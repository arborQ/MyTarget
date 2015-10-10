declare module application{
  interface IMenuPosition{
    name : string;
    state : string;
  }
  interface IRootScope{
    menuPositions : Array<IMenuPosition>;
  }

  interface IMenuService{
    add : (position : IMenuPosition) => void;
    load : () => Array<IMenuPosition>;
  }

  class CreateViewModel<T> {

  }
}
