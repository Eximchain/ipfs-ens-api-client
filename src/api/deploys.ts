import { ListDeployments, ReadDeployment, CreateDeployment } from '@eximchain/ipfs-ens-types/spec/methods/private';
import { ApiModuleConf, FixedPathFactory, DynamicPathFactory } from "../types";

export class DeploysAPI {
  constructor({ reqFactory }:ApiModuleConf) {
    this.list = reqFactory.fixedPath<ListDeployments.Args, ListDeployments.Response>(ListDeployments.Path, ListDeployments.HTTP);
    this.read = reqFactory.dynamicPath<ReadDeployment.Args, ReadDeployment.Response>(ReadDeployment.Path, ReadDeployment.HTTP);
    this.create = reqFactory.dynamicPath<CreateDeployment.Args, CreateDeployment.Response>(CreateDeployment.Path, CreateDeployment.HTTP);
  }

  public list: FixedPathFactory<ListDeployments.Args, ListDeployments.Response>
  public read: DynamicPathFactory<ReadDeployment.Args, ReadDeployment.Response>
  public create: DynamicPathFactory<CreateDeployment.Args, CreateDeployment.Response>
}