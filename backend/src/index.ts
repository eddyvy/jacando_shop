import { start } from './server'
import { logger } from './logger'

start().then(logger.info).catch(logger.error)
