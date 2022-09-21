import { Express } from 'express'
import { healthController } from '../health'

export function applyExpressRouter(app: Express): void {
  app.get('/health', healthController)
}
