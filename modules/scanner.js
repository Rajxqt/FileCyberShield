
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const db = require('./database');

const folder = './monitored_files';

function hashFile(file){
    const data = fs.readFileSync(file);

    return crypto
    .createHash('sha256')
    .update(data)
    .digest('hex');
}


function createEvent(file,event,severity){

    console.log(`
========================
FILECYBERSHIELD ALERT
========================
File: ${file}
Event: ${event}
Severity: ${severity}
Time: ${new Date()}
========================
`);

    db.query(
        `INSERT INTO security_events
        (file_path,event_type,severity,timestamp)
        VALUES(?,?,?,NOW())`,
        [file,event,severity]
    );
}

function scan(){

    fs.readdir(folder,(err,files)=>{

        if(err) return console.log(err);


        let currentFiles = [];

        files.forEach(file=>{

            const filePath = path.join(folder,file);
            currentFiles.push(filePath);

            const hash = hashFile(filePath);

            db.query(
                "SELECT * FROM monitored_files WHERE file_path=?",
                [filePath],
                (err,result)=>{

                    if(result.length===0){

                        db.query(
                        `INSERT INTO monitored_files
                        (file_path,file_hash,last_checked,status)
                        VALUES(?,?,NOW(),?)`,
                        [filePath,hash,'NEW']
                        );


                        createEvent(
                            filePath,
                            "NEW FILE DETECTED",
                            "HIGH"
                        );

                    }

                    else if(result[0].file_hash !== hash){

                        db.query(
                        `UPDATE monitored_files
                        SET file_hash=?,last_checked=NOW(),status=?
                        WHERE file_path=?`,
                        [hash,'MODIFIED',filePath]
                        );


                        createEvent(
                            filePath,
                            "FILE MODIFIED",
                            "HIGH"
                        );

                    }

                    else{

                        db.query(
                        `UPDATE monitored_files
                        SET last_checked=NOW(),status=?
                        WHERE file_path=?`,
                        ['SAFE',filePath]
                        );

                    }

                }
            );

        });

        db.query(
            "SELECT * FROM monitored_files",
            (err,stored)=>{

                stored.forEach(file=>{

                    if(!currentFiles.includes(file.file_path)){

                        db.query(
                        `UPDATE monitored_files
                        SET status=?,last_checked=NOW()
                        WHERE file_path=?`,
                        ['MISSING',file.file_path]
                        );

                        createEvent(
                            file.file_path,
                            "FILE REMOVED",
                            "CRITICAL"
                        );

                    }

                });

            }
        );

    });

}

module.exports = scan;
