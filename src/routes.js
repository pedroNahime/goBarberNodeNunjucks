const express = require('express')
const multerConfig = require('./config/multer')
const upload = require('multer')(multerConfig)
const routes = express.Router()

const authMiddleware = require('./app/middlewares/auth')
const guestMiddleware = require('./app/middlewares/guest')
const UserController = require('./app/controllers/UserController')
const SessionController = require('./app/controllers/SessionController')
const DashboardController = require('./app/controllers/DashboardController')
const FileController = require('./app/controllers/FileController')
const AppointemntController = require('./app/controllers/AppointemntController')
const AvailebleController = require('./app/controllers/AvailebleController')
const ScheduleController = require('./app/controllers/ScheduleController')

routes.use((req, res, next) => {
  res.locals.flashSuccess = req.flash('success')
  res.locals.flashError = req.flash('error')
  return next()
})

routes.get('/files/:file', FileController.show)
routes.get('/', guestMiddleware, SessionController.create)
routes.post('/signin', SessionController.store)
routes.get('/signup', guestMiddleware, UserController.create)
routes.post('/signup', upload.single('avatar'), UserController.store)

routes.get('/app/logout', SessionController.destroy)

routes.use('/app', authMiddleware)
routes.get('/app/dashboard', DashboardController.index)
routes.get('/app/appoitments/new/:provider', AppointemntController.create)
routes.post('/app/appoitments/new/:provider', AppointemntController.store)
routes.get('/app/available/:provider', AvailebleController.index)

routes.get('/app/schedule', ScheduleController.index)

module.exports = routes
