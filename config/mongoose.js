const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/knovatorDB');
const db = mongoose.connection;
// error
db.on('error',console.error.bind(console,'error connecting to db'));
// up and running then message
db.once('open',function(){
    console.log('Successfully connected to the database')
})