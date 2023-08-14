# frontend

![Vercel](https://vercelbadge.vercel.app/api/EmilyOng/cvwo-frontend)

Application: https://app.tuskmanager.rocks

## Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In order to use [react-scoped-css](https://github.com/gaoxiaoliangz/react-scoped-css), this application uses [craco](https://github.com/gsoft-inc/craco) instead.

Furthermore, it uses [Bulma](https://bulma.io/) as the CSS library-of-choice due to its lightweight, customizable and extensible features.

- `yarn`: Installs the packages
- `yarn start`: Runs the app in the development mode on [http://localhost:3000](http://localhost:3000)
- `yarn lint`: Performs code linting

### Setting up your environment

The only environment variable needed is `REACT_APP_SERVER_URL`. This refers to the url that the application will make [API](src/api/request.ts) calls to.

- (In `.env.production`) `REACT_APP_SERVER_URL`: https://tusk-manager-backend.onrender.com/api
- (In `.env.development`): `REACT_APP_SERVER_URL`: http://localhost:8080/api

### Directory Structure

- **`api/`**: Stores classes that provide an abstraction over outgoing API requests
- **`assets/`**: Static asset files, such as the application logo
- **`components/`**: Contains components of the application, which are organised based on the atomic web design principle as written in this [blog article](https://bradfrost.com/blog/post/atomic-web-design/)
- **`composables/`**: Contains composable functions that provide data based on reactive arguments
- **`generated/`**: Auto-generated type definitions to preserve parity of types with backend code
- **`store/`**: Contains redux state and reducers used, created with [Redux Toolkit](https://redux-toolkit.js.org/)
- **`utils/`**: Contains global utility functions

### Deployment

Deployment is handled automatically by [Vercel](https://vercel.com/) when you push your changes to the `main` branch.
