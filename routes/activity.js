// Deps
import Telnyx from 'telnyx';
import Path from 'path';
import axios from 'axios';
import JWT from '../lib/jwtDecoder.js';

const telnyx = new Telnyx(process.env.TELNYX_API_KEY);

export async function call(req, res) {
    const { to, message, language, voice } = req.body;

    if (!to || !message) {
        return res.status(400).json({ error: "Missing 'to' or 'message' parameter" });
    }

    try {
       
        const call = await telnyx.calls.create({
            connection_id: process.env.TELNYX_CONNECTION_ID,
            to,
            from: process.env.TELNYX_PHONE_NUMBER,
            answer_url: `https://${process.env.SERVER_DOMAIN}/txml?message=${encodeURIComponent(message)}&language=${encodeURIComponent(language || 'en-US')}&voice=${encodeURIComponent(voice || 'female')} `
        });

        res.json({ success: true, call_control_id: call.data.call_control_id });
    } catch (err) {
        console.error('Telnyx Error:', JSON.stringify(err, null, 2));
        res.status(500).json({ error: "Failed to make the call" });
    }
};

/*
 * POST Handler for /execute/ route of Activity.
 */
export async function execute(req, res) {
    try {
        // example on how to decode JWT
        JWT(req.body, process.env.jwtSecret, async (err, decoded) => {

            console.log(`Jwt: ${req.body.toString('utf8')}`);

            // verification error -> unauthorized request
            if (err) {
                console.error(err);
                return res.status(401).end();
            }

            if (decoded && decoded.inArguments && decoded.inArguments.length > 0) {
                
                // decoded in arguments
                var decodedArgs = decoded.inArguments[0];
                
                console.log(`decoded args: ${JSON.stringify(decodedArgs, null, 2)}`);

                // Below is an example of calling a third party service, you can modify the URL of the requestBin in the environment variables
                if (process.env.requestBin) {
                    const response = await axios.post(process.env.requestBin,decodedArgs,
                        {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }
                    );
                }

                // This is how you would return a branch result in a RESTDECISION activity type: see config.json file for potential outcomes
                return res.status(200).json({ branchResult: "sent" });
            } else {
                console.error('inArguments invalid.');
                return res.status(200).json({ branchResult: "notsent" });
            }
        });
    } catch (err) {
        console.error(err);
        return res.status(200).json({ branchResult: "notsent" });
    }
};


/*
 * POST Handler for /publish/ route of Activity.
 */
export async function publish(req, res) {
    console.log(`Publish Event: ${req.body.toString('utf8')}`);
    res.send(200, 'Publish');
};

/*
 * POST Handler for /validate/ route of Activity.
 */
export async function validate(req, res) {
    console.log(`Validate Event: ${req.body.toString('utf8')}`);
    res.send(200, 'Validate');
};


/*
 * POST Handler for / route of Activity (this is the edit route).
 */
export async function edit(req, res) {
    console.log(`Edit Event: ${req.body.toString('utf8')}`);
    res.send(200, 'Edit');
};

/*
 * POST Handler for /save/ route of Activity.
 */
export async function save(req, res) {
    console.log(`Save Event: ${req.body.toString('utf8')}`);
    res.send(200, 'Save');
};