# ipfs-ens-api-client
Node.js client to interact with our new ipfs-ens API.  This is a private package, so I'm taking a narrower approach.  This library will just use `axios`, as that's the solution built into `react-request-hooks`.  That library does some very convenient heavy lifting, so we ought to make use of it.

## API Spec

- `API.login(code:string)`: POST /login
- `API.list()`: GET /deployments
- `API.get(EnsName:string)`: GET /deployments/{EnsName}
- `API.create(args:DeployArgs)`POST /deployments/{args.EnsName}

This client will not worry about how to get a `code`, as that requires a deployed webapp, but it can be used to get the final OAuth token.