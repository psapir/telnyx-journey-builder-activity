export async function webhook(req, res) {
 console.log('Webhook payload:', req.body);
 res.sendStatus(200);
};

export async function txml(req, res) {
    const message = req.query.message || "Hello, this is a test call.";
    const language = req.query.language || "en-US";
    const voice = req.query.voice || "female"; // 'female' or 'male'
    console.log(`
        <Response>
            <SpeakSentence language="${language}" voice="${voice}">${message}</SpeakSentence>
        </Response>
    `);
    res.type('text/xml');
    res.send(`
        <Response>
            <SpeakSentence language="${language}" voice="${voice}">${message}</SpeakSentence>
        </Response>
    `);
};