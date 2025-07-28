# GUI Environment

The `gui-environment` package is a command-line tool that simplifies managing environment variables for your application. Easily set up different configurations based on your build mode (development, staging or production) for a smooth development workflow.

</br>

## Getting Started

Install the package:
```bash
npm i -D gui-environment
```

Initialize your project's environment:
```bash
npx gui-environment --init

# using a custom source path
npx gui-environment --src="custom-src" --init
```

Include the `gui-environment` binary in your `package.json` file:
```json
...
"scripts": {
  "build-dev": "gui-environment --development && tsc -b && vite build && ...",
  "build-staging": "gui-environment --staging && tsc -b && vite build && ...",
  "build-production": "gui-environment --production && tsc -b && vite build && ...",

  // using a custom source path
  "build-dev": "gui-environment --src='custom-src' --development && tsc -b && vite build && ...",
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
    tsconfig.json
    ...
```

### Usage

Once initialized, include your environment variables in the following files accordingly:

- `environment.development.ts`

- `environment.production.ts`

- `environment.staging.ts`

- `types.ts`

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
# unit tests
npm run test:unit

# integration tests
npm run test:integration
```



<br/>

## License

[MIT](https://choosealicense.com/licenses/mit/)