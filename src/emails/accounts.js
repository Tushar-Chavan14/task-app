import sgMail from "@sendgrid/mail";

const sendGridMApiKey = process.env.sgMailApiKey

sgMail.setApiKey(sendGridMApiKey);

const msg = {
  to: "",
  from: "tushar@findtushar.me", // Use the email address or domain you verified above
  subject: "Sending with Twilio SendGrid is Fun",
  text: "and easy to do anywhere, even with Node.js",
  html: "<strong>and easy to do anywhere, even with Node.js</strong>",
};

export const welcomeMail = async (email) => {
  try {
    await sgMail.send({
      to: email,
      from: "tushar@findtushar.me",
      subject: "Welcome to task app",
      text: `welcome ${email} to our task app`,
    });
    console.log('done')
  } catch (e) {
    console.log(e);
  }
};

export const thankyouMail = async (email) => {
  try {
    await sgMail.send({
      to: email,
      from: "tushar@findtushar.me",
      subject: "thank you for using Task app",
      text: `hello ${email} thank you for using the app we would like to hear from your experinces on our app`,
    });
  } catch (e) {
    console.log(e);
  }
};
