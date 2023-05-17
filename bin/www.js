import index from '../index.js';
import { createServer } from 'http';
import dotenv from 'dotenv'
import mongoose from 'mongoose';

dotenv.config()

/**
 * Get port from environment and store in Express.
 */

const PORT = (process.env.PORT || '8000');
const HOST = (process.env.HOST || 'localhost');
index.set('port', PORT);
index.set('host', HOST);
index.set('env', process.env.ENV);

const dbURI = 'mongodb+srv://boomy:25102002@cluster0.lfldchi.mongodb.net/projectdatabase?retryWrites=true&w=majority';

//creating server 
const server = createServer(index);

// connecting to  database and if success then listen to the port so the server doesnt work if failed to connect to database 
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => server.listen(PORT))
    .catch(err => console.log(err));



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