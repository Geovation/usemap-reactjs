# UseMap ReactJS

A ReactJS front end for the UseMap application. This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Getting Started

These instructions will give you a copy of the project up and running on
your local machine for development and testing purposes. See deployment
for notes on deploying the project on a live system.

### Prerequisites

- [NodeJS](https://nodejs.org/en/)

### Installing

```console
npm install
```

In the project directory, you can then run:

```console
npm start
```

This runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

To run the application, the API should also be running.

### Environment variables

In development, environment variables can be set within the `.env` file (can be created by copying the `.env.sample` file). This file is excluded from source control and should never be committed in public code.

During production runtime the environment variables can be set within the build environment e.g. within GitHub actions. As this is a client side project it should be noted that those values will be available within the built code.

| Variable               | Description                            |
| ---------------------- | -------------------------------------- |
| REACT_APP_OS_MAP_URL   | A URL for the OS Base Map Tile Service |
| REACT_APP_API_BASE_URL | A URL for the supporting API           |

## Deployment

```console
npm run build
```

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

## Authors

See the list of
[contributors](https://github.com/PurpleBooth/a-good-readme-template/contributors)
who participated in this project.

## License

This project is licensed under the [MIT](LICENSE.md) License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgements and Technologies

- [ReactJS](https://reactjs.org/)
- [Material UI](https://mui.com/)
- [MapLibre](https://maplibre.org/)
