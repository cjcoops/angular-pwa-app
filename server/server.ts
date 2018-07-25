
import * as express from 'express';
import {Application} from "express";
import {readAllLessons} from "./read-all-lessons.route";
import {addPushSubscriber} from "./add-push-subscriber.route";
import {sendNewsletter} from "./send-newsletter.route";
const bodyParser = require('body-parser');

const webpush = require('web-push');

const vapidKeys = {
    "publicKey":"BO_Uecz4HFlwgBWKtScLqNFRoaOa7sNUy9yOhEr6PvX25SAQXRQ33ehOo8N11qE3VvDXhJ7-1RxJSkueEr_qY10",
    "privateKey":"nyfjTxMQ0kdA9vTY-JnX1BSGk0wKaJv68o0QNXEpekg"
};


webpush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);




const app: Application = express();


app.use(bodyParser.json());


// REST API
app.route('/api/lessons')
    .get(readAllLessons);

app.route('/api/notifications')
    .post(addPushSubscriber);

app.route('/api/newsletter')
    .post(sendNewsletter);



// launch an HTTP Server
const httpServer = app.listen(9000, () => {
    console.log("HTTP Server running at http://localhost:" + httpServer.address().port);
});









