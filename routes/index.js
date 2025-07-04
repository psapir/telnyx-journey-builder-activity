// Deps
import * as activity from './activity.js';

/*
 * GET home page.
 */
export async function index(req, res){
    if( !req.session.token ) {
        res.render( 'index', {
            title: 'Unauthenticated',
            errorMessage: 'This app may only be loaded via Salesforce Marketing Cloud',
        });
    } else {
        res.render( 'index', {
            title: 'Journey Builder Activity',
            results: activity.logExecuteData,
        });
    }
};

export async function txml(req, res) {
    const message = req.query.message || "Hello, this is a test call.";
    const language = req.query.language || "en-US";
    const voice = req.query.voice || "female"; // 'female' or 'male'

    res.type('text/xml');
    res.send(`
        <Response>
            <SpeakSentence language="${language}" voice="${voice}">${message}</SpeakSentence>
        </Response>
    `);
};

export async function login( req, res ) {
    console.log( 'req.body: ', req.body );
    res.redirect( '/' );
};

export async function logout( req, res ) {
    req.session.token = '';
};