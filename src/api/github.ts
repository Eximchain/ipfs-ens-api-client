import Octokit from '@octokit/rest';
import { GitTypes } from '@eximchain/ipfs-ens-types/spec/deployment';
import { Login, LoginUrl } from '@eximchain/ipfs-ens-types/spec/methods/auth';
import range from 'lodash.range';
import parseLinkHeader from 'parse-link-header';
import { ApiModuleConf, FixedPathFactory } from "../types";

export class GitApi {
  constructor({ reqFactory, apiUrl, oauthToken }:ApiModuleConf) {
    this.octokit = oauthToken ? new Octokit({ auth : oauthToken}) : new Octokit();
    if (oauthToken) this.oauthToken = oauthToken;
    this.login = reqFactory.fixedPath<Login.Args, Login.Response>(Login.Path, Login.HTTP)
    this.loginUrl = reqFactory.fixedPath<LoginUrl.Args, LoginUrl.Response>(LoginUrl.Path, LoginUrl.HTTP)
  }

  loginUrl:FixedPathFactory<LoginUrl.Args, LoginUrl.Response>
  login:FixedPathFactory<Login.Args, Login.Response>

  private octokit:Octokit
  public oauthToken?:string

  private requireAuth() {
    if (!this.oauthToken) throw new Error('You must be logged in to call this method.')
  }

  private getMissingPageRange(link:parseLinkHeader.Links):number[] {
    return range(
      parseInt(link['next'].page), 
      parseInt(link['last'].page) + 1
    );
  }


  async getUser() {
    this.requireAuth();
    const res = await this.octokit.users.getAuthenticated();
    return res.data;
  }

  async getRepos():Promise<GitTypes.Repo[]> {
    this.requireAuth()
    const { data, headers } = await this.octokit.repos.list();
    if (!headers.link) return data;
    const allElts = [...data];
    const link = parseLinkHeader(headers.link) as parseLinkHeader.Links;
    console.log("Got a link, attempting to fetch following pages: ", this.getMissingPageRange(link));
    for (var page of this.getMissingPageRange(link)) {
      console.log(`Fetching page ${page}`)
      const res = await this.octokit.repos.list({ page });
      allElts.push(...res.data);
    }
    console.log('')
    return allElts;
  }

  async getBranches(owner: string, repo:string):Promise<GitTypes.Branch[]> {
    this.requireAuth()
    const { data, headers } = await this.octokit.repos.listBranches({ owner, repo, per_page: 100 });
    if (!headers.link) return data;
    const allElts = [...data];
    const link = parseLinkHeader(headers.link) as parseLinkHeader.Links;
    for (var page of this.getMissingPageRange(link)) {
      const res = await this.octokit.repos.listBranches({ owner, repo, page });
      allElts.push(...res.data);
    }
    return allElts;
  }
}