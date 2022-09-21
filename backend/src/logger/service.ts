import { addColors, createLogger, format, transports } from 'winston'

const customColors = {
  info: 'blue',
  warn: 'yellow',
  error: 'red',
}

addColors(customColors)

export const logger = createLogger({
  format: format.combine(
    format.colorize(),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    format.printf(
      (info) =>
        `${info.timestamp} [${info.level}]:${
          info.level.includes('error') ? '' : ' '
        } |---------------> ${info.message}`,
    ),
    format.errors({ stack: true }),
  ),
  transports: [new transports.Console()],
})
