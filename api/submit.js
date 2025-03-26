import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { name, number } = await req.json();

    if (!name || !number) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    const spreadsheetId = process.env.SHEET_ID; // Store this in Vercel env variables

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Sheet1!A:B",
      valueInputOption: "RAW",
      requestBody: { values: [[name, number]] },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
