import 'dotenv/config'
import express from 'express'
import { router } from './routes/index.js'

import './shared/services/translateYup'

const server = express()

server.use(express.json())
server.use(router)

export { server }
