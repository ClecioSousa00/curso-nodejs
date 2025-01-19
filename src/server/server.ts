import 'dotenv/config'
import express from 'express'

import './shared/services/translateYup'
import { router } from './routes'

const server = express()

server.use(express.json())
server.use(router)

export { server }
