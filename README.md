# voting

## Client init

```sh
cd ClientApp

npm install

node ./config/utils/ts2cs.js
```

### Available Scripts

In the project directory, you can run:

#### `npm run prod`

Builds the app for production to the `dist` folder.

#### `npm run prod:server`

Start a dev server with production build.

#### `npm run dev`

Builds the app for development to the `dist` folder.

#### `npm run dev:server`

Start a dev server with development build.

#### `npm run lint`

Find code to lint.

#### `npm run lint:fix`

Lint code.

#### `npm run test:unit`

Runs tests for files that match \*.test.\*.

#### `npm run test:service`

Launches the test runner for api testing.

## Server init

```sh
cd ServerApp

nuget restore

dotnet ef migrations add Vote --project vote.csproj --context VoteContext

dotnet ef migrations add IS4Configuration --project vote.csproj --context IdentityServer4.EntityFramework.DbContexts.ConfigurationDbContext

dotnet ef migrations add IS4PersistedGrant --project vote.csproj --context IdentityServer4.EntityFramework.DbContexts.PersistedGrantDbContext

dotnet ef migrations database update
```

## Before publishing in Visual Studio

Change Authority in Startup.cs

```cs
// development
options.Authority = "http://localhost:61598";

// production
options.Authority = "http://localhost:5000";
```

> Use vars in env: [https://stackoverflow.com/questions/185208/how-do-i-get-and-set-environment-variables-in-c](https://stackoverflow.com/questions/185208/how-do-i-get-and-set-environment-variables-in-c)
