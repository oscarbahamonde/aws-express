import AWS from "aws-sdk";
import dotenv from "dotenv";

dotenv.config().parsed;

const email = new AWS.SES({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});
async function sendEmail(){
  return email.sendEmail(
    {
      Source: process.env.mail_from,
      Destination: {
        ToAddresses: [process.env.mail_to],
      },
      Message: {
        Subject: {
          Data: "Hello from AWS",
        },
        Body: {
          Text: {
            Data: "Hello from AWS",
          },
          Html: {
            Data: "<h1>Hello from AWS</h1>",
          },
        },
      },
    },
    function (err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
      }
    }
  );
};
export default sendEmail;