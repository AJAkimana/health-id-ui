## healthid-fe 

[![CircleCI](https://circleci.com/gh/bryanmezue/healthid-fe.svg?style=svg&circle-token=8dd98ec19dabf6258cabb335097220f17d928a70)](https://circleci.com/gh/bryanmezue/healthid-fe)

![](https://github.com/bryanmezue/healthid-fe/workflows/HealthID%20-%20Frontend/badge.svg)

Health ID is an inventory management and customer engagement software platform. This is the UI/UX codebase for the project.

## About

For pharmacists/chemists, Health ID helps them run their stores more efficiently and grow their business by improved targeting of promotions and value-added services. For consumers, Health ID improves their overall experience of pharmacies, provides personalised services and information, and also offers unique product discounts.


---

## Getting Started
#### Installation
- Install Git, `NodeJs` and `yarn` on your computer
- Clone this repository using `git clone https://github.com/bryanmezue/healthid-fe.git`
- Rename the `.env.sample` to `.env` to setup environment variables
- Run `yarn install` to install all dependencies
- Run `yarn start` to start the server
- Navigate to `http://localhost:8080` in browser to access the application

#### Development
You can run `yarn run dev` in development

#### Testing
##### Pre-requisite
- [Jest](https://jestjs.io/) and [Enzyme](https://github.com/airbnb/enzyme) 

##### Running tests
- After installing the project, do `yarn test`

## Technologies

ES6: See [here](https://en.wikipedia.org/wiki/ECMAScript) for details.

Airbnb JavaScript style guide was adopted as a coding convention, see [here](https://github.com/airbnb/javascript) for details.

Babel: Babel is a toolchain that is mainly used to convert ECMAScript 2015+ code into a backwards-compatible version of JavaScript in current and older browsers or environments.  see [here](https://babeljs.io/docs/en/) for details.

Jest: Jest is a JavaScript testing framework designed to ensure the correctness of any JavaScript codebase. It allows you to write tests with an approachable, familiar and feature-rich API that gives you results quickly. see [here](https://jestjs.io/) for details.

Enzyme: Enzyme is a JavaScript Testing utility for React that makes it easier to test your React Components' output. You can also manipulate, traverse, and in some ways simulate runtime given the output. see [here](https://github.com/airbnb/enzyme) for details.

React Apollo: This client is a complete state management library for JavaScript apps. Simply write a GraphQL query, and Apollo Client will take care of requesting and caching your data, as well as updating your UI. See [here](https://www.apollographql.com/docs/react/api/react-apollo/) for more details.

Material UI: React components for faster and easier web development. See [here](https://material-ui.com/) for more details.
