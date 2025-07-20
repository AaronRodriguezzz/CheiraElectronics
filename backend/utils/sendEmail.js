import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const send_request_update = async (
    id,
    email,
    serviceType,
    status,
    remarks = ''
) => {
  await transporter.sendMail({
    from: '"Cheira Electronics" <no-reply@cheira.com>',
    to: email,
    subject: `Service Request Update: ${status}`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #fff; background-color: #000; padding: 20px;">
        <h2 style="color: #fff;">Service Request Update</h2>
        <p style="color: #ccc;">Your request has been updated. Please see the details below:</p>
        
        <table style="width: 100%; margin-top: 20px; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px; border: 1px solid #fff;">Unique Code</td>
            <td style="padding: 10px; border: 1px solid #fff;">${serviceType}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #fff;">Status</td>
            <td style="padding: 10px; border: 1px solid #fff;">${status}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #fff;">Remarks</td>
            <td style="padding: 10px; border: 1px solid #fff;">${remarks || 'None'}</td>
          </tr>
        </table>

        <p style="margin-top: 20px; color: #999;">If you have questions, feel free to reply to this email.</p>
        <p style="color: #888;">– Cheira Electronics</p>
        <p style="color: #888;">– Request Id: ${id}</p>
      </div>
    `,
  });
};

export default {
  send_request_update,
};
