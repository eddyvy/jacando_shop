import { Express } from 'express'
import cors from 'cors'
import { loggerMiddleware } from '../logger'

export function applyExpressMiddlewares(app: Express): void {
  app.use(cors())
  app.use(loggerMiddleware)
}
