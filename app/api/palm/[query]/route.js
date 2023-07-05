import { NextResponse } from "next/server";
const { TextServiceClient } = require("@google-ai/generativelanguage").v1beta2;

const { GoogleAuth } = require("google-auth-library");

export async function GET(req, { params }) {
  const { query } = params;

  const MODEL_NAME = "models/text-bison-001";
  const PALM_API_KEY = process.env.PALM_API_KEY;

  const client = new TextServiceClient({
    authClient: new GoogleAuth().fromAPIKey(PALM_API_KEY),
  });

  const prompt =
    "I like " +
    query +
    " can you recommend me atleast 10 movies or tv series that I would enjoy based on what i liked and just give the title name and seprate by empty line dont mention anything else";
  try {
    const data = await client.generateText({
      model: MODEL_NAME,
      prompt: {
        text: prompt,
      },
    });
    return NextResponse.json({ response: data[0].candidates[0].output });
  } catch (err) {
    return NextResponse.json(err);
  }
}
