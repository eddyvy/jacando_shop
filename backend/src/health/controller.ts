import { Request, Response } from 'express'

export function healthController(_: Request, res: Response) {
  res.send({ status: 'UP' })
}
