import {} from '@eximchain/ipfs-ens-types/spec/deployment';
import { ReqFactory } from './reqFactory';
import { GitApi, DeploysAPI } from './api';
import { ApiConf, ApiModuleConf } from './types';

export class API {
  constructor(conf:ApiConf){
    const { apiUrl, oauthToken } = conf;
    this.apiUrl = apiUrl;
    if (oauthToken) this.oauthToken = oauthToken;
    const moduleConf:ApiModuleConf = { 
      ...conf, 
      reqFactory: new ReqFactory(conf)
    }
    this.git = new GitApi(moduleConf);
    this.deploys = new DeploysAPI(moduleConf);
  }

  readonly apiUrl: string
  readonly oauthToken?: string

  git:GitApi
  deploys:DeploysAPI

  hasAuth():boolean {
    return !!this.oauthToken;
  }
}

export default API;