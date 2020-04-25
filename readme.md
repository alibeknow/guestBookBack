# Node Express guestBook

## This is a basic boilerplate for backend development with node and express
### It comes setup with the following features

- Authentication (passport & JWT)
- Validation
- Password Encryption (bcryptjs)
- Authorization and Access level control
- Database configuration with Sequelize ORM
- CORS 

### To get started,

- clone this repository
- `cd guestBookBack`
- run `yarn install`
- add your database in `src/config/config.json`
- be sure to have `nodemon` installed
- yarn run dev
- if you don't have `nodemon` installed, change your `dev` script in package.json to `node --exec babel-node src/index.js`
