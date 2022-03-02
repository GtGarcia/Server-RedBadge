require('dotenv').config()

const Express = require('express');
const app = Express();

const controllers = require('./controllers');
const dbConnection = require('./db');
const middleware = require('./middleware');

const bcrypt = require('bcryptjs');

app.use(Express.json());

app.use(middleware.CORS);



dbConnection.authenticate()
.then(()=> dbConnection.sync(  ))
.then(()=> {
    app.listen(process.env.PORT, () => {
        console.log(`[Server]: app.js is listening on 3000`)
    })
})
.catch((err) => console.log(err))