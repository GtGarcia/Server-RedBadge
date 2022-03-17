require('dotenv').config()

const Express = require('express');
const app = Express();
// const sequelize = require('sequelize')

const controllers = require('./controllers');
const dbConnection = require('./db');
const middleware = require('./middleware');

const bcrypt = require('bcryptjs');

const AdminJS = require('adminjs')
const AdminJSExpress = require('@adminjs/express')
const AdminJSSequelize = require('@adminjs/sequelize')


AdminJS.registerAdapter(AdminJSSequelize)

const adminJs = new AdminJS({
  databases: [dbConnection],
  rootPath: '/admin',
})

const ADMIN = {
  email: process.env.ADMIN_EMAIL || 'admin@admin.com',
  password: process.env.ADMIN_PASSWORD || 'boxout'
}

const router = AdminJSExpress.buildAuthenticatedRouter(adminJs, {
  cookieName: process.env.ADMIN_COOKIE_NAME || 'admin-bro',
  cookiePassword: process.env.ADMIN_COOKIE_PASS || 'boxout',
  authenticate: async (email,password) => {
    if ( email === ADMIN.email && password === ADMIN.password) {
      return ADMIN
    }
    return null
  }
})

app.use(adminJs.options.rootPath, router)


app.use(Express.json());

app.use(middleware.CORS);

app.use('/user', controllers.userController);
app.use('/shoe', controllers.shoeController);
app.use('/clothes', controllers.clothesController);


dbConnection.authenticate()
.then(()=> dbConnection.sync(  ))
.then(()=> {
    app.listen(process.env.PORT, () => {
        console.log(`[Server]: app.js is listening on 3000`)
    })
})
.catch((err) => console.log(err))