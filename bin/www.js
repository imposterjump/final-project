import index from '../index.js';
import { createServer } from 'http';
import dotenv from 'dotenv'
dotenv.config()

/**
 * Get port from environment and store in Express.
 */

const PORT = (process.env.PORT || '8000');
const HOST = (process.env.HOST || 'localhost');
index.set('port', PORT);
index.set('host', HOST);
index.set('env', process.env.ENV);

//creating server 

const server = createServer(index);

// open listenning to the port to listen to requests 

server.listen(PORT);

// making sure that everything is working and traking in console debbuging 
server.on('error', onError);
server.on('listening', onListening);
console.log(`Server running at http://${HOST}:${PORT}/`);



function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = 'Port ' + PORT;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = 'Port ' + addr.port;
    console.log('Listening on ' + bind);
}