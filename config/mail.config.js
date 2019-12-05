const nodemailer = require('nodemailer');

const HOST = process.env.HOST || 'http://localhost:3000';

const user = process.env.MAIL_USER;
const pass = process.env.MAIL_PASS;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{ user, pass }
});

module.exports.sendValidateEmail = (targetUser) => {
    transporter.sendMail({
        from:`Watch-Me confirm email`,
        to: targetUser.email,
        subject: `Welcome to Watch-Me ${user}`,
        html: `<h1> Welcome to Watch-Me </h1>
            <a href='${HOST}/users/${targetUser.validateToken}/validate'>Confirm account</a>
        `
    })
    .then(info => console.log(info))
    .catch(err => console.log(err))
}