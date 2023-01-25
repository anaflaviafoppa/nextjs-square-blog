import sendgrid from "@sendgrid/mail";
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
    try {
        console.log("REQ.BODY", req.body);
        await sendgrid.send({
            to: "sahed63846@ukbob.com", // Your email where you'll receive emails
            from: "anaflaviafoppa@outlook.com", // your website email address here
            subject: `[Lead from website] : ${req.body.subject}`,
            html: `<div>You've got a mail</div>`,
        });
    } catch (error) {
        console.log(error, error.message);
        return res.status(error.statusCode || 500).json({ error: error.message });
    }

    return res.status(200).json({ error: "" });
}
