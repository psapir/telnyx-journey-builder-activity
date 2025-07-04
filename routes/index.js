'use strict';

// Deps
import activity from './activity.js';

/*
 * GET home page.
 */
exports.index = function(req, res){
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

exports.txml = function (req, res) {
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

exports.login = function( req, res ) {
    console.log( 'req.body: ', req.body );
    res.redirect( '/' );
};

exports.logout = function( req, res ) {
    req.session.token = '';
};