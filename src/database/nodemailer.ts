import nodemailer from "nodemailer";

import dotenv from "dotenv";
dotenv.config();

//el servicios de transporte para enviar correos
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "martincardozo1993xp@gmail.com",
        pass: "dhse pgmp wgyp thrb",
    },
});


export default transporter;