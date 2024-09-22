/* eslint-disable @typescript-eslint/no-explicit-any */
import { createLogger, format, Logger, transports } from 'winston';

const date = new Date().toLocaleDateString('sv-SE', { timeZone: 'Asia/Tokyo' });

export class BoostfiyLogger {
  private logger: Logger = createLogger({
    level: 'info',
    format: format.combine(
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
      }),
      format.errors({ stack: true }),
      format.splat(),
      format.json(),
    ),
    defaultMeta: { service: 'boostfiy', scriptName: '' },
    transports: [
      new transports.File({
        filename: `log/${date}/error.log`,
        level: 'error',
      }),
      new transports.File({ filename: `log/${date}/development.log` }),
    ],
  });

  constructor(scriptName: string) {
    if (process.env.NODE_ENV !== 'production') {
      this.logger.add(
        new transports.Console({
          format: format.combine(format.colorize(), format.simple()),
        }),
      );
    }
    this.logger.defaultMeta['scriptName'] = scriptName;
  }

  public info(message: string, meta?: any) {
    this.logger.info(message, meta);
  }

  public error(message: string, meta?: any) {
    this.logger.error(message, meta);
  }

  public warn(message: string, meta?: any) {
    this.logger.warn(message, meta);
  }

  public debug(message: string, meta?: any) {
    this.logger.debug(message, meta);
  }
}
