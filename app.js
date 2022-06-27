const ftp = require('basic-ftp');
const express = require('express');
const fs = require("fs");

const app = express();
let client;
async function downloadFileFromFTP(fileName, override = false, isRoot = false) {
    if (!fileName) return;
    try {
        if (!client) {
            client = new ftp.Client();
            client.ftp.verbose = true;
            await client.access({
                host: '185.253.34.175',
                user: 'eci_feed',
                password: 'gH1nR4cO4vgO6j',
                secure: false,
            });
            if (!fs.existsSync(fileName) || override) await client.downloadTo(fileName, fileName);
            console.log(`Downloaded ${fileName}`);
        }
    } catch (err) {
        console.log(err);
    }
}


const start = async () => {
    app.listen(8000, (err) => {
        if (!err) {
            console.log(`server listen 8000`);
        }
    });

};

start()
let count = 0
setInterval(() => {
    downloadFileFromFTP('SiteData.xml').then(() => console.log('count',count +1) )
}, 10000)
