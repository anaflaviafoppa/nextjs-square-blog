const sendgrid = require('@sendgrid/mail');
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

const SENDER_EMAIL = process.env.SENDER_EMAIL;
const DESTINATION_EMAIL = process.env.DESTINATION_EMAIL;

export default async function handler(req, res) {
    try {
        // console.log("REQ.BODY", req.body);
        await sendgrid.send({
            to: `${DESTINATION_EMAIL}`, // Your email where you'll receive emails
            from: `${SENDER_EMAIL}`, // your website email address here
            subject: `Novo cadastro newsletter home`,
            html: `<div>Reply-To: ${req.body.email}</div>`,
        });
    } catch (error) {
        // console.log(error, error.message);
        return res.status(error.statusCode || 500).json({ error: error.message });
    }

    return res.status(200).json({ error: "" });
}
