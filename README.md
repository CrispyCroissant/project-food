# Project Food

A simple web application which chooses a random recipe from a list of them.

## Getting Started
Before you start developing, you need to set the following environment variables:

#### Frontend
| Key                   | Description                        |
|-----------------------|------------------------------------|
| `VUE_APP_BACKEND_URL` | the URL used by the backend server |

#### Backend
| Key                | Description                                    |
|--------------------|------------------------------------------------|
| `NODE_ENV`         | either *production* or *dev*                   |
| `PORT`             | the port the server listens to for connections |
| `DB_URL`           | the URL for the MongoDB server                 |
| `AUTH_SESS_SECRET` | the secret used for authentication sessions    |
| `FRONTEND_URL`     | the URL for the frontend                       |



### Dependencies

* Node 16.13.1 or newer.

### Installing

You only need to install the packages in the front- and backend directories via `npm install`.

### Executing program

The web app consists of two seperate programs, the frontend and the backend. Consequently, you have two sets of commands to for the them.

#### Frontend
* Starting the development server
```
npm run serve
```
* Building the project files
```
npm run build
```
* Running unit tests
```
npm run test:unit
```
* Running the linter
```
npm run lint
```

#### Backend
* Starting the devlopment server
```
npm run dev
```
* Running unit tests
```
npm run dev
```

## Authors  
[@Crispycroissant](https://github.com/CrispyCroissant)

## Version History

## License

## Acknowledgments
