# GUI Environment

The `gui-environment` package is a command-line tool that simplifies managing environment variables for your application. Easily set up different configurations based on your build mode (development, staging or production) for a smooth development workflow.

</br>

## Getting Started

Install the package:
```bash
$ npm install -D gui-environment
```

Initialize your project's environment:
```bash
$ npx gui-environment --init

# Using a custom source path
$ npx gui-environment --src="custom-src" --init
```

Include the `gui-environment` binary in your `package.json` file:
```json
...
"scripts": {
  "build-dev": "gui-environment --development && tsc && ...",
  "build-staging": "gui-environment --staging && tsc && ...",
  "build-production": "gui-environment --production && tsc && ...",

  // Using a custom source path
  "build-dev": "gui-environment --src='custom-src' --development && tsc && ...",
}
...
```




### Output Example

```
project
    │
    src/
    │  ├───components/
    │  │         └───...
    │  ├───environment/
    │  |         ├───environment.development.ts
    │  |         ├───environment.production.ts
    │  |         ├───environment.staging.ts
    │  |         ├───environment.ts
    │  |         └───types.ts
    │  └───main.tsx
    │
    package.json
    tscofig.json
    ...
```

### Usage

Once initialized, include your environment variables in the following files accordingly:

1. `environment.development.ts`

2. `environment.production.ts`

3. `environment.staging.ts`

Use the environment variables anywhere:

```typescript
// main.tsx
import { ENVIRONMENT } from './environment/environment.ts';

ENVIRONMENT
// {
//    production: false,
//    version: '1.0.0'
// }
```

<br/>

**Important:** keep in mind that whatever data you include in these files will be public when your app is deployed. Avoid sharing sensitive information such as API keys, secrets, etc...





<br/>

## Built With

- TypeScript





<br/>

## Running the Tests
```bash
# Unit Tests
$ npm run test:unit

# Integration Tests
$ npm run test:integration
```



<br/>

## License

[MIT](https://choosealicense.com/licenses/mit/)





<br/>

## Acknowledgments

- [Angular CLI](https://angular.dev/)





<br/>

## Deployment

Install dependencies:
```bash
$ npm install
```

Build the project:
```bash
$ npm start
```

Publish to `npm`:
```bash
$ npm publish
```