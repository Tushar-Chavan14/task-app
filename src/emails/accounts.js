import sgMail from "@sendgrid/mail";

const sendGridMApiKey = process.env.sgMailApiKey

sgMail.setApiKey(sendGridMApiKey);

export const welcomeMail = async (email) => {
  try {
    await sgMail.send({
      to: email,
      from: "tushar@findtushar.me",
      subject: "Welcome to task app",
      text: `welcome ${email} to our task app`,
    });
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
