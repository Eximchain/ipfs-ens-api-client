# ipfs-ens-api-client
Node.js client to interact with our new ipfs-ens API.  This is a private package, so I'm taking a narrower approach.  This library will just use `axios`, as that's the solution built into `react-request-hooks`.  That library does some very convenient heavy lifting, so we ought to make use of it.

## API Spec

- `API.login(code:string) => POST /login`: Provide a `code` and get an OAuthToken.
- `API.loginUrl() => GET /login`: Get the API's corresponding OAuth login URL; visit page to get `code`.
- `API.list() => GET /deployments`: Return a list of all the user's deployments
- `API.get(EnsName:string) => GET /deployments/{EnsName}`: Check one of your deployments.  404s for deployments not made by user.
- `API.create(args:DeployArgs) => POST /deployments/{args.EnsName}`: Create a new deployment.
