// Module Dependencies
// -------------------
import express from 'express';
import bodyParser from 'body-parser';
import errorhandler from 'errorhandler';
import http from 'http';
import path from 'path';
import * as routes from './routes/index.js';
import * as activity from './routes/activity.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var app = express();

// Configure Express
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.raw({type: 'application/jwt'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

// Express in Development Mode
if ('development' == app.get('env')) {
  app.use(errorhandler());
}

// Custom Activity Routes
app.post('/journeybuilder/save', activity.save );
app.post('/journeybuilder/validate', activity.validate );
app.post('/journeybuilder/publish', activity.publish );
app.post('/journeybuilder/execute', activity.execute );
app.post('/call',activity.call);

//telnyx routes
app.get('/telnyx/txml', activity.txml)
app.post('/telnyx/webhook', activity.webhook)

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});