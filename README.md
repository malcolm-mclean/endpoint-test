## The Test

In this test you'll be creating a page that searches [this free API](https://github.com/typicode/jsonplaceholder#jsonplaceholder) for posts created by a user given the user's ID. The API should be queried using Javascript.

This test has no time limit, although it's recommended that you spend no more than 6 hours on it. The design of the page is up to you but you can refer to this as a guide:

![Sample Page](https://github.com/malcolm-mclean/endpoint-test/blob/master/documentation/sample_mockup.png?raw=true "Sample Page")

## Development

- Clone or download this repo
- Make your changes to CSS and JS files in either:
  - `./assets/src` (see [Optional](#optional))
  - `./assets/dist`
- Make HTML changes to `./index.html`

When complete, either open a pull request or send your changes to us via email with an attached ZIP folder. Please also let us know the time it took you to complete the test.

#### Optional

This repo contains build tools for SCSS and browser sync which allow you to work with the files in the `assets/src` directory. If you would like to use these tools while developing, follow these steps:

- Install [NodeJS](https://nodejs.org/en/)
- Install [Yarn](https://yarnpkg.com/en/)
- `yarn install`
- `yarn run gulp`

## What we're looking for

The basics:

- Does the search work properly?
- Is the page mobile friendly?
- Are there red flags in the JS? _ex: poor performing code, duplicate logic, etc_
- Does the HTML structure of the page use semantic tagging?
- Are there red flags in the CSS/SCSS? _ex: excessive use of floats, explicit widths, lack of media queries_

Nice-to-haves:

- Does the search have validation?
- Does the search handle errors?
- Does the page display a loading state?