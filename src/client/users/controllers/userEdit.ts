class userEdit extends editBaseViewModel<users.IUser, application.params.IByIdentity>{
  constructor($scope:ng.IScope, $resource : ng.resource.IResourceService, public params : application.params.IByIdentity){
    super.getModel = (fromUrl : application.params.IByIdentity) : users.IUser => {
      return { id : params.id, name : `${fromUrl.id} from url`, email : `email@o${fromUrl.id}.pl`, created : null, isActive : true};
    };
    super($scope, $resource, 'api/users', params);
  }
}

usersModule.controller('userEdit', userEdit);
