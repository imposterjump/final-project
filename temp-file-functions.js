const fs = require('fs');
// read 
fs.readFile('./trial.txt', (err, data) => {
    if (err) {
        console.log('error' + err);
    } else {
        console.log(data.toString());
    }

});


//write
fs.writeFile('./trial2.txt', 'helolo', () => {
    console.log('siuuuuu finished');
});
// delete a file 

if (fs.existsSync('./trial3.txt')) {
    fs.unlink('./trial3.txt');
}