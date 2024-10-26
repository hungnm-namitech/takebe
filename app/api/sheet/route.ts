import { Auth, google } from "googleapis";
import { authenticate } from "@google-cloud/local-auth";

import keys from "../../../credentials.json";
import path from "path";
import * as fs from "node:fs/promises";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];
const CREDENTIALS_PATH = path.join(process.cwd(), "credentials.json");
const TOKEN_PATH = path.join(process.cwd(), "token.json");

async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH, { encoding: "utf8" });
    console.log({ content });
    let credentials;
    if (!!content) credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials || "");
  } catch (err) {
    return null;
  }
}

async function saveCredentials(client: Auth.OAuth2Client) {
  const content = await fs.readFile(TOKEN_PATH, { encoding: "utf8" });
  console.log({ content });
  let keys;
  if (!!content) keys = JSON.parse(content);
  else return;
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: "authorized_user",
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

export async function GET() {
  let client: any = await loadSavedCredentialsIfExist();
  if (client) return listMajors(client);

  console.log({ client });

  client = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: SCOPES,
  });

  // client = new google.auth.JWT(
  //   process.env.GOOGLE_CLIENT_EMAIL,
  //   undefined,
  //   process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  //   SCOPES
  // );

  // client = new google.auth.OAuth2({
  //   clientId: process.env.CLIENT_ID,
  //   clientSecret: process.env.CLIENT_SECRET,
  //   redirectUri: "http://localhost:3000",
  //   credentials: {
  //     scope: "https://www.googleapis.com/auth/spreadsheets.readonly",
  //   },
  // });

  // client = await authenticate({
  //   scopes: SCOPES,
  //   keyfilePath: CREDENTIALS_PATH,
  // });

  console.log({ client });

  if (client.credentials) {
    await saveCredentials(client);
  }
  return listMajors(client);
}

export const listMajors = async (auth: Auth.OAuth2Client) => {
  try {
    const sheets = google.sheets({ version: "v4", auth });
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Info",
    });
    console.log({ res });
    return Response.json({ data: res });
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Something went wrong" });
  }
};
