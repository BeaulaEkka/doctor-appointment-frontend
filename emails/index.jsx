import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const EmailTemplate = ({ userFirstname }) => (
  <Html>
    <Head />
    <Preview>
      The sales intelligence platform that helps you uncover qualified leads.
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={`${baseUrl}/images/logo.jpg`}
          width="170"
          height="50"
          alt="logo"
          style={logo}
        />
        <Text style={paragraph}>Hi {userFirstname},</Text>
        <Text style={paragraph}>
          Thank you for making an Appointment with Medi Point, the Doctor's
          Search platform that helps you uncover qualified Doctors.
        </Text>
        <Section style={btnContainer}>
          <Button style={button} href="https://getkoala.com">
            Get started
          </Button>
        </Section>
        <Text style={paragraph}>
          Best Regards,
          <br />
          The Medi Point Team
        </Text>
        <Hr style={hr} />
        <Text style={footer}>470 Robijn Weg, Zuid Beijerland, 4500CA</Text>
      </Container>
    </Body>
  </Html>
);

export default EmailTemplate;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const logo = {
  margin: "0 auto",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const btnContainer = {
  textAlign: "center",
};

const button = {
  backgroundColor: "#5F51E8",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center",
  display: "block",
  padding: "12px",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
};
