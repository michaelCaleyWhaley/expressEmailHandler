const express = require("express");
const nodemailer = require("nodemailer");
const formidableMiddleware = require("express-formidable");

const app = express();
app.use(formidableMiddleware());

const contactAddress = "kneedeepwater@hotmail.com";

const mailer = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.gmail_address,
    pass: process.env.gmail_password
  }
});

app.get("/form", function(req, res) {
  res.status(200).send("working");
});

app.post("/form", function(req, res) {
  const { from, email, subject, message } = req.fields;
  if (!from && !email && !subject && !message) {
    return res.status(400).send("blank form");
  }

  mailer.sendMail(
    {
      from: from,
      to: [contactAddress],
      subject: "[Caltech web form]",
      html: `NAME: ${from} EMAIL: ${email} MESSAGE: ${message}`
    },
    function(err, info) {
      if (err) return res.status(500).send(err);
      res.json({ success: true });
    }
  );
});

app.listen(3000);
