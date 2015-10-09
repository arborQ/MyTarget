app.service('menuService', ($rootScope : any) : application.IMenuService => {
  $rootScope.$menuItems = <Array<application.IMenuPosition>>[];
  return {
    add : (position : application.IMenuPosition)=>{
      $rootScope.$menuItems.push(position);
    },
    load : () => $rootScope.$menuItems
  };
});
