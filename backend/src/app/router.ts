import { Express } from 'express'
import { fixturesController } from '../fixtures'
import { healthController } from '../health'

export function applyExpressRouter(app: Express): void {
  app.get('/health', healthController)
  app.get('/fixtures', fixturesController)
}
