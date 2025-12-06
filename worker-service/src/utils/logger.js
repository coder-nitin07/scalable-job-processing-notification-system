const { createLogger, transports, format } = require('winston');

const logger = createLogger({
    format: format.combine(
        format.timestamp(),
        format.print(({ timestamp, level, message })=>{
            return `[${ timestamp }] ${ level.toUpperCase() }: ${ message }`
        })
    ),

    transports: [ new transports.Console() ]
});

module.exports = logger;