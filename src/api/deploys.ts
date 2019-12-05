import { ListDeployments, ReadDeployment, CreateDeployment } from '@eximchain/ipfs-ens-types/spec/methods/private';
import { Login, LoginUrl } from '@eximchain/ipfs-ens-types/spec/methods/auth';
import { ApiModuleConf, FixedPathFactory, DynamicPathFactory } from "../types";

export class DeploysAPI {
  constructor({ reqFactory }:ApiModuleConf) {
    this.list = reqFactory.fixedPath<ListDeployments.Args, ListDeployments.Response>(ListDeployments.Path, ListDeployments.HTTP);
    this.read = reqFactory.dynamicPath<ReadDeployment.Args, ReadDeployment.Response>(ReadDeployment.Path, ReadDeployment.HTTP);
    this.create = reqFactory.dynamicPath<CreateDeployment.Args, CreateDeployment.Response>(CreateDeployment.Path, CreateDeployment.HTTP);
    this.login = reqFactory.fixedPath<Login.Args, Login.Response>(Login.Path, Login.HTTP)
    this.loginUrl = reqFactory.fixedPath<LoginUrl.Args, LoginUrl.Response>(LoginUrl.Path, LoginUrl.HTTP)
  }

  public list: FixedPathFactory<ListDeployments.Args, ListDeployments.Response>
  public read: DynamicPathFactory<ReadDeployment.Args, ReadDeployment.Response>
  public create: DynamicPathFactory<CreateDeployment.Args, CreateDeployment.Response>
  public loginUrl:FixedPathFactory<LoginUrl.Args, LoginUrl.Response>
  public login:FixedPathFactory<Login.Args, Login.Response>

}