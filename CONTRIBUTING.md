I have poured my :heart: to this project and nothing gives me more joy to see someone contribute to it with the shared goal of making Bangle.dev better.

## Code

### Dev setup

Bangle uses `yarn` v2 which provides the feature of zero-install which mean you would not have to run `yarn install` everytime you checkout the code, every thing should just run.

```sh
# start the docs website
yarn start

# to run tests
yarn test

# to run e2e tests
yarn g:e2e
```

## Documentation

### API

The API documentation for each package is expected in to be inside an `api.md` file at the same level as the `package.json` of that package. The repository [bangle.dev-website](https://github.com/bangle-io/bangle.dev-website) takes care of building and templating the api docs.

For templating we use [handlebars](https://handlebarsjs.com) and a configuration file `api-docs.config.js`. The config includes a bunch of shorthands & helper functions which are used by [handlebars](https://handlebarsjs.com) to generate the final product.

### Steps to do a release

- Bump up the version in the file `constraints.pro`.

- Run `yarn update-versions`.

- Make sure you are authenticated by doing `yarn npm login`.

- Update the changelog.

- Make sure you have exported the OTP `export OTP=597808` before running next command

- Run `release-packages` for a regular release or `release-packages-alpha` for a pre-release.


## Directory Structure

The packages are divided in the following manner:

- `lib`: The library packages containing the foundational code for building an editor.

- `components`: All packages in this directory are bangle components. Read this [doc](https://bangle.dev/docs/api/core/#component) to know more about what a bangle.dev component is.

- `tooling`: Mostly for internal use like testing, glue code etc. This is only helpful for folks contributing to the project.