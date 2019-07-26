# BusyBuddies

## MVP
A user can create an account, log in, and create calendar events, which have a unique URLs.

## Development Goals
- All db management should be handled in cloud services
	- Likely AWS
- Reusable components
- Utilize both SQL an noSQL databases
	- Likely Dynamo and mySQL
- Integrate ElasticSearch

## Testing Goals
- TDD
- Component Testing
	- Catch prop changes such as CSS class adjustments
	- Catch data fetches on renders
	- Regression tests - Make sure nothing breaks when rendering different components
- Develop a better understanding of how to catalogue tests in 3p system
	- Authentication and datastores to be handled in AWS. How can I expose my process of developing schema/db structures?
- Define an approach to testing bugs. At what level are all tests re-written?

## Accessibility Goals
- Develop a better understanding of basic accessibility standards

## Learning Goals
- This is a data exposure project. I am prioritizing adopting new db tools over security or accessibility.
	- These are latter concerns that I do still plan to address.
- Develop a better understanding of relational database tools
- Develop a better understanding of React's Context API
- Develop a better understanding of ElasticSearch
- Develop a better understanding of security concerns
- Develop a better understanding of how to implement state machines

### Tools
- npm
- npx
- [create-react-app](https://github.com/facebook/create-react-app)
- [amazon-cognito-identity-js](https://github.com/aws-amplify/amplify-js/tree/master/packages/amazon-cognito-identity-js)
- [validator](https://github.com/validatorjs/validator.js)

### Dependencies

### Resources
