const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost', // Connect it to a cloud SQL Database to run this over multiple computers. :D
    user: 'root',
    password: 'yourownpassword', // Change this with your own connection password.
    database: 'filecybershieldtest'
});

db.connect((err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log('MySQL connected');
    }
});

module.exports = db;
