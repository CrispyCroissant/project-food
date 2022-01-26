# Project Food

A simple web application which chooses a random recipe from a list of recipes.

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
| `BASE_URL`         | the URL for the backend                        |
| `EMAIL_HOST`       | the host email address (*must be Hotmail*)     |
| `EMAIL_HOST_PASS`  | the password to the host email account         |

### Dependencies

* [Node 16.13.1](https://nodejs.org) or newer.
* npm 8.x.x or newer.
* [MongoDB](https://www.mongodb.com/)

### Installing

* You only need to install the packages in the front- and backend directories via `npm install`.

### Executing program

The web app is separated into a frontend and backend. Consequently, there's two sets of commands for respective parts.

* #### Frontend
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

* #### Backend
  * Starting the server (*production-only*)
  ```
  npm run start
  ```
  * Running unit tests
  ```
  npm run test
  ```
  * Pushing changes to production (not to this repo)
  ```
  npm run push-prod
  ```

## Authors  
[@CrispyCroissant](https://github.com/CrispyCroissant)

## Version History
* 0.2.1
  * Removed email case-sensitivity.
* 0.2.0
  * Improved UX.
  * Bug fixes.
  * See [#25](https://github.com/CrispyCroissant/project-food/pull/25) for more details.
* 0.1.0
  * Initial release. 

## License
This project is licensed under the GNU General Public License v3.0.

## Acknowledgments
To be listed...
