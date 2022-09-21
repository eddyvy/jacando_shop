import { Request, Response } from 'express'
import { logger } from './service'

export function loggerMiddleware(
  req: Request,
  res: Response,
  next: CallableFunction,
) {
  const reqTime = Date.now()

  res.on('finish', function () {
    logger.info(
      `${res.statusCode} ${req.method} ${req.path} | ${req.ip} | ${
        Date.now() - reqTime
      } ms`,
    )
  })

  next()
}
