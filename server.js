const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const cors = require('cors');

const app = express();
app.use(cors());

app.use(express.static('public'));



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/send-email', (req, res) => {
    const { gname, gmail, cname, cage, message } = req.body;

    // Create a transporter using your email provider's SMTP
    let transporter = nodemailer.createTransport({
        service: 'gmail', // You can use other services like Outlook, Yahoo
        auth: {
            user: 'amdwatkins123@gmail.com',
            pass: 'rsdzqnszysqzroud'
        }
    });

    // Email options
    let mailOptions = {
        from: gmail,
        to: 'amdwatkins123@gmail.com', // Replace with the recipient's email address
        subject: 'New Appointment Request',
        text: `Guardian Name: ${gname}\nGuardian Email: ${gmail}\nChild Name: ${cname}\nChild Age: ${cage}\nMessage: ${message}`
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Email sent: ' + info.response);
    });
});

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
