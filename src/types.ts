import { Resource } from 'react-request-hook';
import { HttpMethods } from '@eximchain/api-types/spec/responses';
import { ReqFactory } from './reqFactory';

export interface ApiConf {
  apiUrl: string
  oauthToken?:string
}

export interface ApiModuleConf extends ApiConf {
  reqFactory: ReqFactory
}

export interface Headers {
  'Content-Type': string,
  Authorization?:string
}

export interface ReqConf<Args=any> {
  headers: Headers
  method: HttpMethods.ANY
  data: Args
  url: string
}

export interface FixedPathFactory<Args,Returns> {
  call: (args:Args) => Promise<Returns>
  resource: (args:Args) => Resource<Returns>
  conf: (args:Args) => ReqConf<Args>
}

export interface DynamicPathFactory<Args,Returns> {
  call: (EnsName:string, args:Args) => Promise<Returns>
  resource: (EnsName:string, args:Args) => Resource<Returns>
  conf: (EnsName:string, args:Args) => ReqConf<Args>
}