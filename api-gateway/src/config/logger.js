const { createLogger, format, transports, log } = require('winston');

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.printf(({ level, message, timestamp }) =>{
            return `${ timestamp } [${ level.toUpperCase() }] ${ message }`;
        })
    ),
    transports: [
        new transports.Console()
    ]
});

const morganStream = {
    write: (message)=>{
        logger.info(message.trim());
    }
}

module.exports = { logger, morganStream };