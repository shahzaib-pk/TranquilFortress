const winston = require('winston');
const config = require('config');

require('winston-mongodb');
require('express-async-errors');
module.exports = function () {

    winston.exceptions.handle(
        new winston.transports.File({
            filename: 'uncaughtExceptions.log'
        }),
    );

    process.on('unhandledRejection', (ex) => {
        // throwing back rejection log as an exception so that winston can catch that exception
        throw ex;
    });

    winston.add(new winston.transports.File({
        filename: 'logfile.log',
        format: winston.format.combine(
            winston.format.timestamp({
                format: 'YYYY-MM-DD hh:mm:ss A ZZ'
            }),
            winston.format.json()
        )
    }));

    winston.add(new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize({ all: true }),
            winston.format.prettyPrint(),
            winston.format.simple()
          ),
          handleExceptions: true
    }));

    winston.add(new winston.transports.MongoDB({
<<<<<<< HEAD
        db: config.get('db'),
=======
        db: 'mongodb://localhost/TranquilFortress',
>>>>>>> dbe64a30da1278ac561f61135aa7edce216f3fe4
        options: {
            useUnifiedTopology: true,
        }
    }));

}