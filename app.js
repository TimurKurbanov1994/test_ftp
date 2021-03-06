const ftp = require('basic-ftp');
const express = require('express');
const fs = require("fs");
const schedule = require("node-schedule");

const app = express();
let client;
const downloadFileFromFTP = async () => {
    let fileName = 'SiteData.xml'
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
            console.log(`Downloading ${fileName}...`);
            if (!fs.existsSync(fileName)) await client.downloadTo(fileName, fileName);
            console.log(`Downloaded ${fileName}`);
            await client.close()
        }
    } catch (err) {
        console.log(err);
    }
}

const startSchedule = () => {
    schedule.scheduleJob('*/1 * * * *', downloadFileFromFTP);
};

const start = async () => {
    app.listen(8000, (err) => {
        if (!err) {
            console.log(`server listen 8000`);
        }
    });
    await startSchedule()
};

start()