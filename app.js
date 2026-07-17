
const express = require('express');
const db = require('./modules/database');
const scan = require('./modules/scanner');

const app = express();

app.set('view engine','ejs');

app.use(express.static('public'));


app.get('/',(req,res)=>{

    db.query(
        "SELECT * FROM monitored_files",
        (err,files)=>{

            db.query(
                "SELECT * FROM security_events ORDER BY timestamp DESC",
                (err,events)=>{

                    res.render('dashboard',{
                        files,
                        events
                    });

                }
            );

        }
    );

});


app.get('/scan',(req,res)=>{

    scan();

    setTimeout(()=>{
        res.redirect('/');
    },1000);

});

app.listen(3000,()=>{
    console.log("CyberShield running on http://localhost:3000/");
});
