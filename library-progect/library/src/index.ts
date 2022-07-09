import 'dotenv/config'
import path from 'path'
import http from 'http'
import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import axios from 'axios'
import 'reflect-metadata'

import { passport } from './helpers/passport'
import socketConnect from './helpers/socket'

const app = express()
const server = http.createServer(app)
socketConnect(server)

const userApiRouter = require('./routes/api/user')
const booksApiRouter = require('./routes/api/books')
const indexRouter = require('./routes/index')
const booksRouter = require('./routes/books')
const usersRouter = require('./routes/users')
const errorsRouter = require('./routes/errors')

import sessionMiddleware from './middleware/session'
import errorMiddleware from './middleware/error'

app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs')

app.use(cookieParser())
app.use(sessionMiddleware)

app.use(passport.initialize())
app.use(passport.session())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())
app.use('/public', express.static(path.join(__dirname, '..','/public')))
app.use('/', errorsRouter)
app.use('/books', booksRouter)
app.use('/', usersRouter)
app.use('/', indexRouter)
app.use('/api/user', userApiRouter)
app.use('/api/books', booksApiRouter)

app.use(errorMiddleware)

axios.defaults.withCredentials = true

const port = process.env.PORT || 3000

const init = async () => {
  try {
    // mongoose.set('bufferCommands', false)
    await mongoose.connect(process.env.DB_HOST || 'mongodb://localhost:27017/', {
      user: process.env.DB_USERNAME || '',
      pass: process.env.DB_PASSWORD || '',
      dbName: process.env.DB_NAME || 'books'
    })
    console.log(mongoose.connection.readyState)
    console.log('Соединение с БД успешно')
    server.listen(port, () => {
      console.log(`Library app listening on port ${port}`)
    })
  } catch (e) {
    console.warn(e.toString())
  }
}
init()
