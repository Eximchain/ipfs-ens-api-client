import { HttpMethods } from "@eximchain/api-types/spec/responses";
import axios from 'axios';
import { request as resourceRequest } from 'react-request-hook';
import { FixedPathFactory, DynamicPathFactory, ReqConf, ApiConf, Headers } from "./types";
import url from 'url';

export class ReqFactory {
  constructor(conf:ApiConf){
    const { apiUrl, oauthToken } = conf;
    this.apiUrl = apiUrl;
    if (oauthToken) this.oauthToken = oauthToken;
  }

  private apiUrl: string
  private oauthToken?: string

  public fixedPath<Args, Returns>(
    path:string, method:HttpMethods.ANY
  ):FixedPathFactory<Args, Returns> {
    return {
      resource: (args:Args) => this.resourceConf<Args, Returns>(path, method, args),
      conf: (args:Args) => this.axiosConf<Args>(path, method, args),
      call: async (args:Args):Promise<Returns> => {
        const res = await axios(this.axiosConf<Args>(path, method, args));
        return res.data;
      }
    }
  }

  public dynamicPath<Args,Returns>(
    path:(suffix:string) => string, method:HttpMethods.ANY
  ):DynamicPathFactory<Args, Returns> {
    return {
      resource: (EnsName:string, args:Args) => this.resourceConf<Args, Returns>(path(EnsName), method, args),
      conf: (EnsName:string, args:Args) => this.axiosConf(path(EnsName), method, args),
      call: async (EnsName:string, args:Args):Promise<Returns> =>  {
        const res = await axios(this.axiosConf<Args>(path(EnsName), method, args));
        return res.data;
      }
    }
  }

  private buildFullPath(path:string) { return url.format(url.resolve(this.apiUrl, path)) }

  private buildHeaders() {
    const headers: Headers = {
      'Content-Type': 'application/json'
    };
    if (this.oauthToken) headers.Authorization = this.oauthToken;
    return headers;
  }

  private axiosConf<Args>(path:string, method:HttpMethods.ANY, data:Args):ReqConf<Args> {
    return {
      method, data,
      url: this.buildFullPath(path),
      headers: this.buildHeaders()
    }
  }

  private resourceConf<Args, Returns>(path:string, method:HttpMethods.ANY, args:Args) {
    return resourceRequest<Returns>(this.axiosConf(path, method, args));
  }
}